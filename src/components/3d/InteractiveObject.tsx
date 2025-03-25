import React, { useState, useRef, useEffect, ReactNode, useMemo } from 'react';
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
      return (
        <group>
          {/* Single monitor mesh (instead of two) */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[1, 0.6, 0.02]} />
            <meshStandardMaterial 
              color="#3a4a7a" 
              emissive="#304070" 
              emissiveIntensity={0.5}
              roughness={0.1} 
              metalness={0.2}
            />
          </mesh>
          
          {/* Monitor stand neck */}
          <mesh position={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.08, 0.5, 0.1]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.6} />
          </mesh>
          
          {/* Monitor stand base */}
          <mesh position={[0, -0.2, 0]} castShadow>
            <boxGeometry args={[0.4, 0.05, 0.25]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.6} />
          </mesh>
          
          {/* Power button */}
          <mesh position={[0.45, 0.1, 0.03]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
            <meshStandardMaterial color="#5a5a5a" roughness={0.4} metalness={0.6} />
          </mesh>
          
          {/* Brand logo */}
          <mesh position={[0, 0.05, 0.06]} castShadow>
            <boxGeometry args={[0.06, 0.06, 0.01]} />
            <meshStandardMaterial 
              color="#e0e0e0" 
              roughness={0.2} 
              metalness={0.8}
              emissive="#ffffff"
              emissiveIntensity={0.1} 
            />
          </mesh>
        </group>
      );

    case 'book':
      return (
        <group>
          {/* Book cover */}
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[0.6, 0.03, 0.4]} />
            <meshStandardMaterial 
              color="#513578" 
              roughness={0.6} 
              metalness={0.1}
            />
          </mesh>
          
          {/* Book pages */}
          <mesh position={[0, 0.04, 0.01]}>
            <boxGeometry args={[0.57, 0.025, 0.37]} />
            <meshStandardMaterial 
              color="#f5f5f5" 
              roughness={0.9} 
              metalness={0}
            />
          </mesh>
          
          {/* Book spine detail */}
          <mesh position={[-0.29, 0.04, 0]}>
            <boxGeometry args={[0.02, 0.032, 0.41]} />
            <meshStandardMaterial 
              color="#3b2559" 
              roughness={0.5} 
              metalness={0.15} 
            />
          </mesh>
          
          {/* Book title emboss */}
          <mesh position={[-0.29, 0.04, -0.1]}>
            <boxGeometry args={[0.01, 0.04, 0.2]} />
            <meshStandardMaterial 
              color="#d4af37" 
              metalness={0.7} 
              roughness={0.2} 
              emissive="#d4af37" 
              emissiveIntensity={0.2}
            />
          </mesh>
          
          {/* Page edges with slight irregularity */}
          <mesh position={[0.15, 0.04, 0]}>
            <boxGeometry args={[0.28, 0.076, 0.39]} />
            <meshStandardMaterial 
              color="#e8e4d8" 
              roughness={0.95} 
              metalness={0} 
            />
          </mesh>
        </group>
      );
    case 'phone':
      return (
        <group>
          {/* Phone body */}
          <mesh position={[0, 0.01, 0]} castShadow>
            <boxGeometry args={[0.2, 0.02, 0.4]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.7} />
          </mesh>
          
          {/* Phone screen */}
          <mesh position={[0, 0.025, 0]}>
            <boxGeometry args={[0.19, 0.005, 0.38]} />
            <meshStandardMaterial 
              color="#1a1a2e" 
              emissive="#3498db" 
              emissiveIntensity={0.2}
              roughness={0.1}
              metalness={0.3}
            />
          </mesh>
          
          {/* Phone frame */}
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.2, 0.01, 0.4]} />
            <meshStandardMaterial 
              color="#2c2c2c" 
              roughness={0.1} 
              metalness={0.8}
            />
          </mesh>
          
          {/* Phone camera */}
          <mesh position={[0, 0.03, -0.15]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.01, 16]} />
            <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
          </mesh>
          
          {/* Camera ring */}
          <mesh position={[0, 0.03, -0.15]} rotation={[Math.PI/2, 0, 0]} castShadow>
            <torusGeometry args={[0.02, 0.005, 16, 32]} />
            <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.7} />
          </mesh>
          
          {/* Home button */}
          <mesh position={[0, 0.025, 0.15]}>
            <cylinderGeometry args={[0.03, 0.03, 0.005, 32]} />
            <meshStandardMaterial color="#222222" roughness={0.4} metalness={0.6} />
          </mesh>
        </group>
      );
      case 'coffee':
        return (
          <group>
            {/* Saucer (optional) */}
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.09, 0.09, 0.01, 32]} />
              <meshStandardMaterial 
                color="#f0f0f0" 
                roughness={0.2} 
                metalness={0.1}
                envMapIntensity={1.2}
              />
            </mesh>
      
            {/* Cup body (open cylinder so it looks hollow) */}
            <mesh position={[0, 0.06, 0]} castShadow>
              {/* 0.05 radius, 0.12 height, 32 segments, 1 height segment, 'openEnded' = true */}
              <cylinderGeometry args={[0.05, 0.05, 0.12, 32, 1, true]} />
              <meshStandardMaterial 
                color="#ffffff" 
                roughness={0.2} 
                metalness={0.1}
                envMapIntensity={1.2}
                side={THREE.DoubleSide} // So you can see the inside walls too
              />
            </mesh>
      
            {/* Thin rim at the top (optional detail) */}
            <mesh position={[0, 0.12, 0]} castShadow>
              <cylinderGeometry args={[0.051, 0.051, 0.005, 32]} />
              <meshStandardMaterial 
                color="#ffffff" 
                roughness={0.2} 
                metalness={0.1}
                envMapIntensity={1.2}
              />
            </mesh>
      
            {/* Coffee surface */}
            <mesh position={[0, 0.115, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.01, 32]} />
              <meshStandardMaterial 
                color="#3c2f2f" 
                roughness={0.3}
                metalness={0.1}
                envMapIntensity={0.8}
              />
            </mesh>
      
            {/* Handle on the side */}
            <mesh
              position={[0.06, 0.06, 0]}
              rotation={[0, 0, -Math.PI / 2]} // Rotates handle so it arches outward
              castShadow
            >
              {/* Torus with half-circle (use Math.PI for half) */}
              <torusGeometry args={[0.03, 0.01, 16, 32, Math.PI]} />
              <meshStandardMaterial 
                color="#ffffff" 
                roughness={0.2} 
                metalness={0.1}
                envMapIntensity={1.2}
              />
            </mesh>
      
            {/* Steam particles */}
            {[...Array(3)].map((_, i) => (
              <mesh key={i} position={[0, 0.13 + i * 0.04, 0]}>
                <sphereGeometry args={[0.01 - i * 0.002, 8, 8]} />
                <meshStandardMaterial 
                  color="#ffffff" 
                  transparent 
                  opacity={0.6 - i * 0.15} 
                />
              </mesh>
            ))}
          </group>
        );
      
    case 'plant':
      return (
        <group>
          {/* Plant pot */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.12, 0.3, 16]} />
            <meshStandardMaterial color="#d35400" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Soil */}
          <mesh position={[0, 0.30, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.05, 16]} />
            <meshStandardMaterial color="#3e2723" roughness={0.9} metalness={0} />
          </mesh>
          
          {/* Plant stem */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.01, 0.3, 8]} />
            <meshStandardMaterial color="#33691e" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Plant leaves */}
          {[...Array(5)].map((_, i) => {
            const angle = (i / 5) * Math.PI * 2;
            const radius = 0.15;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = 0.5 + Math.random() * 0.1;
            
            return (
              <mesh 
                key={i} 
                position={[x, y, z]} 
                rotation={[
                  Math.random() * 0.5 - 0.25,
                  Math.random() * Math.PI * 2,
                  Math.random() * 0.5 - 0.25
                ]}
                castShadow
              >
                <sphereGeometry args={[0.1, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial 
                  color={['#388e3c', '#43a047', '#66bb6a'][Math.floor(Math.random() * 3)]} 
                  side={THREE.DoubleSide}
                  roughness={0.8}
                  metalness={0.1}
                />
              </mesh>
            );
          })}
        </group>
      );
      case 'keyboard':
        return (
          <group rotation={[-0.1, 0, 0]}>
            {/* Keyboard base */}
            <mesh position={[0, 0.02, 0]} castShadow>
              <boxGeometry args={[0.6, 0.04, 0.2]} />
              <meshStandardMaterial color="#1f1f1f" roughness={0.4} metalness={0.6} />
            </mesh>
      
            {/* Grid of keycaps */}
            {[...Array(4)].map((_, row) =>
              [...Array(10)].map((_, col) => (
                <mesh
                  key={`key-${row}-${col}`}
                  position={[
                    -0.26 + col * 0.06,
                    0.045,
                    -0.075 + row * 0.05,
                  ]}
                  castShadow
                >
                  <boxGeometry args={[0.05, 0.015, 0.05]} />
                  <meshStandardMaterial color="#303030" roughness={0.5} metalness={0.3} />
                </mesh>
              ))
            )}
      
            {/* Spacebar */}
            <mesh position={[0, 0.045, 0.1]} castShadow>
              <boxGeometry args={[0.25, 0.015, 0.05]} />
              <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.3} />
            </mesh>
          </group>
        );
      
        case 'mouse':
          return (
            <group>
              {/* Mouse body as a curved ellipsoid */}
              <mesh position={[0, 0.015, 0]} castShadow scale={[1, 0.6, 1.8]}>
                <sphereGeometry args={[0.04, 32, 32]} />
                <meshStandardMaterial color="#1f1f1f" roughness={0.3} metalness={0.4} />
              </mesh>
              
              {/* Left Mouse Button */}
              <mesh position={[-0.015, 0.03, -0.01]} castShadow>
                <boxGeometry args={[0.015, 0.005, 0.04]} />
                <meshStandardMaterial color="#252525" roughness={0.5} metalness={0.4} />
              </mesh>
              
              {/* Right Mouse Button */}
              <mesh position={[0.015, 0.03, -0.01]} castShadow>
                <boxGeometry args={[0.015, 0.005, 0.04]} />
                <meshStandardMaterial color="#252525" roughness={0.5} metalness={0.4} />
              </mesh>
              
              {/* Scroll wheel */}
              <mesh position={[0, 0.035, -0.005]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.005, 0.005, 0.02, 16]} />
                <meshStandardMaterial color="#3a3a3a" roughness={0.6} metalness={0.3} />
              </mesh>
              
              {/* Optical sensor detail on the underside */}
              <mesh position={[0, 0.005, 0.045]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.008, 0.008, 0.003, 16]} />
                <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
              </mesh>
            </group>
          );

        
    default:
      return <sphereGeometry args={[0.5, 32, 32]} />;
  }
};

