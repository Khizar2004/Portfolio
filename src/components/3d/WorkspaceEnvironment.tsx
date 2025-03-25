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
      position: new THREE.Vector3(0, 0.3, -0.5), 
      cameraPosition: new THREE.Vector3(0, 1.5, 2),
      component: ProjectDisplay
    },
    { 
      name: 'keyboard', 
      position: new THREE.Vector3(0, 0, 0.2), 
      cameraPosition: new THREE.Vector3(0, 1.2, 1.8),
      component: null
    },
    { 
      name: 'mouse', 
      position: new THREE.Vector3(0.4, 0, 0.2), 
      cameraPosition: new THREE.Vector3(1, 1, 1.5),
      component: null
    },
    { 
      name: 'book', 
      position: new THREE.Vector3(2.2, 0.4, 0), 
      cameraPosition: new THREE.Vector3(2.5, 1, 1.5),
      component: AboutMe
    },
    { 
      name: 'phone', 
      position: new THREE.Vector3(-1, 0.02, 0.5), 
      cameraPosition: new THREE.Vector3(-1, 1, 2),
      component: Contact
    },
    { 
      name: 'coffee', 
      position: new THREE.Vector3(1.2, 0, 0.5), 
      cameraPosition: new THREE.Vector3(1.5, 1, 1.5),
      component: null
    },
    { 
      name: 'plant', 
      position: new THREE.Vector3(2, 0, -0.7), 
      cameraPosition: new THREE.Vector3(2.5, 1.2, 0),
      component: null
    },
    // Add more objects as needed
  ], []);

  // Enhanced desk environment with more details
  const createDesk = () => {
    return (
      <group>
        {/* Desktop surface */}
        <mesh position={[0, -0.05, 0]} receiveShadow>
          <boxGeometry args={[5, 0.1, 2.5]} />
          <meshStandardMaterial 
            color="#5c4033" 
            roughness={0.7} 
            metalness={0.2}
          />
        </mesh>
        
        {/* Desk legs */}
        {[[-2.3, -0.6, -1], [2.3, -0.6, -1], [-2.3, -0.6, 1], [2.3, -0.6, 1]].map((pos, idx) => (
          <mesh key={idx} position={pos as unknown as THREE.Vector3} castShadow receiveShadow>
            <boxGeometry args={[0.2, 1, 0.2]} />
            <meshStandardMaterial 
              color="#3d2817" 
              roughness={0.75} 
              metalness={0.15}
            />
          </mesh>
        ))}
        
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial 
            color="#2c2c2c" 
            roughness={0.85} 
            metalness={0.1}
          />
        </mesh>
        
        {/* Wall */}
        <mesh position={[0, 1, -1.5]} receiveShadow>
          <boxGeometry args={[10, 5, 0.1]} />
          <meshStandardMaterial 
            color="#e0e0e0" 
            roughness={0.9} 
            metalness={0.05}
          />
        </mesh>

        {/* Lamp */}
        <group position={[-2, 0, -1]}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.1, 1, 16]} />
            <meshStandardMaterial color="#2c2c2c" />
          </mesh>
          <mesh position={[0, 1, 0]} castShadow rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.2, 16]} />
            <meshStandardMaterial color="#2c2c2c" />
          </mesh>
          <mesh position={[0, 1.1, 0]} castShadow>
            <coneGeometry args={[0.2, 0.3, 16]} />
            <meshStandardMaterial color="#f8e9a1" emissive="#f0c420" emissiveIntensity={0.5} />
          </mesh>
          <pointLight position={[0, 1, 0]} intensity={1.2} distance={7} color="#f8e9a1" />
        </group>

        {/* Picture Frame on Wall */}
        <mesh position={[1.5, 1.5, -1.45]} rotation={[0, 0, 0]} castShadow>
          <boxGeometry args={[1, 0.8, 0.05]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[1.5, 1.5, -1.43]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.9, 0.7, 0.02]} />
          <meshStandardMaterial color="#87CEEB" />
        </mesh>

        {/* Small shelf on wall */}
        <mesh position={[-1.5, 1.2, -1.4]} castShadow>
          <boxGeometry args={[1, 0.1, 0.3]} />
          <meshStandardMaterial color="#3d2817" />
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
          {/* When an object is active and has a component, render its content */}
          {activeObject === obj.name && obj.component && (
            <Html
              position={[0, isMobile ? 1 : 1.5, 0]}
              style={{
                width: isMobile ? '300px' : '500px',
                height: isMobile ? '200px' : '300px',
              }}
              distanceFactor={1.5}
              // Remove all click handlers and event stoppers
              // Remove portal to avoid z-index issues
              // Use standard transform for proper positioning
              transform
              // Allow pointer-events to work normally
              // Specify wrapperClass for direct targeting in CSS
              wrapperClass="html-content-wrapper"
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