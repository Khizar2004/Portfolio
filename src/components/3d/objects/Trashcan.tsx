import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface TrashcanProps {
  isDarkMode: boolean;
}

const Trashcan: React.FC<TrashcanProps> = ({ isDarkMode }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Trashcan.glb');
  
  const trashcanModel = scene.clone();
  
  return (
    <group 
      position={[-4, -0.84, -0.45]} 
      rotation={[0, Math.PI / 3, 0]} 
      ref={modelRef}
    >
      <primitive 
        object={trashcanModel} 
        scale={1.1}
      />
    </group>
  );
};

useGLTF.preload('/models/Trashcan.glb');

export default Trashcan; 