import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface CubecubbyProps {
  isDarkMode: boolean;
}

const Cubecubby: React.FC<CubecubbyProps> = ({ isDarkMode }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/CubeCubby.glb');
  
  const cubecubbyModel = scene.clone();
  
  return (
    <group position={[-2, 1.7, -1.3]} rotation={[0, 0, 0]} ref={modelRef}>
      <primitive object={cubecubbyModel} scale={0.7} />
    </group>
  );
};

useGLTF.preload('/models/CubeCubby.glb');

export default Cubecubby; 