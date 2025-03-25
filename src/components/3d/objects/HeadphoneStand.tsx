import React from 'react';

interface HeadphoneStandProps {
  isDarkMode: boolean;
}

const HeadphoneStand: React.FC<HeadphoneStandProps> = ({ isDarkMode }) => {
  return (
    <group position={[-0.6, 0, -0.3]}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.1, 16]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#2a2a2a" : "#3d3d3d"} 
          roughness={0.4} 
          metalness={0.6}
        />
      </mesh>
      
      {/* Stem */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#222222" : "#333333"} 
          roughness={0.3} 
          metalness={0.7}
        />
      </mesh>
      
      {/* Hook/support */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#333333" : "#444444"} 
          roughness={0.3} 
          metalness={0.7}
        />
      </mesh>
    </group>
  );
};

export default HeadphoneStand; 