const getObjectMaterial = (name: string, isHovered: boolean, isActive: boolean) => {
  const baseColor = {
    computer: '#2a2a2a',
    book: '#7e57c2',
    phone: '#212121',
    coffee: '#8B4513',
    plant: '#4CAF50',
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
  
  // Calculate rotation based on object type
  const initialRotation = useMemo(() => {
    if (name === 'book') {
      // Rotate book to stand vertically
      return new THREE.Euler(0, Math.PI / 2, Math.PI / 2);
    }
    return new THREE.Euler(0, 0, 0);
  }, [name]);
  
  // Animation properties using react-spring
  const { scale, rotationY, posY } = useSpring({
    scale: isHovered ? 1.05 : 1,
    rotationY: isActive ? Math.PI * 2 : 0,
    posY: position.y,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  // Floating animation
  useFrame((state) => {
    if (meshRef.current && !isActive) {
      if (name !== 'computer' && name !== 'phone' && name !== 'book' && name !== 'keyboard' && name !== 'mouse') {
        meshRef.current.rotation.y += 0.002;
      }
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
      position-x={position.x}
      position-y={posY}
      position-z={position.z}
      scale={scale}
      rotation-y={rotationY}
    >
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        rotation={initialRotation}
      >
        {getObjectGeometry(name)}
        {getObjectMaterial(name, isHovered, isActive)}
      </mesh>
      
      {children}
    </animated.group>
  );
};

export default InteractiveObject; 