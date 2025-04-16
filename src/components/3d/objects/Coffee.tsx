import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface CoffeeProps {
  isDarkMode?: boolean;
}

const Coffee: React.FC<CoffeeProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/Coffee.glb') as GLTFResult;

  // Optionally adjust materials based on dark mode
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          if (material.name === 'cup') {
            material.color.setHex(isDarkMode ? 0xeeeeee : 0xffffff);
          } else if (material.name === 'coffee') {
            material.color.setHex(0x3c2415); // Coffee color stays the same
            material.roughness = 0.2;
          } else {
            material.color.setHex(isDarkMode ? 0xcccccc : 0xffffff);
          }
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <group>
      <primitive object={scene} position={[0, 0.3, 0.5]}/>
    </group>
  );
};

useGLTF.preload('/models/Coffee.glb');
export default Coffee; 