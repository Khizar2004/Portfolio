import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { useSoundContext } from '../../context/SoundContext';
import Computer from './models/Computer';
import Book from './models/Book';
import Phone from './models/Phone';
import Coffee from './models/Coffee';
import Plant from './models/Plant';
import Keyboard from './models/Keyboard';
import Mouse from './models/Mouse';
import Headphones from './models/Headphones';

interface InteractiveObjectProps {
  name: string;
  position: THREE.Vector3;
  rotation?: THREE.Euler;
  onObjectClick: () => void;
  isActive: boolean;
  children?: ReactNode;
}

// Get the correct model based on name
const getObjectModel = (name: string, handleClick?: (name: string) => void, isActive?: boolean) => {
  switch (name) {
    case 'computer': return <Computer handleClick={handleClick} isActive={isActive} />;
    case 'book': return <Book />;
    case 'phone': return <Phone />;
    case 'coffee': return <Coffee />;
    case 'plant': return <Plant />;
    case 'keyboard': return <Keyboard />;
    case 'mouse': return <Mouse />;
    case 'headphones': return <Headphones />;
    default: return <sphereGeometry args={[0.5, 32, 32]} />;
  }
};

const InteractiveObject: React.FC<InteractiveObjectProps> = ({
  name,
  position,
  rotation,
  onObjectClick,
  isActive,
  children
}) => {
  const { playClickSound, playHoverSound } = useSoundContext();
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const clickedRef = useRef(false);
  
  // Reset clicked state when active state changes
  useEffect(() => {
    if (!isActive) {
      clickedRef.current = false;
    }
  }, [isActive]);
  
  // Minimal animation values
  const { scale, y } = useSpring({
    scale: hovered ? 1.03 : 1,
    y: hovered ? position.y + 0.03 : position.y,
    config: {
      mass: 2,
      tension: 400,
      friction: 30,
      precision: 0.001
    }
  });
  
  useEffect(() => {
    if (hovered && !isActive) {
      document.body.style.cursor = 'pointer';
      playHoverSound();
    } else {
      document.body.style.cursor = 'auto';
    }
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered, playHoverSound, isActive]);
  
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!isActive) {
      setHovered(true);
    }
  };
  
  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
  };
  
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    console.log(`[InteractiveObject] Object ${name} clicked`);
    
    // For computer object, prevent accidental double-clicks
    if (name === 'computer') {
      if (clickedRef.current) {
        console.log(`[InteractiveObject] Computer double-click prevented, clickedRef=${clickedRef.current}`);
        return;
      }
      clickedRef.current = true;
      console.log(`[InteractiveObject] Computer clickedRef set to true`);
      
      // Add a small delay before enabling clicking again
      if (!isActive) {
        console.log(`[InteractiveObject] Setting timeout for computer click reset`);
        setTimeout(() => {
          clickedRef.current = false;
          console.log(`[InteractiveObject] Computer clickedRef reset to false`);
        }, 1500);
      }
    }
    
    console.log(`[InteractiveObject] Playing click sound and calling onObjectClick for ${name}`);
    playClickSound();
    onObjectClick();
  };
  
  // Custom click handler to pass to the Computer component
  const handleObjectInternalClick = (objectName: string) => {
    // This is for internal clicks within the computer (like screen, power button)
    // We don't need to trigger the parent onObjectClick here, as that would cause camera movement
    console.log(`[InteractiveObject] Internal click on ${objectName} in ${name} object`);
  };

  return (
    <animated.group
      position-x={position.x}
      position-y={y}
      position-z={position.z}
      scale={scale}
      rotation={rotation}
    >
      {name === 'computer' ? (
        // For computer, we render it directly without the mesh wrapper
        // to allow its internal components to handle clicks
        getObjectModel(name, handleObjectInternalClick, isActive)
      ) : (
        // For other objects, we use the mesh wrapper with event handlers
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          {getObjectModel(name)}
        </mesh>
      )}
      
      {children}
    </animated.group>
  );
};

export default InteractiveObject; 