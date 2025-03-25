import React from 'react';

interface KeyboardMatProps {
  isDarkMode: boolean;
}

const KeyboardMat: React.FC<KeyboardMatProps> = ({ isDarkMode }) => {
  return (
    <mesh position={[0, 0.01, 0.1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[1.6, 0.8]} />
      <meshStandardMaterial 
        color={isDarkMode ? "#1a1a1a" : "#333333"} 
        roughness={0.9} 
        metalness={0.1}
      />
    </mesh>
  );
};

export default KeyboardMat; 