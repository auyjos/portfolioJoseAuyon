import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function WireframeTorusKnot() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <mesh ref={meshRef} scale={0.6}>
      <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />
      <meshBasicMaterial color="#764ba2" wireframe transparent opacity={0.3} />
    </mesh>
  );
}
