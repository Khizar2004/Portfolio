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

// Emergency back button removed - ESC key functionality only

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
  const [showDarkModeTooltip, setShowDarkModeTooltip] = useState(false);
  const [dpr, setDpr] = useState(1.5);
  const [deviceType, setDeviceType] = useState('desktop');
  
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

  // Show dark mode tooltip when theme changes to dark
  useEffect(() => {
    if (theme === 'dark' && !showTooltip) {
      setShowDarkModeTooltip(true);
      // Hide the tooltip after 5 seconds
      const timeout = setTimeout(() => {
        setShowDarkModeTooltip(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [theme, showTooltip]);

  // Detect device type
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDeviceType('mobile');
      } else if (window.innerWidth <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    // Initial check
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleObjectClick = useCallback((objectName: string, position: THREE.Vector3, cameraPos: THREE.Vector3) => {
    // Make sure to update the controls enabled state
    setControlsEnabled(false);
    playClickSound();
    setActiveObject(objectName);
    setCameraTarget(position);
    
    // Animate camera to new position with improved smoothness
    if (controlsRef.current) {
      const duration = 800; // ms - slightly shorter for better UX
      const startPosition = controlsRef.current.object.position.clone();
      const startTarget = controlsRef.current.target.clone();
      
      const startTime = Date.now();
      
      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Cubic ease out for smooth motion
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        // Update position and target
        controlsRef.current.object.position.lerpVectors(
          startPosition,
          cameraPos,
          easeProgress
        );
        
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
      const duration = 800; // ms - slightly shorter for better UX
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
        
        // Update position and target in one operation
        controlsRef.current.object.position.lerpVectors(
          startPosition,
          defaultPosition,
          easeProgress
        );
        
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

  const handleCloseTooltip = useCallback(() => {
    playClickSound();
    setShowTooltip(false);
  }, [playClickSound]);

  const handlePerformanceChange = useCallback((api: PerformanceMonitorApi) => {
    // Adjust graphics quality based on performance
    setDpr(Math.max(1, Math.min(1.5, api.factor * 2)));
  }, []);

  // Handle background click to exit object view on mobile
  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    if (deviceType === 'mobile' && activeObject) {
      // Only reset if clicking directly on the canvas container (not on UI elements)
      if (e.target === e.currentTarget) {
        resetCamera();
      }
    }
  }, [deviceType, activeObject, resetCamera]);

  return (
    <CanvasContainer onClick={handleBackgroundClick}>
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
        onClick={(e: any) => {
          // Handle background clicks on the canvas for mobile
          if (deviceType === 'mobile' && activeObject) {
            // Check if we have an intersection with a 3D object
            const hasHit = e.intersections && e.intersections.length > 0;
            if (!hasHit) {
              resetCamera();
            }
          }
        }}
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
          <ambientLight intensity={theme === 'dark' ? 0.35 : 0.45} color={theme === 'dark' ? '#2c2c2c' : '#fff5e6'} />
          
          {/* Main directional light */}
          <directionalLight 
            intensity={theme === 'dark' ? 0.8 : 1.2} 
            position={[5, 8, 5]} 
            color={theme === 'dark' ? '#a0a0ff' : '#fffaed'}
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
            color={theme === 'dark' ? '#5a87d0' : '#ffe0c0'}
          />
          
          {/* Ground bounce light */}
          <directionalLight
            intensity={theme === 'dark' ? 0.1 : 0.2}
            position={[0, -1, 0]}
            color={theme === 'dark' ? '#4c4c4c' : '#fff0e0'}
          />
          
          {/* Rim light for warm accent */}
          <pointLight
            intensity={theme === 'dark' ? 0.2 : 0.4}
            position={[-3, 2, -3]}
            color={theme === 'dark' ? '#ffa060' : '#ffcc80'}
            distance={12}
          />
          
          {/* Extra cozy point light */}
          <pointLight
            intensity={theme === 'dark' ? 0.3 : 0.2}
            position={[4, 1, 2]}
            color={theme === 'dark' ? '#ff9e5e' : '#ffe0b0'}
            distance={8}
            decay={2}
          />
          
          {/* Atmospheric hemispheric light */}
          <hemisphereLight
            intensity={theme === 'dark' ? 0.1 : 0.15}
            color={theme === 'dark' ? '#2a3a60' : '#fff8e0'}
            groundColor={theme === 'dark' ? '#211a10' : '#ffe0b0'}
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
            minDistance={1.5}
            maxDistance={12}
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

      {/* Dark mode lighting tooltip */}
      {showDarkModeTooltip && (
        <Tooltip
          text="Tip: Click the ceiling light to turn it on or off!"
          buttonText="OK"
          onButtonClick={() => setShowDarkModeTooltip(false)}
          active={showDarkModeTooltip}
          onClose={() => setShowDarkModeTooltip(false)}
        />
      )}
    </CanvasContainer>
  );
};

export default MainScene; 