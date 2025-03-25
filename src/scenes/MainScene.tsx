import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, PerformanceMonitor, type PerformanceMonitorApi } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { useSoundContext } from '../context/SoundContext';
import WorkspaceEnvironment from '../components/3d/WorkspaceEnvironment';
import ControlPanel from '../components/ui/ControlPanel';
import Tooltip from '../components/ui/Tooltip';
import AmbientAnimation from '../components/3d/AmbientAnimation';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

// Create an emergency back button that's always accessible
const EmergencyBackButton = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f44336;
  color: white;
  display: ${({ $visible }) => $visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 99999;
  transition: transform 0.2s ease, background-color 0.2s ease;
  
  &:hover {
    background-color: #d32f2f;
    transform: scale(1.1);
  }
`;

interface MainSceneProps {
  onLoadComplete?: () => void;
}

const MainScene: React.FC<MainSceneProps> = ({ onLoadComplete }) => {
  const { theme } = useTheme();
  const { playClickSound } = useSoundContext();
  const [activeObject, setActiveObject] = useState<string | null>(null);
  const [cameraTarget, setCameraTarget] = useState(new THREE.Vector3(0, 0, 0));
  const controlsRef = useRef<any>(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const [dpr, setDpr] = useState(1.5);
  
  // Add a state for tracking if controls are enabled
  const [controlsEnabled, setControlsEnabled] = useState(true);
  
  useEffect(() => {
    if (onLoadComplete) {
      // Add a small delay to ensure everything is fully rendered
      const timeout = setTimeout(() => {
        onLoadComplete();
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [onLoadComplete]);

  const handleObjectClick = useCallback((objectName: string, position: THREE.Vector3, cameraPos: THREE.Vector3) => {
    // Make sure to update the controls enabled state
    setControlsEnabled(false);
    playClickSound();
    setActiveObject(objectName);
    setCameraTarget(position);
    
    // Animate camera to new position with GSAP-like smoothness
    if (controlsRef.current) {
      const duration = 1000; // ms
      const startPosition = controlsRef.current.object.position.clone();
      const startTarget = controlsRef.current.target.clone();
      
      const startTime = Date.now();
      
      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Cubic ease out for smooth motion
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        // Update position
        controlsRef.current.object.position.lerpVectors(
          startPosition,
          cameraPos,
          easeProgress
        );
        
        // Update target
        controlsRef.current.target.lerpVectors(
          startTarget,
          position,
          easeProgress
        );
        
        // Force controls update
        controlsRef.current.update();
        
        // Continue animation if not complete
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Re-enable controls when animation is complete
          setTimeout(() => setControlsEnabled(true), 100);
        }
      };
      
      // Start animation
      animate();
    }
  }, [playClickSound]);

  const resetCamera = useCallback(() => {
    // First clear the active object
    if (!activeObject) return; // Prevent unnecessary resets
    
    setControlsEnabled(false);
    setActiveObject(null);
    
    // Animate camera back to default
    if (controlsRef.current) {
      const duration = 1000; // ms
      const startPosition = controlsRef.current.object.position.clone();
      const startTarget = controlsRef.current.target.clone();
      const defaultPosition = new THREE.Vector3(4, 3, 4);
      const defaultTarget = new THREE.Vector3(0, 0, 0);
      
      const startTime = Date.now();
      
      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Cubic ease out
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        // Update position
        controlsRef.current.object.position.lerpVectors(
          startPosition,
          defaultPosition,
          easeProgress
        );
        
        // Update target
        controlsRef.current.target.lerpVectors(
          startTarget,
          defaultTarget,
          easeProgress
        );
        
        // Force update
        controlsRef.current.update();
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Re-enable controls when animation is complete
          setTimeout(() => setControlsEnabled(true), 100);
        }
      };
      
      animate();
    }
  }, [activeObject]);

  // Add a redundant keyboard event handler at the main scene level
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeObject) {
        e.preventDefault();
        e.stopPropagation();
        resetCamera();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [activeObject, resetCamera]);

  // Force a handler for the emergency back button to be more reliable
  const handleEmergencyBack = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playClickSound();
    resetCamera();
  }, [playClickSound, resetCamera]);

  const handleCloseTooltip = useCallback(() => {
    playClickSound();
    setShowTooltip(false);
  }, [playClickSound]);

  const handlePerformanceChange = useCallback((api: PerformanceMonitorApi) => {
    // Adjust graphics quality based on performance
    setDpr(Math.max(1, Math.min(1.5, api.factor * 2)));
  }, []);

  return (
    <CanvasContainer>
      <Canvas
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
          depth: true,
          stencil: false,
          logarithmicDepthBuffer: true,
        }}
        shadows
        style={{ 
          background: theme === 'dark' 
            ? 'radial-gradient(circle at center, #121212 0%, #050505 100%)' 
            : 'radial-gradient(circle at center, #f8f8f8 0%, #e0e0e0 100%)'
        }}
        dpr={dpr}
      >
        <PerformanceMonitor onDecline={handlePerformanceChange}>
          <fog 
            attach="fog" 
            args={[theme === 'dark' ? '#050505' : '#f0f0f0', 10, 20]} 
          />
          
          <PerspectiveCamera 
            makeDefault 
            position={[4, 3, 4]} 
            fov={45} 
            near={0.1}
            far={100}
          />
          
          {/* Enhanced lighting setup */}
          <ambientLight intensity={theme === 'dark' ? 0.3 : 0.4} />
          
          {/* Main directional light */}
          <directionalLight 
            intensity={theme === 'dark' ? 0.8 : 1.2} 
            position={[5, 8, 5]} 
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
            shadow-camera-near={0.5}
            shadow-camera-far={20}
          />
          
          {/* Secondary fill light */}
          <directionalLight
            intensity={theme === 'dark' ? 0.2 : 0.4}
            position={[-3, 5, -3]}
            color={theme === 'dark' ? '#5a87d0' : '#fffcea'}
          />
          
          {/* Ground bounce light */}
          <directionalLight
            intensity={theme === 'dark' ? 0.1 : 0.2}
            position={[0, -1, 0]}
            color={theme === 'dark' ? '#4c4c4c' : '#f5f5f5'}
          />
          
          {/* Rim light */}
          <pointLight
            intensity={theme === 'dark' ? 0.15 : 0.3}
            position={[-3, 2, -3]}
            color={theme === 'dark' ? '#9ca9c9' : '#fcf4e8'}
            distance={12}
          />

          {/* Stars in dark mode - subtle effect */}
          {theme === 'dark' && (
            <Stars 
              radius={80} 
              depth={50} 
              count={800} 
              factor={4} 
              saturation={0.2} 
              fade
              speed={0.3}
            />
          )}

          {/* Environment */}
          <AmbientAnimation 
            onObjectClick={handleObjectClick}
            activeObject={activeObject}
          />
          
          {/* Camera controls */}
          <OrbitControls 
            ref={controlsRef}
            target={cameraTarget}
            enablePan={false}
            enableZoom={controlsEnabled}
            enableRotate={controlsEnabled}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={2}
            maxDistance={8}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            zoomSpeed={0.7}
          />
        </PerformanceMonitor>
      </Canvas>

      {/* UI Overlay */}
      <ControlPanel 
        activeObject={activeObject} 
        resetCamera={resetCamera} 
      />
      
      {/* Emergency back button */}
      <EmergencyBackButton 
        onClick={handleEmergencyBack}
        $visible={!!activeObject}
        aria-label="Back to overview"
      >
        ←
      </EmergencyBackButton>
      
      {/* Welcome tooltip with instructions */}
      {showTooltip && (
        <Tooltip
          text="Welcome to my interactive portfolio! Click on objects in the room to explore my work."
          buttonText="Got it!"
          onButtonClick={handleCloseTooltip}
          active={showTooltip}
          onClose={handleCloseTooltip}
        />
      )}
    </CanvasContainer>
  );
};

export default MainScene; 