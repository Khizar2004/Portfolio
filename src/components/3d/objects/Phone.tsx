import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface PhoneProps {
  isDarkMode?: boolean;
}

const Phone: React.FC<PhoneProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/Phone.glb') as GLTFResult;

  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.setHex(isDarkMode ? 0x1a1a1a : 0x333333);
          if (material.name.toLowerCase().includes('screen')) {
            material.emissive.setHex(0x3498db);
            material.emissiveIntensity = isDarkMode ? 0.2 : 0;
          }
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <group>
      <primitive object={scene} scale={0.3} position={[0, 0.3, 0]} rotation={[-Math.PI / 2, Math.PI, 0]} />
    </group>
  );
};

useGLTF.preload('/models/Phone.glb');
export default Phone;