import React, { useState, useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface PCProps {
  isDarkMode?: boolean;
}

const PC: React.FC<PCProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/PC.glb') as GLTFResult;
  const [isRunning, setIsRunning] = useState(true);
  
  // Add some PC lighting effects
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          // Apply some lighting effects for components that might glow (like fans, LEDs)
          if (material.name.includes('LED') || material.name.includes('Fan') || 
              material.name.includes('RGB') || material.name.includes('light')) {
            // Make RGB components glowy in dark mode
            const glowColor = isRunning ? (isDarkMode ? 0x00ffff : 0x66ccff) : 0x000000;
            material.emissive.set(new THREE.Color(glowColor));
            material.emissiveIntensity = isRunning ? (isDarkMode ? 2.0 : 0.8) : 0;
          }
          
          // Adjust overall case appearance based on mode
          if (material.name.includes('Case') || material.name.includes('Body')) {
            material.roughness = isDarkMode ? 0.7 : 0.5;
            material.metalness = isDarkMode ? 0.5 : 0.7;
          }
        }
      });
    }
  }, [isDarkMode, materials, isRunning]);

  const handlePCClick = (e: THREE.Event) => {
    e.stopPropagation();
    setIsRunning(prev => !prev);
  };

  return (
    <group onClick={handlePCClick}>
      <primitive 
        object={scene} 
        scale={0.5} 
        position={[-1.6, -0.3, 0]} 
        rotation={[0, Math.PI / 2, 0]} 
        receiveShadow
        castShadow
      />
      
      {/* Add a subtle light to simulate PC glow when running */}
      {isRunning && (
        <pointLight
          position={[-2.5, 0.5, 0]}
          intensity={isDarkMode ? 0.5 : 0.2}
          color="#66ccff"
          distance={2}
          decay={2}
        />
      )}
    </group>
  );
};

useGLTF.preload('/models/PC.glb');
export default PC; 