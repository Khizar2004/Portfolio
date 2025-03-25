import React from 'react';

interface MonitorStandProps {
  isDarkMode: boolean;
}

const MonitorStand: React.FC<MonitorStandProps> = ({ isDarkMode }) => {
  return (
    <mesh position={[0, 0.08, -0.2]} castShadow>
      <boxGeometry args={[0.4, 0.06, 0.3]} />
      <meshStandardMaterial 
        color={isDarkMode ? "#1a1a1a" : "#333333"} 
        roughness={0.4} 
        metalness={0.6}
      />
    </mesh>
  );
};

export default MonitorStand; 