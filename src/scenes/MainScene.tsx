import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useProgress } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { useSoundContext } from '../context/SoundContext';
import WorkspaceEnvironment from '../components/3d/WorkspaceEnvironment';
import ControlPanel from '../components/ui/ControlPanel';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

// Create an emergency back button that's always accessible
const EmergencyBackButton = styled.button<{ visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f44336;
  color: white;
  display: ${({ visible }) => visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 99999;
  
  &:hover {
    background-color: #d32f2f;
    transform: scale(1.1);
  }
`;

// Subtle ambient animation for the entire scene
const AmbientAnimation = ({ onObjectClick, activeObject }: { 
  onObjectClick: (objectName: string, position: THREE.Vector3, cameraPos: THREE.Vector3) => void;
  activeObject: string | null;
}) => {
  const sceneRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (sceneRef.current) {
      // Subtle breathing motion for the entire scene
      const t = clock.getElapsedTime();
      sceneRef.current.position.y = Math.sin(t * 0.2) * 0.05;
      
      // Very slight rotation for a more dynamic feel
      sceneRef.current.rotation.y = Math.sin(t * 0.1) * 0.02;
    }
  });
  
  return (
    <group ref={sceneRef}>
      <WorkspaceEnvironment 
        onObjectClick={onObjectClick} 
        activeObject={activeObject}
      />
    </group>
  );
};

interface MainSceneProps {
  onLoadComplete?: () => void;
}

const MainScene: React.FC<MainSceneProps> = ({ onLoadComplete }) => {
  const { theme } = useTheme();
  const { isSoundEnabled, isMusicEnabled } = useSoundContext();
  const [activeObject, setActiveObject] = useState<string | null>(null);
  const [cameraTarget, setCameraTarget] = useState(new THREE.Vector3(0, 0, 0));
  const [cameraPosition, setCameraPosition] = useState(new THREE.Vector3(5, 5, 5));
  const controlsRef = useRef<any>(null);
  
  // For tracking loading progress
  const { progress, loaded, total } = useProgress();
  
  useEffect(() => {
    if (loaded === total && total > 0 && onLoadComplete) {
      // Add a small delay to ensure everything is fully rendered
      const timeout = setTimeout(() => {
        onLoadComplete();
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [loaded, total, onLoadComplete]);

  const handleObjectClick = (objectName: string, position: THREE.Vector3, cameraPos: THREE.Vector3) => {
    setActiveObject(objectName);
    setCameraTarget(position);
    setCameraPosition(cameraPos);
    
    // Animate camera to new position
    if (controlsRef.current) {
      // Use manual animation instead of setLookAt which may not be available
      controlsRef.current.object.position.copy(cameraPos);
      controlsRef.current.target.copy(position);
    }
  };

  const resetCamera = () => {
    // First clear the active object
    setActiveObject(null);
    
    // Set default camera position and target with a small delay to ensure clean state
    setTimeout(() => {
      if (controlsRef.current) {
        // Use manual animation with default values
        controlsRef.current.object.position.set(5, 5, 5);
        controlsRef.current.target.set(0, 0, 0);
        
        // Force controls update to ensure camera changes are applied
        controlsRef.current.update();
      }
    }, 10);
  };

  const AnimatedScene = () => {
    return (
      <group>
        <WorkspaceEnvironment 
          onObjectClick={handleObjectClick} 
          activeObject={activeObject}
        />
      </group>
    );
  };

  return (
    <CanvasContainer>
      <Canvas
        gl={{ antialias: true }}
        shadows
        style={{ background: theme === 'dark' ? '#0f0f0f' : '#f5f5f5' }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        
        {/* Enhanced lighting setup */}
        <ambientLight intensity={theme === 'dark' ? 0.2 : 0.3} />
        
        {/* Main directional light for primary shadows */}
        <directionalLight 
          intensity={theme === 'dark' ? 0.8 : 1.2} 
          position={[10, 10, 5]} 
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
          shadow-camera-near={0.5}
          shadow-camera-far={20}
        />
        
        {/* Secondary fill light */}
        <directionalLight
          intensity={theme === 'dark' ? 0.2 : 0.4}
          position={[-5, 8, -5]}
          color={theme === 'dark' ? '#5a87d0' : '#fffcea'}
        />
        
        {/* Ground bounce light */}
        <directionalLight
          intensity={theme === 'dark' ? 0.1 : 0.2}
          position={[0, -1, 0]}
          color={theme === 'dark' ? '#4c4c4c' : '#f5f5f5'}
        />
        
        {/* Subtle rim light for depth */}
        <pointLight
          intensity={theme === 'dark' ? 0.15 : 0.3}
          position={[-5, 3, -5]}
          color={theme === 'dark' ? '#9ca9c9' : '#fcf4e8'}
          distance={15}
        />

        {/* Environment with animations */}
        <AmbientAnimation 
          onObjectClick={handleObjectClick}
          activeObject={activeObject}
        />
        
        {/* Camera controls */}
        <OrbitControls 
          ref={controlsRef}
          target={new THREE.Vector3(0, 0, 0)}
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>

      {/* UI Overlay */}
      <ControlPanel 
        activeObject={activeObject} 
        resetCamera={resetCamera} 
      />
      
      {/* Emergency back button that's guaranteed to work */}
      <EmergencyBackButton 
        onClick={resetCamera} 
        visible={!!activeObject}
        aria-label="Emergency back button"
      >
        ←
      </EmergencyBackButton>
    </CanvasContainer>
  );
};

export default MainScene; 