import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import WorkspaceEnvironment from './WorkspaceEnvironment';

interface AmbientAnimationProps { 
  onObjectClick: (objectName: string, position: THREE.Vector3, cameraPos: THREE.Vector3) => void;
  activeObject: string | null;
}

const AmbientAnimation: React.FC<AmbientAnimationProps> = ({ onObjectClick, activeObject }) => {
  const sceneRef = useRef<THREE.Group>(null);
  
  // Minimal subtly breathing animation - just enough to feel alive
  useFrame(({ clock }) => {
    if (sceneRef.current) {
      const t = clock.getElapsedTime();
      sceneRef.current.position.y = Math.sin(t * 0.2) * 0.008;
      sceneRef.current.rotation.y = Math.sin(t * 0.1) * 0.003;
    }
  });
  
  return (
    <group ref={sceneRef}>
      <WorkspaceEnvironment 
        onObjectClick={onObjectClick} 
        activeObject={activeObject}
      />
    </group>
  );
};

export default AmbientAnimation; 