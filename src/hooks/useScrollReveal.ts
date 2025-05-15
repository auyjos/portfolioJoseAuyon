import { useEffect } from 'react';
import { animate } from 'animejs';

/**
 * Watches every element matching `selector` and animates it
 * the first time it’s at least 20 % inside the viewport.
 */
export default function useScrollReveal(
  selector = '.scroll-reveal',
  threshold = 0.2
) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(selector);

    if (!els.length) return; // nothing to do

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;

          /* one-off animation */
          animate(el, {
            opacity: [0, 1],
            translateY: [25, 0],
            duration: 700,
            easing: 'easeOutCubic',
          });

          io.unobserve(el); // stop listening after reveal
        });
      },
      { threshold }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector, threshold]);
}
