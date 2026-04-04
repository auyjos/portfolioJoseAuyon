import React, { useMemo } from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from 'remotion';
// ---------------------------------------------------------------------------
// Static style objects (defined outside component to satisfy no-inline-styles rule)
// ---------------------------------------------------------------------------
const bgGlowBaseStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
};


// ---------------------------------------------------------------------------
// Seeded pseudo-random helpers (deterministic — no Math.random at render time)
// ---------------------------------------------------------------------------
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 43758.5453123;
  return x - Math.floor(x);
}

function sr(seed: number): number {
  return seededRandom(seed);
}

// ---------------------------------------------------------------------------
// Gradient / color constants
// ---------------------------------------------------------------------------
const COLOR_BLUE   = '#667eea';
const COLOR_PURPLE = '#764ba2';
const COLOR_AMBER  = '#eaaa66';
const BG_DARK      = '#0d1116';

// ---------------------------------------------------------------------------
// Act 1 — Code tokens
// ---------------------------------------------------------------------------
const CODE_TOKENS = ['const', 'async', 'return', 'function', 'import', '=>', '{}', '</>',
  'await', 'export', 'type', 'interface'];
const TOKEN_COUNT = CODE_TOKENS.length;

type CodeToken = {
  id: number;
  token: string;
  x: number;       // start x (0-1 of width)
  y: number;       // start y (0-1 of height, bottom portion)
  speed: number;   // upward drift speed multiplier
  opacity: number; // base opacity (0.1-0.4)
  size: number;    // font size multiplier
};

// ---------------------------------------------------------------------------
// Act 2 — Infrastructure hexagons / containers
// ---------------------------------------------------------------------------
type HexNode = {
  id: number;
  cx: number; // 0-1
  cy: number; // 0-1
  radius: number;
  pulsePhase: number;
};

const HEX_COUNT = 7;

// Pre-compute hex nodes in a rough cluster toward right half
const HEX_NODES_DEF: HexNode[] = Array.from({ length: HEX_COUNT }, (_, i) => ({
  id: i,
  cx: 0.52 + sr(i * 3 + 0) * 0.32,
  cy: 0.25 + sr(i * 3 + 1) * 0.5,
  radius: 28 + sr(i * 3 + 2) * 22,
  pulsePhase: sr(i * 7) * Math.PI * 2,
}));

// Connections between hex nodes (connection lines)
const HEX_CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [4, 5], [5, 6], [2, 5], [1, 6],
];

// ---------------------------------------------------------------------------
// Act 3 — Neural network
// ---------------------------------------------------------------------------
const NN_LAYERS = [3, 4, 4, 3]; // nodes per layer
type NNNode = { id: number; layer: number; idx: number; cx: number; cy: number };
type NNEdge = { from: number; to: number };

function buildNeuralNet(width: number, height: number): { nodes: NNNode[]; edges: NNEdge[] } {
  const nodes: NNNode[] = [];
  const edges: NNEdge[] = [];

  const centerX = width * 0.5;
  const centerY = height * 0.5;
  const layerSpacing = 160;
  const totalLayers = NN_LAYERS.length;
  const startX = centerX - ((totalLayers - 1) / 2) * layerSpacing;

  NN_LAYERS.forEach((count, layerIdx) => {
    const nodeSpacing = 100;
    const startY = centerY - ((count - 1) / 2) * nodeSpacing;
    for (let ni = 0; ni < count; ni++) {
      nodes.push({
        id: nodes.length,
        layer: layerIdx,
        idx: ni,
        cx: startX + layerIdx * layerSpacing,
        cy: startY + ni * nodeSpacing,
      });
    }
  });

  // Connect every node in layer N to every node in layer N+1
  let globalIdx = 0;
  for (let l = 0; l < NN_LAYERS.length - 1; l++) {
    const layerAStart = NN_LAYERS.slice(0, l).reduce((a, b) => a + b, 0);
    const layerBStart = NN_LAYERS.slice(0, l + 1).reduce((a, b) => a + b, 0);
    for (let a = 0; a < NN_LAYERS[l]; a++) {
      for (let b = 0; b < NN_LAYERS[l + 1]; b++) {
        edges.push({ from: layerAStart + a, to: layerBStart + b });
        globalIdx++;
      }
    }
  }

  return { nodes, edges };
}

