import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface MouseProps {
  isDarkMode?: boolean;
}

const Mouse: React.FC<MouseProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/Mouse.glb') as GLTFResult;

  // Optionally adjust materials based on dark mode
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.setHex(isDarkMode ? 0x222222 : 0x444444);
          if (material.name === 'led') {
            material.emissive.setHex(isDarkMode ? 0x00ff00 : 0x000000);
            material.emissiveIntensity = isDarkMode ? 0.5 : 0;
          }
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <group>
      <primitive object={scene} scale={0.05} position={[0, 0.3, 0.4]} rotation={[0, Math.PI, 0]}/>
    </group>
  );
};

useGLTF.preload('/models/Mouse.glb');
export default Mouse; 