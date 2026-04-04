import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function WireframeCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x += delta * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={0.8}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#667eea" wireframe transparent opacity={0.5} />
    </mesh>
  );
}
