import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { useSoundContext } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';
import Book from './objects/Book';
import Phone from './objects/Phone';
import Coffee from './objects/Coffee';
import Keyboard from './objects/Keyboard';
import Mouse from './objects/Mouse';
import ResumePaper from './objects/ResumePaper';

interface InteractiveObjectProps {
  name: string;
  position: THREE.Vector3;
  rotation?: THREE.Euler;
  onObjectClick: () => void;
  isActive: boolean;
  children?: ReactNode;
}

const InteractiveObject: React.FC<InteractiveObjectProps> = ({
  name,
  position,
  rotation,
  onObjectClick,
  isActive,
  children
}) => {
  const { playClickSound, playHoverSound } = useSoundContext();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
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
    playClickSound();
    onObjectClick();
  };
  
  // Get the correct model based on name
  const getObjectModel = (name: string) => {
    switch (name) {
      case 'book': return <Book isDarkMode={isDarkMode} />;
      case 'phone': return <Phone isDarkMode={isDarkMode} />;
      case 'coffee': return <Coffee isDarkMode={isDarkMode} />;
      case 'keyboard': return <Keyboard isDarkMode={isDarkMode} />;
      case 'mouse': return <Mouse isDarkMode={isDarkMode} />;
      case 'resume': return <ResumePaper isDarkMode={isDarkMode} />;
      default: return <sphereGeometry args={[0.5, 32, 32]} />;
    }
  };

  return (
    <animated.group
      position-x={position.x}
      position-y={y}
      position-z={position.z}
      scale={scale}
      rotation={rotation}
    >
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
      
      {children}
    </animated.group>
  );
};

export default InteractiveObject; 