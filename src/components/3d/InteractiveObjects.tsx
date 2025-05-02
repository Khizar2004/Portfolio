import React, { ComponentType, Suspense, useCallback } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import InteractiveObject from './InteractiveObject';
import WindowsProjectDisplay from '../ui/WindowsProjectDisplay';
import AboutMe from '../ui/AboutMe';
import Contact from '../ui/Contact';
import Resume from '../ui/Resume';
import HtmlContextWrapper from '../ui/HtmlContextWrapper';
import { ThemeMode } from '../../context/ThemeContext';
import Keyboard from './objects/Keyboard';
import Mouse from './objects/Mouse';
import ResumePaper from './objects/ResumePaper';

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
  const isDarkMode = theme === 'dark';

  // Objects with intentional placement - with fixed positions
  const objects = [
    { 
      name: 'computer', 
      position: new THREE.Vector3(0, 0.0, -0.2),
      cameraPosition: new THREE.Vector3(0, 1.4, 2.2),
      component: WindowsProjectDisplay as ComponentType
    },
    { 
      name: 'book', 
      position: new THREE.Vector3(-0.9, 0.0, 0.1),
      rotation: new THREE.Euler(0, Math.PI * 0.15, 0),
      cameraPosition: new THREE.Vector3(1.5, 2.0, 3.5),
      component: AboutMe as ComponentType
    },
    { 
      name: 'phone', 
      position: new THREE.Vector3(0.8, 0.0, 0),
      rotation: new THREE.Euler(0, -Math.PI * 0.2, 0),
      cameraPosition: new THREE.Vector3(1.0, 2.5, 3.5),
      component: Contact as ComponentType
    },
    { 
      name: 'coffee', 
      position: new THREE.Vector3(1.2, 0.0, -0.1),
      cameraPosition: new THREE.Vector3(1.5, 0.8, 0.8),
      component: null
    },
    { 
      name: 'resume', 
      position: new THREE.Vector3(0, 1.5, -1.398), // Position aligned with the pinboard
      rotation: new THREE.Euler(0, 0, 0), // Aligned with pinboard rotation
      cameraPosition: new THREE.Vector3(0, 1.5, 3.0), // Zoomed out much further
      component: Resume as ComponentType
    },
  ];

  // Static keyboard and mouse positions
  const keyboardPosition = new THREE.Vector3(0, 0.0, 0.25);
  const mousePosition = new THREE.Vector3(0.6, 0.0, 0.2);

  // This handler prevents clicks on HTML content from blocking other events
  // but still prevents interaction with 3D objects beneath
  const handleHtmlClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    // Stop propagation to prevent interaction with 3D objects
    // but don't prevent the button event bubbling in the DOM
    e.stopPropagation();
  }, []);

  return (
    <>
      {/* Static keyboard */}
      <group position={[keyboardPosition.x, keyboardPosition.y, keyboardPosition.z]}>
        <Keyboard isDarkMode={isDarkMode} />
      </group>

      {/* Static mouse */}
      <group position={[mousePosition.x, mousePosition.y, mousePosition.z]}>
        <Mouse isDarkMode={isDarkMode} />
      </group>
      
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
                position={[0, activeObject === 'phone' ? 0.8 : (isMobile ? 1 : 1.2), 0]}
                style={{
                  width: isMobile ? '320px' : '640px',
                  height: isMobile ? '240px' : '480px',
                  padding: '0px',
                  background: 'transparent',
                  borderRadius: '0px',
                  boxShadow: 'none',
                  transform: activeObject === 'phone' ? 'scale(0.7)' : 'scale(0.8)',
                  transformOrigin: 'center center',
                  overflow: 'hidden',
                  pointerEvents: 'auto' // Ensure pointer events are enabled
                }}
                distanceFactor={activeObject === 'phone' ? 2.0 : 1.5}
                transform
                wrapperClass="html-content-wrapper"
                onClick={handleHtmlClick}
                // Don't block pointer events on the HTML element to allow back button to work
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