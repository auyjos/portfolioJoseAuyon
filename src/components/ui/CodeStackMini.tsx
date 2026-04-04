import { useEffect, useRef } from 'react';

// Animated code stack / terminal graphic for Full Stack Development
// Shows layered code blocks with pulsing cursor and flowing data lines

const LAYERS = [
  { y: 8,  width: 90, label: 'Frontend' },
  { y: 28, width: 70, label: 'API' },
  { y: 48, width: 85, label: 'Backend' },
  { y: 68, width: 60, label: 'Database' },
];

const FLOW_LINES: [number, number, number, number][] = [
  [95, 16, 115, 36],
  [75, 36, 95, 56],
  [90, 56, 110, 76],
];

export default function CodeStackMini() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const layers = Array.from(svg.querySelectorAll<SVGRectElement>('.cs-layer'));
    const flows = Array.from(svg.querySelectorAll<SVGLineElement>('.cs-flow'));
    const cursor = svg.querySelector<SVGRectElement>('.cs-cursor');

    let frame = 0;
    let raf: number;

    const tick = () => {
      frame++;
      layers.forEach((layer, i) => {
        const phase = (frame * 0.025 + i * 0.8) % (Math.PI * 2);
        const opacity = 0.3 + 0.5 * ((Math.sin(phase) + 1) / 2);
        layer.style.opacity = String(opacity);
      });
      flows.forEach((flow, i) => {
        const phase = (frame * 0.04 + i * 1.2) % (Math.PI * 2);
        const opacity = 0.1 + 0.7 * ((Math.sin(phase) + 1) / 2);
        const dashOffset = (frame * 0.5 + i * 20) % 40;
        flow.style.opacity = String(opacity);
        flow.style.strokeDashoffset = String(dashOffset);
      });
      if (cursor) {
        const blink = Math.sin(frame * 0.08) > 0 ? 1 : 0.2;
        cursor.style.opacity = String(blink);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="code-stack-mini"
      viewBox="0 0 150 85"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 200, height: 'auto', display: 'block', margin: '8px auto' }}
    >
      {LAYERS.map((layer, i) => (
        <g key={i}>
          <rect
            className="cs-layer"
            x={10}
            y={layer.y}
            width={layer.width}
            height={14}
            rx={3}
            fill="none"
            stroke="#667eea"
            strokeWidth="1"
          />
          <text
            x={14}
            y={layer.y + 10}
            fill="#a78bfa"
            fontSize="6"
            fontFamily="monospace"
          >
            {layer.label}
          </text>
        </g>
      ))}
      {/* Blinking cursor on first layer */}
      <rect className="cs-cursor" x={58} y={12} width={5} height={7} rx={1} fill="#667eea" />
      {/* Data flow arrows between layers */}
      {FLOW_LINES.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          className="cs-flow"
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#a78bfa"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          markerEnd="url(#cs-arrow)"
        />
      ))}
      <defs>
        <marker id="cs-arrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <path d="M0,0 L6,2 L0,4" fill="none" stroke="#a78bfa" strokeWidth="0.8" />
        </marker>
      </defs>
    </svg>
  );
}
