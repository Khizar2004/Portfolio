import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface DeskLampProps {
  isDarkMode?: boolean;
}

const DeskLamp: React.FC<DeskLampProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/DeskLamp.glb') as GLTFResult;

  // Optionally adjust materials based on dark mode
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.setHex(isDarkMode ? 0x222222 : 0x444444);
          // Increase emissive for the bulb in dark mode
          if (material.name === 'bulb') {
            material.emissive.setHex(isDarkMode ? 0xffffcc : 0xffffcc);
            material.emissiveIntensity = isDarkMode ? 1.0 : 0.5;
          }
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <group>
      <primitive object={scene} scale={0.8} position={[-1, 0.3, 0]} rotation={[0, 0.5, 0]}/>
    </group>
  );
};

useGLTF.preload('/models/DeskLamp.glb');
export default DeskLamp; 