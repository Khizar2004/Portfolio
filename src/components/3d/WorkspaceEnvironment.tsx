import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

// Import individual components
import Desk from './objects/Desk';
import Floor from './objects/Floor';
import Walls from './objects/Walls';
import DeskLamp from './objects/DeskLamp';
import WallPicture from './objects/WallPicture';
import Shelf from './objects/Shelf';
import KeyboardMat from './objects/KeyboardMat';
import MonitorStand from './objects/MonitorStand';
import HeadphoneStand from './objects/HeadphoneStand';
import Window from './objects/Window';
import InteractiveObjects from './InteractiveObjects';

interface WorkspaceEnvironmentProps {
  onObjectClick: (objectName: string, position: THREE.Vector3, cameraPos: THREE.Vector3) => void;
  activeObject: string | null;
}

const WorkspaceEnvironment: React.FC<WorkspaceEnvironmentProps> = ({ 
  onObjectClick,
  activeObject
}) => {
  const { theme } = useTheme();
  const { size } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const isDarkMode = theme === 'dark';
  const isMobile = size.width < 768;
  
  // Very subtle breathing effect
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Fixed environment elements */}
      <Desk isDarkMode={isDarkMode} />
      <Floor isDarkMode={isDarkMode} />
      <Walls isDarkMode={isDarkMode} />
      <DeskLamp isDarkMode={isDarkMode} />
      <WallPicture isDarkMode={isDarkMode} />
      <Shelf isDarkMode={isDarkMode} />
      <KeyboardMat isDarkMode={isDarkMode} />
      <MonitorStand isDarkMode={isDarkMode} />
      <HeadphoneStand isDarkMode={isDarkMode} />
      <Window isDarkMode={isDarkMode} />
      
      {/* Ambient text */}
      <Text
        position={[0, 1.5, -1.4]}
        fontSize={0.2}
        color={isDarkMode ? "#ffffff" : "#333333"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        PORTFOLIO
      </Text>
      
      {/* Interactive objects */}
      <InteractiveObjects 
        onObjectClick={onObjectClick} 
        activeObject={activeObject}
        isMobile={isMobile}
        theme={theme}
      />
    </group>
  );
};

export default WorkspaceEnvironment; 