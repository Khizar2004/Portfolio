import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface BookProps {
  isDarkMode?: boolean;
}

const Book: React.FC<BookProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/Book.glb') as GLTFResult;

  // Optionally adjust materials based on dark mode
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.setHex(isDarkMode ? 0x222222 : 0x444444);
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <group>
      <primitive object={scene} scale={0.3} position={[-0.3, 0.3, 0.4]}/>
    </group>
  );
};

useGLTF.preload('/models/Book.glb');
export default Book; 