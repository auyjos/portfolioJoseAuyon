import { useEffect, useRef } from 'react';
import '../../assets/styles/NeuralNetworkMini.scss';

// Node layout: 3 layers — 3, 3, 2 nodes
const NODES = [
  // Layer 0 (input)
  { id: 0, x: 20,  y: 15 },
  { id: 1, x: 20,  y: 40 },
  { id: 2, x: 20,  y: 65 },
  // Layer 1 (hidden)
  { id: 3, x: 75,  y: 22 },
  { id: 4, x: 75,  y: 40 },
  { id: 5, x: 75,  y: 58 },
  // Layer 2 (output)
  { id: 6, x: 130, y: 30 },
  { id: 7, x: 130, y: 50 },
];

// Fully-connected edges between layers
const EDGES: [number, number][] = [
  [0,3],[0,4],[0,5],
  [1,3],[1,4],[1,5],
  [2,3],[2,4],[2,5],
  [3,6],[3,7],
  [4,6],[4,7],
  [5,6],[5,7],
];

export default function NeuralNetworkMini() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Animate edge opacities in staggered pulses
    const edges = Array.from(svg.querySelectorAll<SVGLineElement>('.nn-edge'));
    const nodes = Array.from(svg.querySelectorAll<SVGCircleElement>('.nn-node'));

    let frame = 0;
    let raf: number;

    const tick = () => {
      frame++;
      edges.forEach((edge, i) => {
        const phase = (frame * 0.03 + i * 0.4) % (Math.PI * 2);
        const opacity = 0.15 + 0.55 * ((Math.sin(phase) + 1) / 2);
        edge.style.opacity = String(opacity);
      });
      nodes.forEach((node, i) => {
        const phase = (frame * 0.04 + i * 0.7) % (Math.PI * 2);
        const r = 3 + 1.2 * ((Math.sin(phase) + 1) / 2);
        node.setAttribute('r', String(r));
        const opacity = 0.5 + 0.5 * ((Math.sin(phase) + 1) / 2);
        node.style.opacity = String(opacity);
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="neural-network-mini"
      viewBox="0 0 150 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {EDGES.map(([from, to], i) => {
        const a = NODES[from];
        const b = NODES[to];
        return (
          <line
            key={i}
            className="nn-edge"
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#667eea"
            strokeWidth="0.8"
          />
        );
      })}
      {NODES.map((node) => (
        <circle
          key={node.id}
          className="nn-node"
          cx={node.x}
          cy={node.y}
          r="3"
          fill="#a78bfa"
        />
      ))}
    </svg>
  );
}
