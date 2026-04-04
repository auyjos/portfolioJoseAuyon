import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface WireframeIcosahedronProps {
  mouseX?: number;
  mouseY?: number;
}

export default function WireframeIcosahedron({ mouseX = 0, mouseY = 0 }: WireframeIcosahedronProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.05;
    // Subtle mouse follow
    meshRef.current.rotation.y += mouseX * 0.001;
    meshRef.current.rotation.x += mouseY * 0.001;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial color="#667eea" wireframe transparent opacity={0.6} />
    </mesh>
  );
}
