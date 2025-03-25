import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { useSoundContext } from '../../context/SoundContext';

interface InteractiveObjectProps {
  name: string;
  position: THREE.Vector3;
  onObjectClick: () => void;
  isActive: boolean;
  children?: ReactNode;
}

// Placeholder objects until you create or import your own 3D models
const getObjectGeometry = (name: string) => {
  switch (name) {
    case 'computer':
      return <boxGeometry args={[1, 0.6, 0.8]} />;
    case 'book':
      return <boxGeometry args={[0.6, 0.1, 0.8]} />;
    case 'phone':
      return <boxGeometry args={[0.2, 0.02, 0.4]} />;
    default:
      return <sphereGeometry args={[0.5, 32, 32]} />;
  }
};

const getObjectMaterial = (name: string, isHovered: boolean, isActive: boolean) => {
  const baseColor = {
    computer: '#2a2a2a',
    book: '#7e57c2',
    phone: '#212121',
  }[name] || '#4cc9f0';
  
  const hoverColor = isHovered ? '#4cc9f0' : baseColor;
  const color = isActive ? '#f72585' : hoverColor;
  
  return <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} />;
};

const InteractiveObject: React.FC<InteractiveObjectProps> = ({
  name,
  position,
  onObjectClick,
  isActive,
  children
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const { playHoverSound, playClickSound } = useSoundContext();
  
  // Animation properties using react-spring
  const { scale, rotation, positionY } = useSpring({
    scale: isHovered || isActive ? 1.1 : 1,
    rotation: isActive ? [0, Math.PI * 2, 0] : [0, 0, 0],
    positionY: isActive ? position.y + 0.2 : position.y,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  // Floating animation
  useFrame((state) => {
    if (meshRef.current && !isActive) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });
  
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsHovered(true);
    playHoverSound();
  };
  
  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsHovered(false);
  };
  
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    playClickSound();
    onObjectClick();
  };

  return (
    <animated.group
      position={[position.x, positionY, position.z]}
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
        {getObjectGeometry(name)}
        {getObjectMaterial(name, isHovered, isActive)}
      </mesh>
      
      {children}
    </animated.group>
  );
};

export default InteractiveObject; 