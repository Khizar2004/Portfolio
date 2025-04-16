import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface WindowProps {
  isDarkMode: boolean;
}

const Window: React.FC<WindowProps> = ({ isDarkMode }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Window.glb');
  
  const windowModel = scene.clone();
  
  return (
    <group position={[-4.87, 1.5, 0]} rotation={[0, Math.PI * 1.5, 0]} ref={modelRef}>
      <primitive object={windowModel} scale={1.2} />
    </group>
  );
};

useGLTF.preload('/models/Window.glb');

export default Window; 