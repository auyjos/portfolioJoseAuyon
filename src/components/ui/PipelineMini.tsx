import { useEffect, useRef } from 'react';

// Animated CI/CD pipeline graphic for DevOps & Cloud
// Shows pipeline stages with flowing particles along the path

const STAGES = [
  { cx: 20,  cy: 40, label: 'Build' },
  { cx: 55,  cy: 40, label: 'Test' },
  { cx: 90,  cy: 40, label: 'Deploy' },
  { cx: 125, cy: 40, label: 'Run' },
];

const CLOUD_PATH = 'M110,12 Q120,4 130,12 Q140,6 140,16 Q144,20 140,24 L110,24 Q104,20 106,14 Q106,8 110,12 Z';

export default function PipelineMini() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const particles = Array.from(svg.querySelectorAll<SVGCircleElement>('.pl-particle'));
    const stages = Array.from(svg.querySelectorAll<SVGCircleElement>('.pl-stage'));

    let frame = 0;
    let raf: number;

    const tick = () => {
      frame++;
      // Animate particles flowing along the pipeline
      particles.forEach((p, i) => {
        const t = ((frame * 0.008 + i * 0.33) % 1);
        // Move from stage 0 (x=20) to stage 3 (x=125)
        const x = 20 + t * 105;
        const y = 40 + Math.sin(t * Math.PI * 3) * 4;
        p.setAttribute('cx', String(x));
        p.setAttribute('cy', String(y));
        p.style.opacity = String(0.3 + 0.7 * Math.sin(t * Math.PI));
      });
      // Pulse stages sequentially
      stages.forEach((stage, i) => {
        const phase = (frame * 0.03 + i * 1.5) % (Math.PI * 2);
        const r = 8 + 2 * ((Math.sin(phase) + 1) / 2);
        stage.setAttribute('r', String(r));
        const opacity = 0.4 + 0.6 * ((Math.sin(phase) + 1) / 2);
        stage.style.opacity = String(opacity);
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pipeline-mini"
      viewBox="0 0 150 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 200, height: 'auto', display: 'block', margin: '8px auto' }}
    >
      {/* Pipeline connection line */}
      <line x1={20} y1={40} x2={125} y2={40} stroke="#667eea" strokeWidth="1" opacity={0.3} />

      {/* Stage circles */}
      {STAGES.map((stage, i) => (
        <g key={i}>
          <circle
            className="pl-stage"
            cx={stage.cx}
            cy={stage.cy}
            r={8}
            fill="none"
            stroke="#667eea"
            strokeWidth="1.2"
          />
          <text
            x={stage.cx}
            y={stage.cy + 18}
            fill="#a78bfa"
            fontSize="5.5"
            fontFamily="monospace"
            textAnchor="middle"
          >
            {stage.label}
          </text>
        </g>
      ))}

      {/* Animated particles */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          className="pl-particle"
          cx={20}
          cy={40}
          r={2}
          fill="#a78bfa"
        />
      ))}

      {/* Cloud icon in corner */}
      <path d={CLOUD_PATH} fill="none" stroke="#667eea" strokeWidth="0.8" opacity={0.4} />
    </svg>
  );
}
