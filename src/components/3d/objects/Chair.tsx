import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface ChairProps {
  isDarkMode: boolean;
}

const Chair: React.FC<ChairProps> = ({ isDarkMode }) => {
  const { scene, materials } = useGLTF('/models/Chair.glb') as GLTFResult;

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
      <primitive object={scene} scale={2} position={[-0.1, -1, 2]} rotation={[0, Math.PI, 0]}/>
    </group>
  );
};

useGLTF.preload('/models/Chair.glb');
export default Chair;