import { ReactNode, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

interface SceneContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  camera?: { position: [number, number, number]; fov?: number };
}

export default function SceneContainer({
  children,
  className,
  style,
  camera = { position: [0, 0, 5], fov: 75 },
}: SceneContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} style={style}>
      {visible && (
        <Canvas
          camera={camera}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ pointerEvents: 'none' }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
