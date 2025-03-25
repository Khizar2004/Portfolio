import React from 'react';

interface WallsProps {
  isDarkMode: boolean;
}

const Walls: React.FC<WallsProps> = ({ isDarkMode }) => {
  return (
    <group>
      {/* Back Wall */}
      <mesh position={[0, 1, -1.5]} receiveShadow>
        <boxGeometry args={[10, 5, 0.1]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#222222" : "#f5f5f0"} 
          roughness={0.9} 
          metalness={0.05}
        />
      </mesh>
      
      {/* Side Wall */}
      <mesh position={[-5, 1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[5, 5, 0.1]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#1e1e1e" : "#f0f0f0"} 
          roughness={0.9} 
          metalness={0.05}
        />
      </mesh>
    </group>
  );
};

export default Walls; 