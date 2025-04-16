import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface PictureFrameProps {
  isDarkMode: boolean;
}

const PictureFrame: React.FC<PictureFrameProps> = ({ isDarkMode }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Frame.glb');
  
  const pictureFrameModel = scene.clone();
  
  return (
    <group position={[2, 1.8, -1.42]} rotation={[0, Math.PI, 0]} ref={modelRef}>
      <primitive object={pictureFrameModel} scale={1} />
    </group>
  );
};

useGLTF.preload('/models/Frame.glb');

export default PictureFrame; 