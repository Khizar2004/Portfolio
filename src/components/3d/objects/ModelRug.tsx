import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelRugProps {
  isDarkMode: boolean;
}

const ModelRug: React.FC<ModelRugProps> = ({ isDarkMode }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Rug.glb');
  
  const rugModel = scene.clone();
  
  // Apply any material adjustments based on theme if needed
  useEffect(() => {
    if (rugModel) {
      rugModel.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.roughness = isDarkMode ? 0.85 : 0.7;
            child.material.metalness = isDarkMode ? 0.1 : 0.05;
          }
        }
      });
    }
  }, [isDarkMode, rugModel]);
  
  return (
    <group 
      position={[-0.2, -1, 1.3]} 
      rotation={[0, 0, 0]} 
      ref={modelRef}
    >
      <primitive 
        object={rugModel} 
        scale={4.5} // Scale adjusted to fit the room floor area
      />
    </group>
  );
};

useGLTF.preload('/models/Rug.glb');

export default ModelRug; 