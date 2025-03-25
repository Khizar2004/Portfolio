import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const CanvasContainer = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 2rem;
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const ProgressBarContainer = styled.div`
  width: 300px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background-color: ${({ theme }) => theme.primary};
  transition: width 0.3s ease-in-out;
`;

const LoadingText = styled.div`
  font-size: 14px;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

// Animated 3D cube for the loading screen
const AnimatedCube = () => {
  const cubeRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = 0.5;
      cubeRef.current.rotation.y = 0.5;
    }
  }, []);
  
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={cubeRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#4cc9f0" wireframe />
      </mesh>
      <OrbitControls autoRotate autoRotateSpeed={5} enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

interface LoadingScreenProps {
  progress?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress = 0 }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading assets');

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
    <LoadingContainer>
      <CanvasContainer>
        <AnimatedCube />
      </CanvasContainer>
      <LogoContainer>
        <h1>My 3D Portfolio</h1>
      </LogoContainer>
      <ProgressBarContainer>
        <ProgressBar progress={loadingProgress} />
      </ProgressBarContainer>
      <LoadingText>{loadingText}</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingScreen; 