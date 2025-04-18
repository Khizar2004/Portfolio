import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface PlantProps {
  isDarkMode?: boolean;
}

const Plant: React.FC<PlantProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/Plant.glb') as GLTFResult;

  // Adjust materials based on dark mode
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          // Enhance plant colors based on lighting
          if (material.name.includes('Leaf') || material.name.includes('leaf') || material.name.includes('Plant')) {
            // Adjust brightness based on mode
            material.color.multiplyScalar(isDarkMode ? 0.85 : 1.1);
            material.roughness = isDarkMode ? 0.7 : 0.5;
          }
          
          // For pot/container materials
          if (material.name.includes('Pot') || material.name.includes('Container')) {
            material.roughness = isDarkMode ? 0.8 : 0.6;
          }
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <primitive 
      object={scene} 
      scale={1.4} 
      position={[-4.3, 0.5, 3.2]} 
      rotation={[0, 0, 0]} 
      castShadow
      receiveShadow
    />
  );
};

useGLTF.preload('/models/Plant.glb');
export default Plant; 