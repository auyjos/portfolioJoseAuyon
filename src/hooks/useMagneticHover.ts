import { RefObject, useEffect } from 'react';

/**
 * Adds a subtle magnetic attraction toward the cursor on mousemove,
 * and springs back on mouseleave. Max offset is configurable (default 8px).
 * Uses CSS transform for GPU acceleration.
 */
export default function useMagneticHover(
  ref: RefObject<HTMLElement | null>,
  maxOffset = 8
) {
  useEffect(() => {
    // No magnetic effect on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Scale offset so the furthest point in the element gives maxOffset
      const halfW = rect.width / 2 || 1;
      const halfH = rect.height / 2 || 1;
      const offsetX = (distX / halfW) * maxOffset;
      const offsetY = (distY / halfH) * maxOffset;

      el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      el.style.transition = 'transform 0.15s ease';
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0px, 0px)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, maxOffset]);
}
