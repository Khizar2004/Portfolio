import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface DebrisPapersProps {
  isDarkMode: boolean;
}

const DebrisPapers: React.FC<DebrisPapersProps> = ({ isDarkMode }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Papers.glb');
  
  const papersModel = scene.clone();
  
  // Position slightly offset from the trashcan as if papers missed the bin
  return (
    <group 
      position={[-4, -0.84, 0.5]} 
      rotation={[0, -Math.PI / 6, 0]} 
      ref={modelRef}
    >
      <primitive 
        object={papersModel} 
        scale={1}
      />
    </group>
  );
};

useGLTF.preload('/models/Papers.glb');

export default DebrisPapers; 