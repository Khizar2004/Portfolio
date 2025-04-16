import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface MonitorProps {
  isDarkMode?: boolean;
}

const Monitor: React.FC<MonitorProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/Monitor.glb') as GLTFResult;

  // Optionally adjust materials based on dark mode
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.setHex(isDarkMode ? 0x222222 : 0x444444);
          // Add screen glow in dark mode
          if (material.name === 'screen') {
            material.emissive.setHex(isDarkMode ? 0x3366ff : 0x3366ff);
            material.emissiveIntensity = 0.5;
          }
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <group>
      <primitive object={scene} scale={0.1} position={[0, 0.7, 0]} rotation={[Math.PI, Math.PI, 0]}/>
    </group>
  );
};

useGLTF.preload('/models/Monitor.glb');
export default Monitor; 