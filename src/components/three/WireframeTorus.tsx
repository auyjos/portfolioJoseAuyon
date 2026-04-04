import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function WireframeTorus() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.25;
    meshRef.current.rotation.z += delta * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={0.8}>
      <torusGeometry args={[0.7, 0.3, 8, 16]} />
      <meshBasicMaterial color="#764ba2" wireframe transparent opacity={0.5} />
    </mesh>
  );
}
