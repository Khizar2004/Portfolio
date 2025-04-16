import React, { ComponentType, Suspense } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveObject from './InteractiveObject';
import WindowsProjectDisplay from '../ui/WindowsProjectDisplay';
import AboutMe from '../ui/AboutMe';
import Contact from '../ui/Contact';
import HtmlContextWrapper from '../ui/HtmlContextWrapper';
import { ThemeMode } from '../../context/ThemeContext';

interface InteractiveObjectsProps {
  onObjectClick: (objectName: string, position: THREE.Vector3, cameraPos: THREE.Vector3) => void;
  activeObject: string | null;
  isMobile: boolean;
  theme: string;
}

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
            <Suspense fallback={null}>
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
                  e.stopPropagation();
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                }}
              >
                {/* Pass currentTheme prop to WindowsProjectDisplay but not to other components */}
                <HtmlContextWrapper currentTheme={theme as ThemeMode}>
                  {obj.name === 'computer' 
                    ? <WindowsProjectDisplay currentTheme={theme as ThemeMode} /> 
                    : React.createElement(obj.component)}
                </HtmlContextWrapper>
              </Html>
            </Suspense>
          )}
        </InteractiveObject>
      ))}
    </>
  );
};

export default InteractiveObjects; 