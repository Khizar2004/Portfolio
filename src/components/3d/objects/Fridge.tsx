import React from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface FridgeProps {
  isDarkMode?: boolean;
}

const Fridge: React.FC<FridgeProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/Fridge.glb') as GLTFResult;

  // Optionally adjust materials based on dark mode
  React.useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          // Adjust materials for dark mode if needed
          if (isDarkMode) {
            // Tone down emissive properties in dark mode
            material.emissiveIntensity = 0.4;
          }
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <primitive 
      object={scene} 
      scale={0.3} 
      position={[-4.5, -1, 3.3]} 
      rotation={[0, Math.PI / 2, 0]} 
    />
  );
};

useGLTF.preload('/models/Fridge.glb');
export default Fridge; 