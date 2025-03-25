import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSoundContext } from '../../context/SoundContext';
import InteractiveObject from './InteractiveObject';
import ProjectDisplay from '../ui/ProjectDisplay';
import AboutMe from '../ui/AboutMe';
import Contact from '../ui/Contact';

// This component would normally load a GLTF model of your workspace
// For now, we'll create a simple placeholder environment

interface WorkspaceEnvironmentProps {
  onObjectClick: (objectName: string, position: THREE.Vector3, cameraPos: THREE.Vector3) => void;
  activeObject: string | null;
}

const WorkspaceEnvironment: React.FC<WorkspaceEnvironmentProps> = ({ 
  onObjectClick,
  activeObject
}) => {
  const { playHoverSound } = useSoundContext();
  const { size, viewport } = useThree();
  const isMobile = size.width < 768;
  
  // For the final implementation, load your own custom 3D models
  // const { scene } = useGLTF('/models/workspace.glb');
  
  // Default objects in the scene (replace with your actual 3D models)
  const objects = useMemo(() => [
    { 
      name: 'computer', 
      position: new THREE.Vector3(-1.5, 0.5, 0), 
      cameraPosition: new THREE.Vector3(-2, 1.5, 2),
      component: ProjectDisplay
    },
    { 
      name: 'book', 
      position: new THREE.Vector3(1.5, 0, 0), 
      cameraPosition: new THREE.Vector3(2, 1, 2),
      component: AboutMe
    },
    { 
      name: 'phone', 
      position: new THREE.Vector3(0, 0, 1.5), 
      cameraPosition: new THREE.Vector3(0, 1, 3),
      component: Contact
    },
    // Add more objects as needed
  ], []);

  // Simple desk model as a placeholder
  const createDesk = () => {
    return (
      <group>
        {/* Desktop surface */}
        <mesh position={[0, -0.05, 0]} receiveShadow>
          <boxGeometry args={[5, 0.1, 2.5]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>
        
        {/* Desk legs */}
        {[[-2.3, -0.6, -1], [2.3, -0.6, -1], [-2.3, -0.6, 1], [2.3, -0.6, 1]].map((pos, idx) => (
          <mesh key={idx} position={pos} castShadow receiveShadow>
            <boxGeometry args={[0.2, 1, 0.2]} />
            <meshStandardMaterial color="#3d2817" />
          </mesh>
        ))}
        
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#2c2c2c" />
        </mesh>
        
        {/* Wall */}
        <mesh position={[0, 1, -1.5]} receiveShadow>
          <boxGeometry args={[10, 5, 0.1]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
      </group>
    );
  };

  return (
    <group>
      {/* Environment */}
      {createDesk()}
      
      {/* Interactive objects */}
      {objects.map((obj) => (
        <InteractiveObject
          key={obj.name}
          name={obj.name}
          position={obj.position}
          onObjectClick={() => onObjectClick(obj.name, obj.position, obj.cameraPosition)}
          isActive={activeObject === obj.name}
        >
          {/* When an object is active, render its content */}
          {activeObject === obj.name && (
            <Html
              position={[0, isMobile ? 1 : 1.5, 0]}
              style={{
                width: isMobile ? '300px' : '500px',
                height: isMobile ? '200px' : '300px',
                pointerEvents: 'auto',
              }}
              distanceFactor={1.5}
            >
              {/* Render the component associated with this object */}
              {React.createElement(obj.component)}
            </Html>
          )}
        </InteractiveObject>
      ))}
    </group>
  );
};

export default WorkspaceEnvironment; 