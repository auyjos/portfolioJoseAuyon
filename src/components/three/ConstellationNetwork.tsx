import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ConstellationNetworkProps {
  count?: number;
  mouseX?: number;
  mouseY?: number;
}

export default function ConstellationNetwork({
  count = 40,
  mouseX = 0,
  mouseY = 0,
}: ConstellationNetworkProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    // Move nodes
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Subtle mouse influence
      posArray[i * 3] += mouseX * 0.0001;
      posArray[i * 3 + 1] += mouseY * 0.0001;

      // Bounce at boundaries
      for (let j = 0; j < 3; j++) {
        const limit = j === 2 ? 2.5 : 5;
        if (Math.abs(posArray[i * 3 + j]) > limit) {
          velocities[i * 3 + j] *= -1;
        }
      }
    }
    posAttr.needsUpdate = true;

    // Build connection lines
    const linePositions: number[] = [];
    const connectionDistance = 2.5;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          linePositions.push(
            posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
            posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
          );
        }
      }
    }

    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#667eea"
          size={0.05}
          sizeAttenuation
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#667eea"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
