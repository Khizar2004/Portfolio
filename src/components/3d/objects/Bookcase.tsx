import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface BookcaseProps {
  isDarkMode: boolean;
}

const Bookcase: React.FC<BookcaseProps> = ({ isDarkMode }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Bookcase.glb');
  
  const bookcaseModel = scene.clone();
  
  return (
    <group position={[-4.87, 1.2, 1.6]} rotation={[0, -Math.PI/2, 0]} ref={modelRef}>
      <primitive object={bookcaseModel} scale={0.8} />
    </group>
  );
};

useGLTF.preload('/models/Bookcase.glb');

export default Bookcase; 