import React, { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

// Import individual components
import Desk from './objects/Desk';
import Walls from './objects/Walls';
import DeskLamp from './objects/DeskLamp';
import Shelf from './objects/Shelf';
import KeyboardMat from './objects/KeyboardMat';
import HeadphoneStand from './objects/HeadphoneStand';
import InteractiveObjects from './InteractiveObjects';
import Monitor from './objects/Monitor';
// Import furniture components
import Chair from './objects/Chair';
import WallClock from './objects/WallClock';
import Rug from './objects/Rug';
import Couch from './objects/Couch';
import CoffeeTable from './objects/CoffeeTable';
import CeilingLight from './objects/CeilingLight';

interface WorkspaceEnvironmentProps {
  onObjectClick: (objectName: string, position: THREE.Vector3, cameraPos: THREE.Vector3) => void;
  activeObject: string | null;
}

const WorkspaceEnvironment: React.FC<WorkspaceEnvironmentProps> = ({ onObjectClick, activeObject }) => {
  const { theme } = useTheme();
  const { size } = useThree();
  const isDarkMode = theme === 'dark';
  const isMobile = size.width < 768;

  return (
    <group>
      {/* Static Environment */}
      <Walls isDarkMode={isDarkMode} />
      <Desk isDarkMode={isDarkMode} />
      <Chair isDarkMode={isDarkMode} />
      <WallClock isDarkMode={isDarkMode} />
      <Rug isDarkMode={isDarkMode} />
      <CeilingLight isDarkMode={isDarkMode} />
      
      {/* Desk Setup */}
      <DeskLamp isDarkMode={isDarkMode} />
      <KeyboardMat isDarkMode={isDarkMode} />
      <HeadphoneStand isDarkMode={isDarkMode} />
      <Monitor isDarkMode={isDarkMode} />
      
      {/* Lounge Area */}
      <Couch isDarkMode={isDarkMode} />
      <CoffeeTable isDarkMode={isDarkMode} />
      
      {/* Interactive Objects */}
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