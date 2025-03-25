import React from 'react';

interface DeskLampProps {
  isDarkMode: boolean;
}

const DeskLamp: React.FC<DeskLampProps> = ({ isDarkMode }) => {
  return (
    <group position={[-1.2, 0, -0.6]}>
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.3, 16]} />
        <meshStandardMaterial color={isDarkMode ? "#1a1a1a" : "#2c2c2c"} />
      </mesh>
      <mesh position={[0, 0.35, 0.15]} castShadow>
        <boxGeometry args={[0.02, 0.4, 0.02]} />
        <meshStandardMaterial color={isDarkMode ? "#1a1a1a" : "#2c2c2c"} />
      </mesh>
      <mesh position={[0, 0.55, 0.3]} castShadow rotation={[-Math.PI/4, 0, 0]}>
        <boxGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial color={isDarkMode ? "#1a1a1a" : "#2c2c2c"} />
      </mesh>
      <mesh position={[0, 0.66, 0.42]} castShadow rotation={[-Math.PI/4, 0, 0]}>
        <coneGeometry args={[0.12, 0.2, 16]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#3a3a3a" : "#e5e5e5"} 
          emissive={isDarkMode ? "#5a5a5a" : "#f0c420"} 
          emissiveIntensity={isDarkMode ? 0.3 : 0.2} 
        />
      </mesh>
      <pointLight position={[0, 0.67, 0.43]} intensity={isDarkMode ? 0.7 : 1.2} distance={3} color={isDarkMode ? "#a0a0ff" : "#f8e9a1"} />
    </group>
  );
};

export default DeskLamp; 