import React, { useState, useRef, useEffect, Suspense } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import WindowsProjectDisplay from '../../ui/WindowsProjectDisplay';
import { useSoundContext } from '../../../context/SoundContext';
import { useTheme } from '../../../context/ThemeContext';
import HtmlContextWrapper from '../../ui/HtmlContextWrapper';

interface ComputerProps {
  handleClick?: (name: string) => void;
  isActive?: boolean;
}

// ErrorBoundary component to catch and handle render errors
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error in Computer component:", error);
  }

  render() {
    if (this.state.hasError) {
      return null; // Return null instead of the crashed component
    }
    return this.props.children;
  }
}

const Computer: React.FC<ComputerProps> = ({ handleClick, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScreenOn, setIsScreenOn] = useState(false);
  const { playClickSound } = useSoundContext();
  const powerLightRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  
  // Debug effects to track component state
  useEffect(() => {
    console.log('Computer component rendered, isActive:', isActive);
    
    return () => {
      console.log('Computer component unmounted');
    };
  }, [isActive]);
  
  // Debug changes to screen state
  useEffect(() => {
    console.log('Screen state changed to:', isScreenOn);
  }, [isScreenOn]);
  
  useFrame(() => {
    if (powerLightRef.current && powerLightRef.current.material) {
      const material = powerLightRef.current.material as THREE.MeshStandardMaterial;
      if (isScreenOn) {
        material.emissiveIntensity = 0.8;
      } else {
        material.emissiveIntensity = 0.1;
      }
    }
  });
  
  const handlePointerOver = () => {
    console.log('Computer hover start');
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    console.log('Computer hover end');
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };
  
  const handleComputerClick = (e: ThreeEvent<MouseEvent>) => {
    console.log('Computer clicked, stopping propagation');
    e.stopPropagation();
    
    console.log('Playing click sound');
    playClickSound();
    
    console.log('Toggling screen state from', isScreenOn, 'to', !isScreenOn);
    setIsScreenOn(!isScreenOn);
    
    if (handleClick) {
      console.log('Calling parent handleClick with "computer"');
      handleClick('computer');
    }
  };
  
  return (
    <group name="computer">
      {/* Monitor base on stand */}
      <mesh position={[0, 0.11, 0]} castShadow>
        <boxGeometry args={[0.35, 0.02, 0.25]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Monitor neck - connects to stand */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.7} />
      </mesh>
      
      {/* Monitor screen frame */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.04]} />
        <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.6} />
      </mesh>
      
      {/* Monitor screen */}
      <mesh 
        position={[0, 0.42, 0.01]} 
        castShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleComputerClick}
      >
        <boxGeometry args={[0.75, 0.45, 0.01]} />
        <meshStandardMaterial 
          color={isHovered ? "#424c66" : "#202538"} 
          emissive={isScreenOn ? "#ffffff" : "#304070"} 
          emissiveIntensity={isScreenOn ? 0.3 : 0.1}
          roughness={0.1} 
          metalness={0.2}
        />
        
        {isScreenOn && (
          <ErrorBoundary>
            <Suspense fallback={null}>
              <HtmlContextWrapper currentTheme={theme}>
                <Html
                  transform
                  distanceFactor={0.42}
                  position={[0, 0, 0.01]}
                  style={{
                    width: '750px',
                    height: '450px',
                    overflow: 'hidden',
                    pointerEvents: 'none'
                  }}
                >
                  <div style={{ width: '100%', height: '100%' }}>
                    <WindowsProjectDisplay currentTheme={theme} />
                  </div>
                </Html>
              </HtmlContextWrapper>
            </Suspense>
          </ErrorBoundary>
        )}
      </mesh>
      
      {/* Power indicator */}
      <mesh 
        ref={powerLightRef}
        position={[0.35, 0.22, 0.025]} 
        castShadow
      >
        <boxGeometry args={[0.01, 0.01, 0.01]} />
        <meshStandardMaterial 
          color="#00ff00" 
          emissive="#00ff00"
          emissiveIntensity={isScreenOn ? 0.8 : 0.1}
        />
      </mesh>
      
      {/* Power button */}
      <mesh 
        position={[0.35, 0.20, 0.025]} 
        castShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleComputerClick}
      >
        <boxGeometry args={[0.02, 0.02, 0.01]} />
        <meshStandardMaterial 
          color={isHovered ? "#555555" : "#333333"} 
          roughness={0.4} 
          metalness={0.6} 
        />
      </mesh>
      
      {/* Logo on base */}
      <mesh position={[0, 0.12, 0.13]} castShadow>
        <boxGeometry args={[0.1, 0.01, 0.01]} />
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
};

export default Computer;