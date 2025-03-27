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
  
  // Very subtle animation - just enough to feel alive
  useFrame(({ clock }) => {
    if (sceneRef.current) {
      const t = clock.getElapsedTime();
      // Reduced animation intensity for better performance
      sceneRef.current.position.y = Math.sin(t * 0.2) * 0.005;
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