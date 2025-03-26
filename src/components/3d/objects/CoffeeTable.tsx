import React from 'react';
import * as THREE from 'three';
import Coffee from '../models/Coffee';

interface CoffeeTableProps {
  isDarkMode: boolean;
}

const CoffeeTable: React.FC<CoffeeTableProps> = ({ isDarkMode }) => {
  // Color palette based on theme
  const woodColor = isDarkMode ? "#2c2317" : "#8b5a2b";
  const legColor = isDarkMode ? "#232323" : "#3c2915";
  
  return (
    <group position={[3.8, -0.8, 1.6]} rotation={[0, 0, 0]}>
      {/* Table top */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.08, 0.8]} />
        <meshStandardMaterial 
          color={woodColor} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Table legs */}
      {[[-0.5, 0, -0.3], [0.5, 0, -0.3], [-0.5, 0, 0.3], [0.5, 0, 0.3]].map((pos, idx) => (
        <mesh 
          key={idx} 
          position={[pos[0], 0.0, pos[2]]} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[0.08, 0.6, 0.08]} />
          <meshStandardMaterial 
            color={legColor} 
            roughness={0.7} 
            metalness={0.3}
          />
        </mesh>
      ))}
      
      {/* Coffee mug */}
      <group position={[0.2, 0.35, 0]}>
        <Coffee />
      </group>
      
      {/* Coaster for coffee */}
      <mesh position={[0.2, 0.345, 0]} rotation={[Math.PI/2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.01, 16]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#444444" : "#a47551"} 
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Small book/magazine */}
      <group position={[-0.2, 0.35, 0.1]} rotation={[0, Math.PI * 0.2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.02, 0.2]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#505050" : "#e9e2d0"} 
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};

export default CoffeeTable; 