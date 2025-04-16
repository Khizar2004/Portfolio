import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';
import Coffee from './Coffee';

interface CoffeeTableProps {
  isDarkMode: boolean;
}

const CoffeeTable: React.FC<CoffeeTableProps> = ({ isDarkMode }) => {
  const { scene, materials } = useGLTF('/models/Table.glb') as GLTFResult;

  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          // Adjust material colors based on dark mode
          if (material.name.toLowerCase().includes('wood')) {
            material.color.setHex(isDarkMode ? 0x2c2317 : 0x8b5a2b);
            material.roughness = 0.8;
          } else if (material.name.toLowerCase().includes('metal')) {
            material.color.setHex(isDarkMode ? 0x232323 : 0x3c2915);
            material.roughness = 0.7;
            material.metalness = 0.3;
          }
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <group position={[3.6, -0.8, 3.7]} rotation={[0, 0, 0]}>
      <primitive object={scene} scale={0.8} />
      
      {/* Coffee mug */}
      <group position={[0.2, 0.35, 0]}>
        <Coffee isDarkMode={isDarkMode} />
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

useGLTF.preload('/models/Table.glb');
export default CoffeeTable; 