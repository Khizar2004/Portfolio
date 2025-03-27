import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface HeadphonesProps {
  isDarkMode?: boolean;
}

const Headphones: React.FC<HeadphonesProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/Headphones.glb') as GLTFResult;

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
      <primitive object={scene} scale={0.3} position={[-1.6, 0.47, -0.5]} rotation={[0, Math.PI, 0]} />
    </group>
  );
};

useGLTF.preload('/models/Headphones.glb');
export default Headphones; 