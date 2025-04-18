import React from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

// Import individual components
import Desk from './objects/Desk';
import Walls from './objects/Walls';
import DeskLamp from './objects/DeskLamp';
import KeyboardMat from './objects/KeyboardMat';
import Speaker from './objects/Speaker';
import InteractiveObjects from './InteractiveObjects';
import Monitor from './objects/Monitor';
// Import furniture components
import Chair from './objects/Chair';
import WallClock from './objects/WallClock';
import ModelRug from './objects/ModelRug';
import Couch from './objects/Couch';
import CoffeeTable from './objects/CoffeeTable';
// Import new components
import Bookcase from './objects/Bookcase';
import Cubecubby from './objects/Cubecubby';
import PictureFrame from './objects/PictureFrame';
import Pinboard from './objects/Pinboard';
import Window from './objects/Window';
import Trashcan from './objects/Trashcan';
import DebrisPapers from './objects/DebrisPapers';
// Import appliances and lighting
import Fridge from './objects/Fridge';
import CeilingLight from './objects/CeilingLight';
import Candle from './objects/Candle';
import PC from './objects/PC';
import MonkeyToy from './objects/MonkeyToy';
import Plant from './objects/Plant';

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
      <Window isDarkMode={isDarkMode} />
      <Desk isDarkMode={isDarkMode} />
      <Chair isDarkMode={isDarkMode} />
      <WallClock isDarkMode={isDarkMode} />
      <ModelRug isDarkMode={isDarkMode} />
      
      {/* Lighting */}
      <CeilingLight isDarkMode={isDarkMode} />
      <DeskLamp isDarkMode={isDarkMode} />
      <Candle isDarkMode={isDarkMode} />
      
      {/* Desk Setup */}
      <KeyboardMat isDarkMode={isDarkMode} />
      <Speaker isDarkMode={isDarkMode} />
      <Monitor isDarkMode={isDarkMode} />
      <PC isDarkMode={isDarkMode} />
      <MonkeyToy isDarkMode={isDarkMode} />
      
      {/* Wall Decorations */}
      <PictureFrame isDarkMode={isDarkMode} />
      <Pinboard isDarkMode={isDarkMode} />
      
      {/* Room Furniture */}
      <Bookcase isDarkMode={isDarkMode} />
      <Cubecubby isDarkMode={isDarkMode} />
      <Couch isDarkMode={isDarkMode} />
      <CoffeeTable isDarkMode={isDarkMode} />
      <Trashcan isDarkMode={isDarkMode} />
      <DebrisPapers isDarkMode={isDarkMode} />
      <Plant isDarkMode={isDarkMode} />
      
      {/* Appliances */}
      <Fridge isDarkMode={isDarkMode} />
      
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