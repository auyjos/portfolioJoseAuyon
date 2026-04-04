import { useEffect, useRef } from 'react';

// Animated data flow / schema graphic for Data & Databases
// Shows table nodes with flowing data streams between them

const TABLES = [
  { x: 10,  y: 10, w: 35, h: 25, label: 'Users' },
  { x: 60,  y: 5,  w: 35, h: 25, label: 'Orders' },
  { x: 110, y: 10, w: 30, h: 25, label: 'Items' },
  { x: 35,  y: 48, w: 38, h: 25, label: 'Analytics' },
  { x: 88,  y: 48, w: 35, h: 25, label: 'Reports' },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [1, 3], [2, 4], [3, 4],
];

export default function DataFlowMini() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lines = Array.from(svg.querySelectorAll<SVGLineElement>('.df-conn'));
    const tables = Array.from(svg.querySelectorAll<SVGRectElement>('.df-table'));
    const dots = Array.from(svg.querySelectorAll<SVGCircleElement>('.df-dot'));

    let frame = 0;
    let raf: number;

    const tick = () => {
      frame++;
      // Pulse table borders
      tables.forEach((table, i) => {
        const phase = (frame * 0.02 + i * 0.9) % (Math.PI * 2);
        const opacity = 0.3 + 0.5 * ((Math.sin(phase) + 1) / 2);
        table.style.opacity = String(opacity);
      });
      // Animate connection flow
      lines.forEach((line, i) => {
        const phase = (frame * 0.035 + i * 0.7) % (Math.PI * 2);
        const opacity = 0.15 + 0.6 * ((Math.sin(phase) + 1) / 2);
        const dashOffset = (frame * 0.4 + i * 15) % 30;
        line.style.opacity = String(opacity);
        line.style.strokeDashoffset = String(dashOffset);
      });
      // Animate data dots moving along connections
      dots.forEach((dot, i) => {
        const conn = CONNECTIONS[i % CONNECTIONS.length];
        const from = TABLES[conn[0]];
        const to = TABLES[conn[1]];
        const fromCx = from.x + from.w / 2;
        const fromCy = from.y + from.h / 2;
        const toCx = to.x + to.w / 2;
        const toCy = to.y + to.h / 2;
        const t = ((frame * 0.01 + i * 0.25) % 1);
        const cx = fromCx + (toCx - fromCx) * t;
        const cy = fromCy + (toCy - fromCy) * t;
        dot.setAttribute('cx', String(cx));
        dot.setAttribute('cy', String(cy));
        dot.style.opacity = String(0.3 + 0.7 * Math.sin(t * Math.PI));
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="data-flow-mini"
      viewBox="0 0 150 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 200, height: 'auto', display: 'block', margin: '8px auto' }}
    >
      {/* Connection lines */}
      {CONNECTIONS.map(([from, to], i) => {
        const a = TABLES[from];
        const b = TABLES[to];
        return (
          <line
            key={i}
            className="df-conn"
            x1={a.x + a.w / 2}
            y1={a.y + a.h / 2}
            x2={b.x + b.w / 2}
            y2={b.y + b.h / 2}
            stroke="#667eea"
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />
        );
      })}

      {/* Table nodes */}
      {TABLES.map((table, i) => (
        <g key={i}>
          <rect
            className="df-table"
            x={table.x}
            y={table.y}
            width={table.w}
            height={table.h}
            rx={3}
            fill="none"
            stroke="#667eea"
            strokeWidth="1"
          />
          {/* Table header bar */}
          <rect
            x={table.x}
            y={table.y}
            width={table.w}
            height={7}
            rx={3}
            fill="#667eea"
            opacity={0.2}
          />
          <text
            x={table.x + table.w / 2}
            y={table.y + 18}
            fill="#a78bfa"
            fontSize="5.5"
            fontFamily="monospace"
            textAnchor="middle"
          >
            {table.label}
          </text>
        </g>
      ))}

      {/* Animated data dots */}
      {CONNECTIONS.map((_, i) => (
        <circle
          key={i}
          className="df-dot"
          cx={0}
          cy={0}
          r={1.8}
          fill="#a78bfa"
        />
      ))}
    </svg>
  );
}
