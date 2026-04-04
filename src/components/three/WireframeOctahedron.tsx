import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function WireframeOctahedron() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x += delta * 0.15;
  });

  return (
    <mesh ref={meshRef} scale={0.8}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshBasicMaterial color="#667eea" wireframe transparent opacity={0.5} />
    </mesh>
  );
}
