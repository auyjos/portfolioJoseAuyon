import { RefObject, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits the text content of the target element into word spans
 * and animates them in with a staggered slide-up on scroll.
 */
export default function useTextReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const originalText = el.textContent ?? '';
    const words = originalText.split(/\s+/).filter(Boolean);

    // Replace content with wrapped words
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="text-reveal-word" style="display:inline-block; overflow:hidden; vertical-align:bottom;"><span class="text-reveal-inner" style="display:inline-block;">${word}</span></span>`
      )
      .join(' ');

    const innerSpans = el.querySelectorAll<HTMLElement>('.text-reveal-inner');

    gsap.set(innerSpans, { y: '110%', opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(innerSpans, {
          y: '0%',
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.06,
        });
      },
    });

    return () => {
      trigger.kill();
      // Restore original text to avoid double-init issues
      el.textContent = originalText;
    };
  }, [ref]);
}
