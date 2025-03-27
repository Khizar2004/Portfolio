import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface PlantProps {
  isDarkMode?: boolean;
}

const Plant: React.FC<PlantProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/Plant.glb') as GLTFResult;

  // Optionally adjust materials based on dark mode
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          // Keep pot color consistent but adjust slightly for dark mode
          if (material.name === 'pot') {
            material.color.setHex(isDarkMode ? 0x333333 : 0x666666);
          }
          // Leaves can be a bit more vibrant in light mode
          else if (material.name === 'leaves') {
            material.color.setHex(isDarkMode ? 0x225533 : 0x33AA44);
          }
          // Any other materials can use default adjustment
          else {
            material.color.setHex(isDarkMode ? 0x222222 : 0x444444);
          }
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <group>
      <primitive object={scene} scale={0.08} />
    </group>
  );
};

useGLTF.preload('/models/Plant.glb');
export default Plant; 