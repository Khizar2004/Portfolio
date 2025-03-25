import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
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
    setActiveObject(null);
    
    // Set default camera position and target
    if (controlsRef.current) {
      // Use manual animation
      controlsRef.current.object.position.set(5, 5, 5);
      controlsRef.current.target.set(0, 0, 0);
    }
  };

  return (
    <CanvasContainer>
      <Canvas
        gl={{ antialias: true }}
        shadows
        style={{ background: theme === 'dark' ? '#0f0f0f' : '#f5f5f5' }}
      >
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        
        {/* Main lighting setup */}
        <ambientLight intensity={theme === 'dark' ? 0.3 : 0.5} />
        <directionalLight 
          intensity={theme === 'dark' ? 1 : 1.5} 
          position={[10, 10, 5]} 
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Environment */}
        <WorkspaceEnvironment 
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
    </CanvasContainer>
  );
};

export default MainScene; 