import React from 'react';

interface FloorProps {
  isDarkMode: boolean;
}

const Floor: React.FC<FloorProps> = ({ isDarkMode }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial 
        color={isDarkMode ? "#1a1a1a" : "#e6e2db"} 
        roughness={0.85} 
        metalness={0.1}
      />
    </mesh>
  );
};

export default Floor; 