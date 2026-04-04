import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface WireframeTorusProps {
  readonly speedMultiplier?: number;
}

export default function WireframeTorus({ speedMultiplier = 1 }: WireframeTorusProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.25 * speedMultiplier;
    meshRef.current.rotation.z += delta * 0.1 * speedMultiplier;
  });

  return (
    <mesh ref={meshRef} scale={0.8}>
      <torusGeometry args={[0.7, 0.3, 8, 16]} />
      <meshBasicMaterial color="#764ba2" wireframe transparent opacity={0.7} />
    </mesh>
  );
}
