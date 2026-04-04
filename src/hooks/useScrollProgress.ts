import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollProgress(sectionIds: string[]): number {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const triggers = sectionIds.map((id, index) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [sectionIds]);

  return activeIndex;
}
