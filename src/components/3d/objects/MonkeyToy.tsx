import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface MonkeyToyProps {
  isDarkMode: boolean;
}

const MonkeyToy: React.FC<MonkeyToyProps> = ({ isDarkMode }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Monkey.glb');
  
  const monkeyModel = scene.clone();
  
  return (
    <group position={[1.1, -0.45, 0.0]} rotation={[0, -Math.PI / 2 , 0]} scale={0.03} ref={modelRef}>
      <primitive object={monkeyModel} />
    </group>
  );
};

useGLTF.preload('/models/Monkey.glb');

export default MonkeyToy; 