import React from 'react';
import * as THREE from 'three';

interface RugProps {
  isDarkMode: boolean;
}

const Rug: React.FC<RugProps> = ({ isDarkMode }) => {
  return (
    <group position={[0, -0.98, 0.3]}>
      {/* Main rug body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.8, 1.8]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#2c3e50" : "#34495e"} 
          roughness={0.9} 
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Rug pattern - border */}
      <mesh position={[0, 0.002, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.6, 1.6]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#34495e" : "#ecf0f1"} 
          roughness={0.9} 
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Rug pattern - inner border */}
      <mesh position={[0, 0.004, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.4, 1.4]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#2c3e50" : "#bdc3c7"} 
          roughness={0.9} 
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Rug pattern - center */}
      <mesh position={[0, 0.006, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.8, 1]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#34495e" : "#95a5a6"} 
          roughness={0.9} 
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Rug pattern - decorative elements */}
      {[[-0.6, 0, 0], [0.6, 0, 0]].map((pos, idx) => (
        <mesh 
          key={`decoration-${idx}`}
          position={[pos[0], 0.008, pos[2]]} 
          rotation={[Math.PI / 2, 0, 0]} 
          receiveShadow
        >
          <planeGeometry args={[0.4, 0.4]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#7f8c8d" : "#e74c3c"} 
            roughness={0.9} 
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* Rug tassels */}
      {/* Front edge tassels */}
      {Array.from({ length: 15 }).map((_, idx) => {
        const position = -1.3 + idx * 0.2;
        return (
          <mesh 
            key={`front-tassel-${idx}`}
            position={[position, 0, 0.9]} 
            rotation={[Math.PI / 4, 0, 0]} 
            castShadow
          >
            <boxGeometry args={[0.01, 0.06, 0.01]} />
            <meshStandardMaterial 
              color={isDarkMode ? "#95a5a6" : "#ecf0f1"} 
              roughness={0.9} 
              metalness={0}
            />
          </mesh>
        );
      })}
      
      {/* Back edge tassels */}
      {Array.from({ length: 15 }).map((_, idx) => {
        const position = -1.3 + idx * 0.2;
        return (
          <mesh 
            key={`back-tassel-${idx}`}
            position={[position, 0, -0.9]} 
            rotation={[-Math.PI / 4, 0, 0]} 
            castShadow
          >
            <boxGeometry args={[0.01, 0.06, 0.01]} />
            <meshStandardMaterial 
              color={isDarkMode ? "#95a5a6" : "#ecf0f1"} 
              roughness={0.9} 
              metalness={0}
            />
          </mesh>
        );
      })}
      
      {/* Left edge tassels */}
      {Array.from({ length: 10 }).map((_, idx) => {
        const position = -0.8 + idx * 0.2;
        return (
          <mesh 
            key={`left-tassel-${idx}`}
            position={[-1.4, 0, position]} 
            rotation={[Math.PI / 4, Math.PI / 2, 0]} 
            castShadow
          >
            <boxGeometry args={[0.01, 0.06, 0.01]} />
            <meshStandardMaterial 
              color={isDarkMode ? "#95a5a6" : "#ecf0f1"} 
              roughness={0.9} 
              metalness={0}
            />
          </mesh>
        );
      })}
      
      {/* Right edge tassels */}
      {Array.from({ length: 10 }).map((_, idx) => {
        const position = -0.8 + idx * 0.2;
        return (
          <mesh 
            key={`right-tassel-${idx}`}
            position={[1.4, 0, position]} 
            rotation={[Math.PI / 4, -Math.PI / 2, 0]} 
            castShadow
          >
            <boxGeometry args={[0.01, 0.06, 0.01]} />
            <meshStandardMaterial 
              color={isDarkMode ? "#95a5a6" : "#ecf0f1"} 
              roughness={0.9} 
              metalness={0}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default Rug; 