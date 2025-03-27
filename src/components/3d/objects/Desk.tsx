import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface DeskProps {
  isDarkMode: boolean;
}

const Desk: React.FC<DeskProps> = ({ isDarkMode }) => {
  const { scene, materials } = useGLTF('/models/Desk.glb') as GLTFResult;

  // Optionally adjust materials based on dark mode
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.setHex(isDarkMode ? 0x1a1a1a : 0x4a3728);
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <group>
      <primitive object={scene} scale={2} position={[0.3, -0.5, 0]} />
    </group>
  );
};

useGLTF.preload('/models/Desk.glb');
export default Desk; 