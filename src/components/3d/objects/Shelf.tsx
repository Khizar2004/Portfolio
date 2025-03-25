import React from 'react';

interface ShelfProps {
  isDarkMode: boolean;
}

const Shelf: React.FC<ShelfProps> = ({ isDarkMode }) => {
  return (
    <mesh position={[-1.2, 1, -1.4]} castShadow>
      <boxGeometry args={[0.8, 0.1, 0.3]} />
      <meshStandardMaterial color={isDarkMode ? "#333333" : "#5d412a"} />
    </mesh>
  );
};

export default Shelf; 