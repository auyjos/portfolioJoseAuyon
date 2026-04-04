import React, { useMemo } from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from 'remotion';

// Icosahedron geometry constants
// 12 vertices of a unit icosahedron
const PHI = (1 + Math.sqrt(5)) / 2;
const RAW_VERTS: [number, number, number][] = [
  [-1,  PHI,  0], [ 1,  PHI,  0], [-1, -PHI,  0], [ 1, -PHI,  0],
  [ 0, -1,  PHI], [ 0,  1,  PHI], [ 0, -1, -PHI], [ 0,  1, -PHI],
  [ PHI,  0, -1], [ PHI,  0,  1], [-PHI,  0, -1], [-PHI,  0,  1],
];

// Normalise to unit sphere
const VERTS: [number, number, number][] = RAW_VERTS.map(([x, y, z]) => {
  const len = Math.sqrt(x * x + y * y + z * z);
  return [x / len, y / len, z / len];
});

// 30 edges of an icosahedron (each pair of vertices sharing a face)
const EDGES: [number, number][] = [
  [0,1],[0,5],[0,7],[0,10],[0,11],
  [1,5],[1,7],[1,8],[1,9],
  [2,3],[2,4],[2,10],[2,11],[2,6],
  [3,4],[3,6],[3,8],[3,9],
  [4,5],[4,9],[4,11],
  [5,9],[5,11],
  [6,7],[6,8],[6,10],
  [7,8],[7,10],
  [8,9],
  [10,11],
];

// Project 3D point to 2D canvas coordinate
function project(
  x: number, y: number, z: number,
  rotY: number, rotX: number,
  scale: number,
  cx: number, cy: number
): [number, number] {
  // Rotate around Y axis
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;

  // Rotate around X axis
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y2 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;

  // Simple perspective
  const dist = 4;
  const fov = dist / (dist + z2);

  return [cx + x1 * fov * scale, cy + y2 * fov * scale];
}

// Seeded pseudo-random for deterministic particle positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 43758.5453123;
  return x - Math.floor(x);
}

type Particle = {
  id: number;
  // start position (scattered)
  sx: number;
  sy: number;
  // which icosahedron vertex it will converge to
  vertIdx: number;
};

const PARTICLE_COUNT = 60;

