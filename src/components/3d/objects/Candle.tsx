import React, { useEffect } from 'react';
import { useGLTF, type GLTFResult } from '@react-three/drei';
import * as THREE from 'three';

interface CandleProps {
  isDarkMode?: boolean;
}

const Candle: React.FC<CandleProps> = ({ isDarkMode = false }) => {
  const { scene, materials } = useGLTF('/models/Candle.glb') as GLTFResult;

  // Adjust materials based on dark mode
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          // Make candle flame glow in both modes, more intense in dark mode
          if (material.name.includes('flame') || material.name.includes('Flame')) {
            material.emissive.set(0xffaa33);
            material.emissiveIntensity = isDarkMode ? 2.0 : 0.8;
          }
        }
      });
    }
  }, [isDarkMode, materials]);

  return (
    <group>
      <primitive 
        object={scene} 
        scale={0.27} 
        position={[-1.75, 1.48, -1.3]} 
        rotation={[0, Math.PI / 3, 0]} 
      />
      {/* Add a flickering point light to simulate candle light */}
      <pointLight
        position={[1.8, 0.6, 0.5]}
        intensity={isDarkMode ? 0.6 : 0.3}
        color="#ff9933"
        distance={2}
        decay={2}
      >
        {/* Random animation to make the light flicker */}
        <meshBasicMaterial attach="material" color="#ffaa33" />
      </pointLight>
    </group>
  );
};

useGLTF.preload('/models/Candle.glb');
export default Candle; 