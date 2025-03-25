import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WallClockProps {
  isDarkMode: boolean;
}

const WallClock: React.FC<WallClockProps> = ({ isDarkMode }) => {
  const hourHandRef = useRef<THREE.Mesh>(null);
  const minuteHandRef = useRef<THREE.Mesh>(null);
  const secondHandRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (hourHandRef.current && minuteHandRef.current && secondHandRef.current) {
      const time = new Date();
      const hours = time.getHours() % 12;
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      hourHandRef.current.rotation.y = -((hours + minutes / 60) * (Math.PI / 6));
      minuteHandRef.current.rotation.y = -(minutes * (Math.PI / 30));
      secondHandRef.current.rotation.y = -(seconds * (Math.PI / 30));
    }
  });

  return (
    <group position={[0, 2.2, -1.41]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
      {/* Clock face */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 32]} />
        <meshStandardMaterial
          color={isDarkMode ? "#f0f0f0" : "#ffffff"}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Clock rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.21, 0.01, 16, 32]} />
        <meshStandardMaterial
          color={isDarkMode ? "#2a2a2a" : "#3d2c1c"}
          roughness={0.5}
          metalness={0.7}
        />
      </mesh>

      {/* Hour marks */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * Math.PI) / 6;
        const x = 0.17 * Math.sin(angle);
        const z = 0.17 * Math.cos(angle);

        return (
          <mesh
            key={`hour-${i}`}
            position={[x, 0.011, z]}
            rotation={[0, 0, 0]}
          >
            <cylinderGeometry
              args={[
                0.005,
                0.005,
                i % 3 === 0 ? 0.03 : 0.015,
                8
              ]}
            />
            <meshStandardMaterial
              color={isDarkMode ? "#2a2a2a" : "#333333"}
              roughness={0.5}
              metalness={0.5}
            />
          </mesh>
        );
      })}

      {/* Hour hand */}
      <mesh
        ref={hourHandRef}
        position={[0, 0.012, 0]}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[0.01, 0.01, 0.09]} />
        <meshStandardMaterial
          color={isDarkMode ? "#2a2a2a" : "#111111"}
          roughness={0.5}
          metalness={0.6}
        />
      </mesh>

      {/* Minute hand */}
      <mesh
        ref={minuteHandRef}
        position={[0, 0.013, 0]}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[0.005, 0.005, 0.13]} />
        <meshStandardMaterial
          color={isDarkMode ? "#2a2a2a" : "#333333"}
          roughness={0.5}
          metalness={0.6}
        />
      </mesh>

      {/* Second hand */}
      <mesh
        ref={secondHandRef}
        position={[0, 0.014, 0]}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[0.002, 0.002, 0.15]} />
        <meshStandardMaterial
          color="#e74c3c"
          roughness={0.5}
          metalness={0.6}
        />
      </mesh>

      {/* Center pin */}
      <mesh position={[0, 0.015, 0]}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial
          color={isDarkMode ? "#444444" : "#222222"}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

export default WallClock;