export const HeroIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const cx = width / 2;
  const cy = height / 2;
  const icoScale = Math.min(width, height) * 0.28;

  // Generate stable particle data
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = seededRandom(i * 3) * Math.PI * 2;
      const radius = 0.35 + seededRandom(i * 7) * 0.45;
      return {
        id: i,
        sx: cx + Math.cos(angle) * radius * width,
        sy: cy + Math.sin(angle) * radius * height,
        vertIdx: i % VERTS.length,
      };
    });
  }, [cx, cy, width, height]);

  // ---- Phase timing (in frames at 30fps) ----
  // 0-20:  dark + scattered particles
  // 20-50: particles converge, constellation lines form
  // 50-70: icosahedron solidifies
  // 70-85: rotation + "JA" text fade in
  // 85-90: fade to black/transparent

  // Global fade in for particles: starts at frame 5
  const particleFadeIn = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // Convergence progress (0 → 1) between frames 20 and 50
  const convergence = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  // Constellation line opacity: fades in as convergence progresses
  const constellationOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // Wireframe solidification: frames 50-70
  const solidify = spring({
    frame: frame - 50,
    fps,
    config: { damping: 200 },
    durationInFrames: 20,
  });
  const icoOpacity = interpolate(solidify, [0, 1], [0, 1]);
  const icoScale2 = interpolate(solidify, [0, 1], [0.6, 1]);

  // Center pulse glow at frame ~35
  const pulseGlow = interpolate(frame, [30, 40, 50], [0, 1, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.sin),
  });

  // Rotation during frames 70-85
  const rotStart = 70;
  const rotProgress = interpolate(frame, [rotStart, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });
  // Base rotation always present after solidify, plus extra during rotation phase
  const rotY = interpolate(frame, [50, 90], [0, Math.PI * 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rotX = Math.sin(rotProgress * Math.PI) * 0.15;

  // "JA" text: fade in frames 70-82
  const textOpacity = interpolate(frame, [70, 82], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // Final fade out: frames 85-90
  const finalFade = interpolate(frame, [85, 90], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });

  // Background radial glow (grows from frame 50)
  const bgGlowOpacity = interpolate(frame, [50, 75], [0, 0.18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Compute projected vertex positions for the icosahedron
  const projectedVerts = VERTS.map(([x, y, z]) =>
    project(x, y, z, rotY, rotX, icoScale, cx, cy)
  );

  // Compute particle current positions (lerp from scattered to vertex target)
  const particlePositions = particles.map((p) => {
    const [tx, ty] = projectedVerts[p.vertIdx];
    // Multiple particles share vertices — add slight offset for visual spread
    const offsetX = (seededRandom(p.id * 11) - 0.5) * 30 * (1 - convergence);
    const offsetY = (seededRandom(p.id * 17) - 0.5) * 30 * (1 - convergence);
    const px = p.sx + (tx - p.sx) * convergence + offsetX;
    const py = p.sy + (ty - p.sy) * convergence + offsetY;
    return { x: px, y: py, vertIdx: p.vertIdx };
  });

  // Particle trail length increases with convergence speed
  const trailLen = interpolate(convergence, [0, 0.5, 1], [0, 18, 4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // SVG line gradient ids
  const gradId = 'ico-grad';
  const glowId = 'glow-filter';
  const glowFilterId = 'glow-soft';
  const bgGradId = 'bg-radial';

  return (
    <AbsoluteFill
      style={{
        background: '#0d1116',
        opacity: finalFade,
        overflow: 'hidden',
      }}
    >
      {/* Background radial gradient glow */}
      {bgGlowOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, rgba(102,126,234,${bgGlowOpacity}) 0%, transparent 65%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          {/* Gradient for icosahedron edges */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>

          {/* Radial background gradient */}
          <radialGradient id={bgGradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(102,126,234,0.25)" />
            <stop offset="100%" stopColor="rgba(13,17,22,0)" />
          </radialGradient>

          {/* Glow filter for particles */}
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft glow for icosahedron */}
          <filter id={glowFilterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ---- Particle trails (motion blur lines) ---- */}
        {frame >= 20 && trailLen > 1 &&
          particles.map((p, i) => {
            // Compute "previous" position a few frames back for trail
            const prevConv = interpolate(frame - trailLen, [20, 50], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.inOut(Easing.cubic),
            });
            const [tx2, ty2] = projectedVerts[p.vertIdx];
            const prevX = p.sx + (tx2 - p.sx) * prevConv + (seededRandom(p.id * 11) - 0.5) * 30 * (1 - prevConv);
            const prevY = p.sy + (ty2 - p.sy) * prevConv + (seededRandom(p.id * 17) - 0.5) * 30 * (1 - prevConv);
            const cur = particlePositions[i];
            const trailOpacity = interpolate(convergence, [0.1, 0.4, 0.9], [0, 0.35, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <line
                key={`trail-${p.id}`}
                x1={prevX}
                y1={prevY}
                x2={cur.x}
                y2={cur.y}
                stroke="#667eea"
                strokeWidth={0.8}
                strokeOpacity={trailOpacity * particleFadeIn}
              />
            );
          })
        }

        {/* ---- Constellation lines between nearby converged particles ---- */}
        {constellationOpacity > 0.01 &&
          EDGES.map(([a, b]) => {
            // Find particles assigned to these vertices
            const [ax, ay] = projectedVerts[a];
            const [bx, by] = projectedVerts[b];
            const dx = ax - bx;
            const dy = ay - by;
            const dist2 = Math.sqrt(dx * dx + dy * dy);
            // Fade in lines based on convergence proximity
            const lineOpacity = constellationOpacity * interpolate(convergence, [0.3, 0.8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <line
                key={`const-${a}-${b}`}
                x1={ax}
                y1={ay}
                x2={bx}
                y2={by}
                stroke="#667eea"
                strokeWidth={0.6 + convergence * 0.4}
                strokeOpacity={lineOpacity * 0.4}
              />
            );
          })
        }

        {/* ---- Icosahedron wireframe edges ---- */}
        {icoOpacity > 0.01 &&
          EDGES.map(([a, b]) => {
            const [ax, ay] = projectedVerts[a];
            const [bx, by] = projectedVerts[b];
            return (
              <line
                key={`edge-${a}-${b}`}
                x1={ax}
                y1={ay}
                x2={bx}
                y2={by}
                stroke={`url(#${gradId})`}
                strokeWidth={interpolate(icoOpacity, [0, 1], [0.5, 1.8])}
                strokeOpacity={icoOpacity}
                filter={icoOpacity > 0.5 ? `url(#${glowFilterId})` : undefined}
              />
            );
          })
        }

        {/* ---- Icosahedron vertex dots (glow nodes) ---- */}
        {icoOpacity > 0.01 &&
          projectedVerts.map(([px, py], i) => (
            <circle
              key={`vert-${i}`}
              cx={px}
              cy={py}
              r={interpolate(icoOpacity, [0, 1], [0, 3.5])}
              fill="#9bb0ff"
              opacity={icoOpacity}
              filter={`url(#${glowFilterId})`}
            />
          ))
        }

        {/* ---- Center pulse glow ---- */}
        {pulseGlow > 0.01 && (
          <circle
            cx={cx}
            cy={cy}
            r={interpolate(pulseGlow, [0, 1], [10, 120])}
            fill="none"
            stroke="#764ba2"
            strokeWidth={2}
            strokeOpacity={pulseGlow * 0.7}
            filter={`url(#${glowId})`}
          />
        )}

        {/* ---- Scattered particles ---- */}
        {particlePositions.map((p, i) => {
          const size = 1.5 + seededRandom(i * 5) * 2;
          // Particles shrink and merge with vertices as convergence reaches 1
          const pSize = interpolate(convergence, [0.6, 1], [size, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const pOpacity = particleFadeIn * interpolate(convergence, [0.8, 1], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <circle
              key={`p-${i}`}
              cx={p.x}
              cy={p.y}
              r={pSize}
              fill="#c4aaff"
              opacity={pOpacity * (0.4 + seededRandom(i * 13) * 0.6)}
              filter={`url(#${glowId})`}
            />
          );
        })}

        {/* ---- "JA" text at center ---- */}
        {textOpacity > 0.01 && (
          <g opacity={textOpacity}>
            {/* Glow backdrop */}
            <circle
              cx={cx}
              cy={cy}
              r={icoScale * 0.18}
              fill="rgba(102,126,234,0.08)"
            />
            <text
              x={cx}
              y={cy + icoScale * 0.065}
              textAnchor="middle"
              fontFamily="'Inter', 'Helvetica Neue', sans-serif"
              fontWeight="700"
              fontSize={icoScale * 0.14}
              letterSpacing="0.15em"
              fill="url(#ico-grad)"
              filter={`url(#${glowFilterId})`}
            >
              JA
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