// ---------------------------------------------------------------------------
// Act 4 — "JA" particle convergence
// ---------------------------------------------------------------------------
// Pre-defined approximate glyph anchor points for "J" and "A" in a 200x120 bounding box
// These are normalized offsets (-0.5 to 0.5) relative to center
const JA_POINTS: { x: number; y: number }[] = [
  // "J" left arm
  { x: -0.2,  y: -0.22 }, { x: -0.15, y: -0.22 }, { x: -0.1, y: -0.22 },
  { x: -0.08, y: -0.22 }, { x: -0.06, y: -0.22 },
  // "J" vertical stem
  { x: -0.08, y: -0.1  }, { x: -0.08, y: 0      }, { x: -0.08, y: 0.1   },
  { x: -0.08, y:  0.18 },
  // "J" bottom curve
  { x: -0.12, y:  0.22 }, { x: -0.17, y: 0.2    }, { x: -0.19, y:  0.14 },
  // "A" left leg
  { x:  0.02, y:  0.22 }, { x:  0.06, y: 0.1    }, { x:  0.09, y: 0     },
  { x:  0.12, y: -0.1  }, { x:  0.15, y: -0.2   }, { x:  0.17, y: -0.22 },
  // "A" right leg
  { x:  0.2,  y: -0.22 }, { x:  0.22, y: -0.12  }, { x:  0.24, y: 0     },
  { x:  0.26, y:  0.12 }, { x:  0.28, y:  0.22  },
  // "A" crossbar
  { x:  0.09, y:  0.06 }, { x:  0.12, y:  0.06  }, { x:  0.16, y:  0.06 },
  { x:  0.2,  y:  0.06 },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export const HeroIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const cx = width / 2;
  const cy = height / 2;

  // ---------- Stable geometry computed once ----------
  const codeTokens: CodeToken[] = useMemo(() => {
    return Array.from({ length: TOKEN_COUNT }, (_, i) => ({
      id: i,
      token: CODE_TOKENS[i],
      x: 0.04 + sr(i * 5 + 0) * 0.88,
      y: 0.3  + sr(i * 5 + 1) * 0.65,
      speed: 0.3 + sr(i * 5 + 2) * 0.7,
      opacity: 0.12 + sr(i * 5 + 3) * 0.28,
      size: 14 + sr(i * 5 + 4) * 10,
    }));
  }, []);

  const { nodes: nnNodes, edges: nnEdges } = useMemo(
    () => buildNeuralNet(width, height),
    [width, height]
  );

  // ---------- Act timing helpers ----------
  function easeIn(a: number, b: number, el: number, er: number) {
    return interpolate(frame, [a, b], [el, er], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.in(Easing.cubic),
    });
  }
  function easeOut(a: number, b: number, el: number, er: number) {
    return interpolate(frame, [a, b], [el, er], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });
  }
  function easeInOut(a: number, b: number, el: number, er: number) {
    return interpolate(frame, [a, b], [el, er], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });
  }
  function clamp(a: number, b: number, el: number, er: number) {
    return interpolate(frame, [a, b], [el, er], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // ==========================================================================
  // ACT 1 (frames 0-60): Code tokens floating up, drifting toward center-right
  // ==========================================================================
  const act1Opacity   = clamp(0, 8, 0, 1);       // fade in
  const act1FadeOut   = clamp(50, 70, 1, 0);      // tokens fade as infra takes over

  // ==========================================================================
  // ACT 2 (frames 50-110): Infrastructure hex nodes + connection lines
  // ==========================================================================
  const act2Enter   = easeOut(50, 80, 0, 1);
  const act2FadeOut = clamp(100, 120, 1, 0);

  // ==========================================================================
  // ACT 3 (frames 100-170): Neural network forms
  // ==========================================================================
  const act3Enter    = easeOut(100, 140, 0, 1);
  const act3FadeOut  = clamp(160, 180, 1, 0);

  // ==========================================================================
  // ACT 4 (frames 160-200): "JA" convergence
  // ==========================================================================
  const act4Enter    = easeInOut(160, 195, 0, 1);
  const jaGlowScale  = spring({ frame: frame - 165, fps, config: { damping: 200 }, durationInFrames: 30 });

  // ==========================================================================
  // ACT 5 (frames 195-210): Fade to black
  // ==========================================================================
  const globalFade = clamp(195, 210, 1, 0);

  // ==========================================================================
  // Compute per-frame token positions (Act 1)
  // ==========================================================================
  const tokenPositions = codeTokens.map((t) => {
    const elapsed = frame;
    // Upward drift
    const baseY = t.y * height - elapsed * t.speed * 1.2;
    // Drift toward center-right (x: 0.5 → 0.7) starting frame 40
    const driftProgress = easeInOut(40, 60, 0, 1);
    const targetX = width * 0.62;
    const baseX = t.x * width;
    const x = baseX + (targetX - baseX) * driftProgress * 0.35;
    const y = baseY;
    return { x, y };
  });

  // ==========================================================================
  // Neural network activation ripple (Act 3)
  // ==========================================================================
  // "Activation" cycles through layers periodically
  const activationCycle = ((frame - 110) % 30) / 30; // 0-1 repeating every 30 frames
  function nodeActivation(nodeId: number, layerIdx: number): number {
    if (frame < 110) return 0;
    const layerProgress = activationCycle * NN_LAYERS.length;
    const distFromActive = Math.abs(layerProgress - layerIdx);
    return Math.max(0, 1 - distFromActive) * act3Enter;
  }

  // ==========================================================================
  // JA particle positions (Act 4)
  // ==========================================================================
  const jaParticlePositions = JA_POINTS.map((pt, i) => {
    // Each particle starts from a nearby scatter position
    const scatterX = cx + pt.x * width * 0.8 + (sr(i * 7 + 0) - 0.5) * 300;
    const scatterY = cy + pt.y * height * 0.8 + (sr(i * 7 + 1) - 0.5) * 200;
    const targetX  = cx + pt.x * width  * 0.42;
    const targetY  = cy + pt.y * height * 0.42;
    const t = Math.min(1, act4Enter * (1 + sr(i * 3) * 0.5));
    const tClamped = Math.min(t, 1);
    return {
      x: scatterX + (targetX - scatterX) * tClamped,
      y: scatterY + (targetY - scatterY) * tClamped,
    };
  });

  // ==========================================================================
  // SVG filter / gradient IDs
  // ==========================================================================
  const glowSm   = 'glow-sm';
  const glowMd   = 'glow-md';
  const glowLg   = 'glow-lg';
  const gradBlue = 'grad-blue';
  const gradFull = 'grad-full';
  const gradBg   = 'grad-bg';

  return (
    <AbsoluteFill
      style={{
        background: BG_DARK,
        opacity: globalFade,
        overflow: 'hidden',
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Background radial glow — grows from Act 2 onward                    */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          ...bgGlowBaseStyle,
          background: `radial-gradient(circle at 50% 50%,
            rgba(102,126,234,${clamp(50, 100, 0, 0.12)}) 0%,
            rgba(118,75,162,${clamp(100, 160, 0, 0.1)}) 35%,
            rgba(234,170,102,${clamp(160, 200, 0, 0.07)}) 60%,
            transparent 80%)`,
        }}
      />

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          {/* Blue-purple gradient */}
          <linearGradient id={gradBlue} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLOR_BLUE} />
            <stop offset="100%" stopColor={COLOR_PURPLE} />
          </linearGradient>

          {/* Full tri-color gradient */}
          <linearGradient id={gradFull} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor={COLOR_BLUE} />
            <stop offset="50%"  stopColor={COLOR_PURPLE} />
            <stop offset="100%" stopColor={COLOR_AMBER} />
          </linearGradient>

          {/* Radial background */}
          <radialGradient id={gradBg} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(102,126,234,0.2)" />
            <stop offset="100%" stopColor="rgba(13,17,22,0)" />
          </radialGradient>

          {/* Small glow */}
          <filter id={glowSm} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Medium glow */}
          <filter id={glowMd} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Large glow */}
          <filter id={glowLg} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ================================================================ */}
        {/* ACT 1 — Code tokens                                               */}
        {/* ================================================================ */}
        <g opacity={act1Opacity * act1FadeOut}>
          {codeTokens.map((t, i) => {
            const pos = tokenPositions[i];
            // Only render when on screen
            if (pos.y < -60 || pos.y > height + 60) return null;
            const wobbleX = Math.sin(frame * 0.04 + sr(i * 9) * Math.PI * 2) * 6;
            return (
              <text
                key={`tok-${t.id}`}
                x={pos.x + wobbleX}
                y={pos.y}
                fontFamily="'Fira Code', 'Courier New', monospace"
                fontSize={t.size}
                fill={COLOR_BLUE}
                opacity={t.opacity}
                filter={`url(#${glowSm})`}
              >
                {t.token}
              </text>
            );
          })}
        </g>

        {/* ================================================================ */}
        {/* ACT 2 — Infrastructure: hex nodes + connection lines + data dots  */}
        {/* ================================================================ */}
        <g opacity={act2Enter * act2FadeOut}>
          {/* Connection lines */}
          {HEX_CONNECTIONS.map(([a, b]) => {
            const na = HEX_NODES_DEF[a];
            const nb = HEX_NODES_DEF[b];
            const ax = na.cx * width, ay = na.cy * height;
            const bx = nb.cx * width, by = nb.cy * height;

            // Animated data dot traveling along the line
            const dotT = ((frame * 0.02 + sr((a + b) * 3)) % 1);
            const dotX = ax + (bx - ax) * dotT;
            const dotY = ay + (by - ay) * dotT;

            return (
              <g key={`hex-conn-${a}-${b}`}>
                <line
                  x1={ax} y1={ay} x2={bx} y2={by}
                  stroke={COLOR_PURPLE}
                  strokeWidth={0.8}
                  strokeOpacity={0.35}
                />
                <circle
                  cx={dotX} cy={dotY} r={2.5}
                  fill={COLOR_BLUE}
                  opacity={0.75}
                  filter={`url(#${glowSm})`}
                />
              </g>
            );
          })}

          {/* Hexagon nodes */}
          {HEX_NODES_DEF.map((node) => {
            const nx = node.cx * width;
            const ny = node.cy * height;
            const pulse = 0.7 + 0.3 * Math.sin(frame * 0.08 + node.pulsePhase);
            const r = node.radius * act2Enter;
            // Hexagon path
            const hexPoints = Array.from({ length: 6 }, (_, k) => {
              const angle = (Math.PI / 3) * k - Math.PI / 6;
              return `${nx + r * Math.cos(angle)},${ny + r * Math.sin(angle)}`;
            }).join(' ');
            return (
              <g key={`hex-${node.id}`} opacity={pulse}>
                <polygon
                  points={hexPoints}
                  fill="none"
                  stroke={`url(#${gradBlue})`}
                  strokeWidth={1.2}
                  opacity={0.6}
                  filter={`url(#${glowSm})`}
                />
                <circle
                  cx={nx} cy={ny} r={4}
                  fill={COLOR_PURPLE}
                  opacity={0.8}
                  filter={`url(#${glowMd})`}
                />
              </g>
            );
          })}
        </g>

        {/* ================================================================ */}
        {/* ACT 3 — Neural network                                            */}
        {/* ================================================================ */}
        <g opacity={act3Enter * act3FadeOut}>
          {/* Edges */}
          {nnEdges.map((edge) => {
            const fromNode = nnNodes[edge.from];
            const toNode   = nnNodes[edge.to];
            const fromAct  = nodeActivation(edge.from, fromNode.layer);
            const toAct    = nodeActivation(edge.to,   toNode.layer);
            const edgeAct  = (fromAct + toAct) / 2;
            return (
              <line
                key={`nn-edge-${edge.from}-${edge.to}`}
                x1={fromNode.cx} y1={fromNode.cy}
                x2={toNode.cx}   y2={toNode.cy}
                stroke={edgeAct > 0.3 ? COLOR_AMBER : COLOR_PURPLE}
                strokeWidth={edgeAct > 0.3 ? 1.2 : 0.5}
                strokeOpacity={0.25 + edgeAct * 0.55}
              />
            );
          })}

          {/* Nodes */}
          {nnNodes.map((node) => {
            const act = nodeActivation(node.id, node.layer);
            const baseR = 8;
            const r = baseR + act * 10;
            const sparkleOpacity = act > 0.6 ? (act - 0.6) * 2.5 : 0;
            return (
              <g key={`nn-node-${node.id}`}>
                {/* Node circle */}
                <circle
                  cx={node.cx} cy={node.cy} r={r}
                  fill="none"
                  stroke={act > 0.3 ? COLOR_AMBER : COLOR_BLUE}
                  strokeWidth={1.5}
                  opacity={0.5 + act * 0.5}
                  filter={act > 0.3 ? `url(#${glowMd})` : undefined}
                />
                <circle
                  cx={node.cx} cy={node.cy} r={3}
                  fill={act > 0.3 ? COLOR_AMBER : COLOR_PURPLE}
                  opacity={0.7 + act * 0.3}
                />
                {/* Sparkle cross when highly activated */}
                {sparkleOpacity > 0.01 && (
                  <g opacity={sparkleOpacity} filter={`url(#${glowLg})`}>
                    <line x1={node.cx - 14} y1={node.cy} x2={node.cx + 14} y2={node.cy}
                      stroke={COLOR_AMBER} strokeWidth={1} />
                    <line x1={node.cx} y1={node.cy - 14} x2={node.cx} y2={node.cy + 14}
                      stroke={COLOR_AMBER} strokeWidth={1} />
                    <line x1={node.cx - 9} y1={node.cy - 9} x2={node.cx + 9} y2={node.cy + 9}
                      stroke={COLOR_AMBER} strokeWidth={0.7} />
                    <line x1={node.cx + 9} y1={node.cy - 9} x2={node.cx - 9} y2={node.cy + 9}
                      stroke={COLOR_AMBER} strokeWidth={0.7} />
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* ================================================================ */}
        {/* ACT 4 — "JA" convergence from particles + glow                    */}
        {/* ================================================================ */}
        <g opacity={act4Enter}>
          {/* Radial light burst behind "JA" */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (Math.PI * 2 / 12) * i;
            const burstLen = 120 * jaGlowScale * act4Enter;
            return (
              <line
                key={`burst-${i}`}
                x1={cx} y1={cy}
                x2={cx + Math.cos(angle) * burstLen}
                y2={cy + Math.sin(angle) * burstLen}
                stroke={`url(#${gradFull})`}
                strokeWidth={1}
                strokeOpacity={0.18 * act4Enter}
              />
            );
          })}

          {/* Soft glow circle */}
          <circle
            cx={cx} cy={cy}
            r={interpolate(jaGlowScale, [0, 1], [0, 180])}
            fill="none"
            stroke={`url(#${gradFull})`}
            strokeWidth={40}
            strokeOpacity={0.06 * act4Enter}
            filter={`url(#${glowLg})`}
          />

          {/* JA particles — connection lines between adjacent points */}
          {JA_POINTS.map((pt, i) => {
            if (i === JA_POINTS.length - 1) return null;
            const from = jaParticlePositions[i];
            const to   = jaParticlePositions[i + 1];
            const nextPt = JA_POINTS[i + 1];
            const dx = to.x - from.x, dy = to.y - from.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 80) return null; // don't draw connections across large gaps
            return (
              <line
                key={`ja-line-${pt.x}-${pt.y}-${nextPt.x}-${nextPt.y}`}
                x1={from.x} y1={from.y}
                x2={to.x}   y2={to.y}
                stroke={`url(#${gradFull})`}
                strokeWidth={0.8}
                strokeOpacity={0.5 * act4Enter}
              />
            );
          })}

          {/* JA particle dots */}
          {jaParticlePositions.map((pos, i) => {
            const pt = JA_POINTS[i];
            const pulseMag = 0.8 + 0.2 * Math.sin(frame * 0.15 + sr(i * 11) * Math.PI * 2);
            return (
              <circle
                key={`ja-p-${pt.x}-${pt.y}`}
                cx={pos.x}
                cy={pos.y}
                r={3.5 * pulseMag * act4Enter}
                fill={`url(#${gradFull})`}
                opacity={0.85}
                filter={`url(#${glowMd})`}
              />
            );
          })}

          {/* "JA" text underneath (fades in late in Act 4) */}
          {act4Enter > 0.6 && (
            <g opacity={interpolate(act4Enter, [0.6, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
              <text
                x={cx}
                y={cy + 28}
                textAnchor="middle"
                fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
                fontWeight="800"
                fontSize={96}
                letterSpacing="0.2em"
                fill={`url(#${gradFull})`}
                filter={`url(#${glowMd})`}
                opacity={0.92}
              >
                JA
              </text>
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
