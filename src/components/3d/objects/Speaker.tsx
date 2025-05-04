import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface SpeakerProps {
  isDarkMode: boolean;
}

const Speaker: React.FC<SpeakerProps> = ({ isDarkMode }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Speaker.glb');
  
  const speakerModel = scene.clone();
  
  return (
    <group position={[-1.6, 0.3, -0.5]} rotation={[0, Math.PI, 0]} ref={modelRef}>
      <primitive object={speakerModel} scale={0.8} />
    </group>
  );
};

useGLTF.preload('/models/Speaker.glb');

export default Speaker; 