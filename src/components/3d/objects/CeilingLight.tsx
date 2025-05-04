import React, { useEffect, useState, useCallback } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface CeilingLightProps {
  isDarkMode?: boolean;
}

const CeilingLight: React.FC<CeilingLightProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/CeilingLight.glb') as GLTFResult;
  const [isOn, setIsOn] = useState(true);
  
  // Toggle light on/off
  const handleClick = useCallback((e: THREE.Event) => {
    e.stopPropagation();
    setIsOn(prev => !prev);
  }, []);

  // Optionally adjust materials based on dark mode and light state
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          // Add emissive properties to make it glow in dark mode
          if (isOn) {
            material.emissive.set(0xffffcc);
            material.emissiveIntensity = isDarkMode ? 1.2 : 0.6;
          } else {
            material.emissive.set(0x000000);
            material.emissiveIntensity = 0;
          }
        }
      });
    }
  }, [isDarkMode, materials, isOn]);

  return (
    <group onClick={handleClick}>
      <primitive 
        object={scene} 
        scale={1.2} 
        position={[0, 3.41, 0]} 
        rotation={[0, 0, 0]} 
      />
      {/* Add a point light to simulate the light */}
      {isOn && (
        <pointLight
          position={[0, 2.2, 0]}
          intensity={isDarkMode ? 3.0 : 1.8}
          color="#ffffcc"
          distance={15}
          decay={1.5}
          castShadow
        />
      )}
    </group>
  );
};

useGLTF.preload('/models/CeilingLight.glb');
export default CeilingLight; 