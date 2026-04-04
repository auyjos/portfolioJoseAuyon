import { useEffect, useRef } from 'react';
import '../../assets/styles/Cursor.scss';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const expandedRef = useRef(false);

  useEffect(() => {
    // Hide on touch/mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], .skill-card, .project-card, .certification, input, textarea, select');
      if (interactive && !expandedRef.current) {
        expandedRef.current = true;
        ring?.classList.add('cursor-ring--expanded');
      } else if (!interactive && expandedRef.current) {
        expandedRef.current = false;
        ring?.classList.remove('cursor-ring--expanded');
      }
    };

    const animate = () => {
      // Dot follows cursor directly
      dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;

      // Ring trails with lerp
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12;

      const ringSize = expandedRef.current ? 24 : 16;
      ring.style.transform = `translate(${ringPosRef.current.x - ringSize}px, ${ringPosRef.current.y - ringSize}px)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
