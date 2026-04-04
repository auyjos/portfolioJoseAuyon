import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface WireframeCubeProps {
  readonly speedMultiplier?: number;
}

export default function WireframeCube({ speedMultiplier = 1 }: WireframeCubeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.3 * speedMultiplier;
    meshRef.current.rotation.x += delta * 0.1 * speedMultiplier;
  });

  return (
    <mesh ref={meshRef} scale={0.8}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#667eea" wireframe transparent opacity={0.7} />
    </mesh>
  );
}
