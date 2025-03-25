import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveObject from './InteractiveObject';
import WindowsProjectDisplay from '../ui/WindowsProjectDisplay';
import AboutMe from '../ui/AboutMe';
import Contact from '../ui/Contact';

type ThemeMode = 'light' | 'dark';

interface InteractiveObjectsProps {
  onObjectClick: (objectName: string, position: THREE.Vector3, cameraPos: THREE.Vector3) => void;
  activeObject: string | null;
  isMobile: boolean;
  theme: string;
}

// Create a type for our component that can accept props
type ComponentType = React.ComponentType<any>;

const InteractiveObjects: React.FC<InteractiveObjectsProps> = ({ 
  onObjectClick, 
  activeObject,
  isMobile,
  theme
}) => {
  // Objects with intentional placement - with fixed positions
  const objects = [
    { 
      name: 'computer', 
      position: new THREE.Vector3(0, 0.0, -0.2),
      cameraPosition: new THREE.Vector3(0, 1.4, 2.2),
      component: WindowsProjectDisplay as ComponentType
    },
    { 
      name: 'keyboard', 
      position: new THREE.Vector3(0, 0.0, 0.25),
      cameraPosition: new THREE.Vector3(0, 0.8, 1.2),
      component: null
    },
    { 
      name: 'mouse', 
      position: new THREE.Vector3(0.6, 0.0, 0.2),
      cameraPosition: new THREE.Vector3(0.8, 0.8, 1.0),
      component: null
    },
    { 
      name: 'book', 
      position: new THREE.Vector3(-0.9, 0.0, 0.1),
      rotation: new THREE.Euler(0, Math.PI * 0.15, 0),
      cameraPosition: new THREE.Vector3(-1, 1, 1.2),
      component: AboutMe as ComponentType
    },
    { 
      name: 'phone', 
      position: new THREE.Vector3(0.8, 0.0, 0),
      rotation: new THREE.Euler(0, -Math.PI * 0.2, 0),
      cameraPosition: new THREE.Vector3(1, 0.8, 1),
      component: Contact as ComponentType
    },
    { 
      name: 'coffee', 
      position: new THREE.Vector3(1.2, 0.0, -0.1),
      cameraPosition: new THREE.Vector3(1.5, 0.8, 0.8),
      component: null
    },
    { 
      name: 'plant', 
      position: new THREE.Vector3(-1.2, 1.03, -1.3),
      cameraPosition: new THREE.Vector3(-1.2, 1.2, -0.2),
      component: null
    },
    { 
      name: 'headphones', 
      position: new THREE.Vector3(-0.6, 0.2, -0.3),
      rotation: new THREE.Euler(0, Math.PI * 0.3, 0),
      cameraPosition: new THREE.Vector3(-0.8, 0.8, 0.5),
      component: null 
    },
  ];

  return (
    <>
      {objects.map((obj) => (
        <InteractiveObject
          key={obj.name}
          name={obj.name}
          position={obj.position}
          rotation={obj.rotation}
          onObjectClick={() => onObjectClick(obj.name, obj.position, obj.cameraPosition)}
          isActive={activeObject === obj.name}
        >
          {/* When an object is active and has a component, render its content */}
          {activeObject === obj.name && obj.component && (
            <Html
              position={[0, isMobile ? 1 : 1.2, 0]}
              style={{
                width: isMobile ? '320px' : '640px',
                height: isMobile ? '240px' : '480px',
                padding: '0px',
                background: 'transparent',
                borderRadius: '0px',
                boxShadow: 'none',
                transform: 'scale(0.8)',
                transformOrigin: 'center center',
                overflow: 'hidden'
              }}
              distanceFactor={1.5}
              transform
              wrapperClass="html-content-wrapper"
              onClick={(e) => {
                console.log('[InteractiveObjects] HTML content clicked');
                e.stopPropagation();
              }}
              onPointerDown={(e) => {
                console.log('[InteractiveObjects] HTML pointer down');
                e.stopPropagation();
              }}
            >
              {/* Pass currentTheme prop to WindowsProjectDisplay but not to other components */}
              {obj.name === 'computer' 
                ? <WindowsProjectDisplay currentTheme={theme as ThemeMode} /> 
                : React.createElement(obj.component)}
            </Html>
          )}
        </InteractiveObject>
      ))}
    </>
  );
};

export default InteractiveObjects; 