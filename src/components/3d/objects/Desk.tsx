import React from 'react';
import * as THREE from 'three';

interface DeskProps {
  isDarkMode: boolean;
}

const Desk: React.FC<DeskProps> = ({ isDarkMode }) => {
  return (
    <group>
      {/* Desktop surface */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.1, 1.8]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#3d3d3d" : "#7a5c40"} 
          roughness={0.7} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Desk legs */}
      {[[-1.6, -0.6, -0.8], [1.6, -0.6, -0.8], [-1.6, -0.6, 0.8], [1.6, -0.6, 0.8]].map((pos, idx) => (
        <mesh key={idx} position={pos as unknown as THREE.Vector3} castShadow receiveShadow>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#2a2a2a" : "#5d412a"} 
            roughness={0.75} 
            metalness={0.15}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Desk; 