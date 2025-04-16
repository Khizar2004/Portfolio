import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface KeyboardProps {
  isDarkMode?: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/Keyboard.glb') as GLTFResult;

  // Optionally adjust materials based on dark mode
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.setHex(isDarkMode ? 0x222222 : 0x444444);
          if (material.name === 'keys') {
            material.emissive.setHex(isDarkMode ? 0x00ff00 : 0x000000);
            material.emissiveIntensity = isDarkMode ? 0.3 : 0;
          }
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <group>
      <primitive object={scene} scale={0.4} position={[-0.1, 0.3, 0.3]} />
    </group>
  );
};

useGLTF.preload('/models/Keyboard.glb');
export default Keyboard; 