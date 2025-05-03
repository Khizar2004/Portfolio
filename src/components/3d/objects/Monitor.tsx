import React, { useEffect, useState, useCallback } from 'react';
import { useGLTF, type GLTFResult, Html } from '@react-three/drei';
import * as THREE from 'three';
import AppleBootAnimation from '../../ui/AppleBootAnimation';
import AppleProjectDisplay from '../../ui/AppleProjectDisplay';
import styled from 'styled-components';

// Power button styling
const PowerButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 150;
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Shutdown animation
const ShutdownOverlay = styled.div<{ $isShuttingDown: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: ${props => props.$isShuttingDown ? 1 : 0};
  transition: opacity 1s ease-in-out;
  pointer-events: none;
  z-index: 140;
`;

interface MonitorProps {
  isDarkMode?: boolean;
  isMobile?: boolean;
}

// Define your real projects here
const myProjects = [
  { 
    title: "3D Portfolio", 
    repo: "https://github.com/khizaraamir/Portfolio",
    description: "Interactive 3D portfolio built with Three.js and React" 
  },
  { 
    title: "Personal Website", 
    repo: "https://github.com/khizaraamir/portfolio",
    description: "Personal portfolio website" 
  },
  { 
    title: "Web Development", 
    repo: "https://github.com/khizaraamir/web-development",
    description: "Collection of web development projects" 
  },
  { 
    title: "Open Source", 
    repo: "https://github.com/khizaraamir",
    description: "View all my open source contributions" 
  },
  { 
    title: "Resume", 
    repo: "https://github.com/khizaraamir/Portfolio/blob/main/resume.pdf",
    description: "My professional resume" 
  }
];

const Monitor: React.FC<MonitorProps> = ({ isDarkMode = false, isMobile = false }) => {
  const { scene, materials } = useGLTF('/models/Monitor.glb') as GLTFResult;
  const [isActive, setIsActive] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [bootSound] = useState(() => new Audio('/sounds/monitor_startup.mp3'));
  const [shutdownSound] = useState(() => new Audio('/sounds/monitor_shutdown.mp3'));

  // Optionally adjust materials based on dark mode
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.setHex(isDarkMode ? 0x222222 : 0x444444);
          // Add screen glow in dark mode
          if (material.name === 'screen') {
            material.emissive.setHex(isDarkMode ? 0x3366ff : 0x3366ff);
            material.emissiveIntensity = isActive ? 0.8 : 0.2;
          }
        }
      });
    }
  }, [isDarkMode, materials, isActive]);

  const handleMonitorClick = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      setIsBooting(true);
      
      // Play boot sound
      bootSound.volume = 0.3;
      bootSound.play().catch(e => console.error("Error playing sound:", e));
    }
  }, [isActive, bootSound]);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
    setShowProjects(true);
  }, []);

  const handleShutdown = useCallback(() => {
    if (isActive && !isShuttingDown) {
      // Play shutdown sound
      shutdownSound.volume = 0.3;
      shutdownSound.play().catch(e => console.error("Error playing sound:", e));
      
      // Start shutdown animation
      setIsShuttingDown(true);
      
      // After animation completes, turn off monitor
      setTimeout(() => {
        setIsActive(false);
        setShowProjects(false);
        setIsShuttingDown(false);
      }, 1500); // Match with transition duration
    }
  }, [isActive, isShuttingDown, shutdownSound]);

  return (
    <group onClick={handleMonitorClick}>
      <primitive object={scene} scale={3} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>
      
      {/* Screen Content */}
      {isActive && (
        <Html
          position={[0, isMobile ? 0.83 : 0.85, 0.04]}
          transform
          scale={isMobile ? 0.09 : 0.1}
          occlude
        >
          <div style={{ width: '530px', height: '250px', position: 'relative', overflow: 'hidden' }}>
            <AppleBootAnimation 
              isBooting={isBooting} 
              onBootComplete={handleBootComplete} 
            />
            <AppleProjectDisplay 
              isVisible={showProjects} 
              currentTheme={isDarkMode ? 'dark' : 'light'}
              projects={myProjects}
              className="custom-display"
            />
            <PowerButton onClick={(e) => {
              e.stopPropagation();
              handleShutdown();
            }}>
              ⏻
            </PowerButton>
            <ShutdownOverlay $isShuttingDown={isShuttingDown} />
          </div>
        </Html>
      )}
    </group>
  );
};

useGLTF.preload('/models/Monitor.glb');
export default Monitor; 