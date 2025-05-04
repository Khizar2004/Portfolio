import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div<{ $isDarkMode: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.$isDarkMode ? '#050505' : '#f0f0f0'};
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const CanvasContainer = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const Title = styled.h1<{ $isDarkMode: boolean }>`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.$isDarkMode ? '#ffffff' : '#333333'};
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0;
  text-shadow: ${props => props.$isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none'};
`;

const SubTitle = styled.p<{ $isDarkMode: boolean }>`
  font-size: 1rem;
  color: ${props => props.$isDarkMode ? '#aaaaaa' : '#666666'};
  margin-top: 0.5rem;
  text-align: center;
`;

const ProgressBarContainer = styled.div<{ $isDarkMode: boolean }>`
  width: 300px;
  height: 6px;
  background-color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
`;

const ProgressBar = styled.div<{ $progress: number; $isDarkMode: boolean }>`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background: ${props => props.$isDarkMode
    ? 'linear-gradient(90deg, #4cc9f0, #4361ee)' 
    : 'linear-gradient(90deg, #3a86ff, #4cc9f0)'};
  transition: width 0.3s ease-in-out;
  box-shadow: 0 0 10px ${props => props.$isDarkMode ? 'rgba(76, 201, 240, 0.5)' : 'rgba(76, 201, 240, 0.3)'};
`;

const LoadingText = styled.div<{ $isDarkMode: boolean }>`
  font-size: 14px;
  letter-spacing: 1px;
  color: ${props => props.$isDarkMode ? '#dddddd' : '#555555'};
  opacity: 0.8;
  margin-top: 1rem;
`;

const Spinner = styled.div<{ $isDarkMode: boolean }>`
  width: 30px;
  height: 30px;
  border: 3px solid ${props => props.$isDarkMode ? '#333333' : '#dddddd'};
  border-top: 3px solid ${props => props.$isDarkMode ? '#4cc9f0' : '#3a86ff'};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  margin-top: 1rem;
`;

// Animated 3D model for the loading screen
const AnimatedModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.5;
    }
    
    if (boxRef.current) {
      boxRef.current.rotation.x = t * 0.7;
      boxRef.current.rotation.z = t * 0.5;
    }
    
    if (sphereRef.current) {
      // Orbit the sphere around the box
      sphereRef.current.position.x = Math.sin(t) * 1.5;
      sphereRef.current.position.z = Math.cos(t) * 1.5;
      sphereRef.current.position.y = Math.sin(t * 2) * 0.5;
    }
  });
  
  const darkMode = theme === 'dark';
  
  return (
    <group ref={groupRef}>
      {/* Central cube */}
      <mesh ref={boxRef} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={darkMode ? "#4cc9f0" : "#3a86ff"} 
          wireframe={true} 
          emissive={darkMode ? "#4cc9f0" : "#3a86ff"}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Orbiting sphere */}
      <mesh ref={sphereRef} position={[1.5, 0, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={darkMode ? "#f72585" : "#ff006e"} 
          emissive={darkMode ? "#f72585" : "#ff006e"}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Text */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.5}
        color={darkMode ? "#ffffff" : "#333333"}
        anchorX="center"
        anchorY="middle"
      >
        Loading...
      </Text>
    </group>
  );
};

interface LoadingScreenProps {
  progress?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress = 0 }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading assets');
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    // If no progress is provided, use a fake progress simulation
    if (progress === 0) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          // Slow down as we reach 90%
          const increment = prev < 50 ? 5 : prev < 80 ? 3 : 0.5;
          const newProgress = Math.min(prev + increment, 99);
          return newProgress;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setLoadingProgress(progress);
    }
  }, [progress]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const dots = prev.match(/\./g)?.length || 0;
        return `Loading assets${'.'.repeat((dots + 1) % 4)}`;
      });
    }, 500);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <LoadingContainer $isDarkMode={isDarkMode}>
      <CanvasContainer>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={Math.min(window.devicePixelRatio, 2)}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight 
            position={[0, 10, 0]} 
            angle={0.3} 
            penumbra={1} 
            intensity={2} 
            castShadow 
          />
          <AnimatedModel />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false} 
          />
        </Canvas>
      </CanvasContainer>
      
      <LogoContainer>
        <Title $isDarkMode={isDarkMode}>3D Portfolio</Title>
        <SubTitle $isDarkMode={isDarkMode}>Interactive Web Experience</SubTitle>
      </LogoContainer>
      
      <ProgressBarContainer $isDarkMode={isDarkMode}>
        <ProgressBar $progress={loadingProgress} $isDarkMode={isDarkMode} />
      </ProgressBarContainer>
      
      <LoadingText $isDarkMode={isDarkMode}>{loadingText}</LoadingText>
      <Spinner $isDarkMode={isDarkMode} />
    </LoadingContainer>
  );
};

export default LoadingScreen; 