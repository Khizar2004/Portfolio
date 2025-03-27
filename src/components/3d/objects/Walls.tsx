import React from 'react';
import * as THREE from 'three';

interface WallsProps {
  isDarkMode: boolean;
}

const Walls: React.FC<WallsProps> = ({ isDarkMode }) => {
  // Warmer wall colors
  const backWallColor = isDarkMode ? "#1e1912" : "#f0e6d2";
  const sideWallColor = isDarkMode ? "#1a1510" : "#e8dcc0";
  const floorColor = isDarkMode ? 0x333333 : 0xBBBBBB;
  
  // Create a subtle texture for the walls
  const createWallTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Base color
      ctx.fillStyle = isDarkMode ? "#1c1812" : "#efe5d0";
      ctx.fillRect(0, 0, 512, 512);
      
      // Add subtle noise texture
      ctx.globalAlpha = 0.1;
      for (let x = 0; x < 512; x += 4) {
        for (let y = 0; y < 512; y += 4) {
          const value = Math.random() * 40;
          ctx.fillStyle = isDarkMode 
            ? `rgb(${20 + value}, ${15 + value}, ${10 + value})`
            : `rgb(${240 - value}, ${230 - value}, ${215 - value})`;
          ctx.fillRect(x, y, 4, 4);
        }
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 2);
    return texture;
  };
  
  const wallTexture = createWallTexture();
  
  return (
    <group>
      {/* Floor */}
      <mesh 
        position={[0, -1, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color={new THREE.Color(floorColor)} 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 1, -1.5]} receiveShadow>
        <boxGeometry args={[10, 5, 0.1]} />
        <meshStandardMaterial 
          color={backWallColor} 
          roughness={0.9} 
          metalness={0.05}
          map={wallTexture}
        />
      </mesh>
      
      {/* Side Wall */}
      <mesh position={[-5, 1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[5, 5, 0.1]} />
        <meshStandardMaterial 
          color={sideWallColor} 
          roughness={0.9} 
          metalness={0.05}
          map={wallTexture}
        />
      </mesh>
      
      {/* Ceiling */}
      <mesh position={[0, 3.5, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <boxGeometry args={[10, 5, 0.1]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#191510" : "#f5ebd7"} 
          roughness={0.9} 
          metalness={0.05}
        />
      </mesh>
      
      {/* Baseboard for back wall */}
      <mesh position={[0, -0.9, -1.45]} receiveShadow>
        <boxGeometry args={[10, 0.2, 0.05]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#0e0e0e" : "#b09878"} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Baseboard for side wall */}
      <mesh position={[-4.95, -0.9, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[5, 0.2, 0.05]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#0e0e0e" : "#b09878"} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Add a simple crown molding for the ceiling */}
      <mesh position={[0, 3.4, -1.45]} receiveShadow>
        <boxGeometry args={[10, 0.1, 0.05]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#0e0e0e" : "#c5b093"} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      <mesh position={[-4.95, 3.4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[5, 0.1, 0.05]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#0e0e0e" : "#c5b093"} 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
    </group>
  );
};

export default Walls; 