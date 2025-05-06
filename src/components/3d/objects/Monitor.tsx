import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useGLTF, type GLTFResult, Html } from '@react-three/drei';
import * as THREE from 'three';
import AppleBootAnimation from '../../ui/AppleBootAnimation';
import AppleProjectDisplay from '../../ui/AppleProjectDisplay';
import styled from 'styled-components';
import { MobileScreenContext } from '../../../scenes/MainScene';

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

// Define projects
const myProjects = [
  { 
    title: "Portfolio Website", 
    repo: "https://github.com/Khizar2004/Portfolio",
    description: "Interactive 3D portfolio" 
  },
  { 
    title: "TSKFLO", 
    repo: "https://github.com/Khizar2004/TSKFLO",
    description: "A task management system" 
  },
  { 
    title: "StrikeDen", 
    repo: "https://github.com/Khizar2004/StrikeDen",
    description: "A gym management system used by a real gym" 
  },
  { 
    title: "Remember", 
    repo: "https://github.com/Khizar2004/Remember",
    description: "A fallout themed pixel art memory storage app" 
  },
  { 
    title: "Loreleaf", 
    repo: "https://github.com/Khizar2004/Loreleaf",
    description: "A web app to form connections between ideas" 
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
  
  // Use the mobile screen context instead of managing state locally
  const { showMobileScreen, setShowMobileScreen } = useContext(MobileScreenContext);

  // Reset isActive when mobile screen is closed
  useEffect(() => {
    if (!showMobileScreen && isActive && isMobile) {
      setIsActive(false);
    }
  }, [showMobileScreen, isActive, isMobile]);

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
      
      if (isMobile) {
        // For mobile, show the fullscreen view using the context
        setShowMobileScreen(true);
      } else {
        // For desktop, show boot animation in the monitor
        setIsBooting(true);
        
        // Play boot sound
        bootSound.volume = 0.3;
        bootSound.play().catch(e => console.error("Error playing sound:", e));
      }
    }
  }, [isActive, bootSound, isMobile, setShowMobileScreen]);

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
      
      {/* Screen Content - only show for desktop */}
      {isActive && !isMobile && (
        <Html
          position={[0, 0.85, 0.02]}
          transform
          scale={0.1}
          occlude
          center
        >
          <div style={{ 
            width: '530px', 
            height: '250px', 
            position: 'relative', 
            overflow: 'hidden' 
          }}>
            <AppleBootAnimation 
              isBooting={isBooting} 
              onBootComplete={handleBootComplete} 
            />
            <AppleProjectDisplay 
              isVisible={showProjects} 
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