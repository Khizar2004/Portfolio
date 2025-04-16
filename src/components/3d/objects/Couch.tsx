import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface CouchProps {
  isDarkMode: boolean;
}

const Couch: React.FC<CouchProps> = ({ isDarkMode }) => {
  const { scene, materials } = useGLTF('/models/Couch.glb') as GLTFResult;

  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          // Adjust material colors based on dark mode
          if (material.name.toLowerCase().includes('fabric')) {
            material.color.setHex(isDarkMode ? 0x2c2c2c : 0x8b8b8b);
            material.roughness = 0.9;
          } else if (material.name.toLowerCase().includes('cushion')) {
            material.color.setHex(isDarkMode ? 0x1a1a1a : 0x666666);
            material.roughness = 0.8;
          } else {
            material.color.setHex(isDarkMode ? 0x232323 : 0x777777);
          }
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <group position={[3.8, -0.8, 0.8]} rotation={[0, -Math.PI/2, 0]}>
      <primitive object={scene} scale={0.8} />
    </group>
  );
};

useGLTF.preload('/models/Couch.glb');
export default Couch;