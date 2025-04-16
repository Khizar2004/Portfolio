import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface PinboardProps {
  isDarkMode: boolean;
}

const Pinboard: React.FC<PinboardProps> = ({ isDarkMode }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Pinboard.glb');
  
  const pinboardModel = scene.clone();
  
  return (
    <group position={[0, 1.5, -1.42]} rotation={[0, -Math.PI / 2, 0]} ref={modelRef}>
      <primitive object={pinboardModel} scale={0.7} />
    </group>
  );
};

useGLTF.preload('/models/Pinboard.glb');

export default Pinboard; 