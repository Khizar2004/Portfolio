import React, { useState, useCallback } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useSoundContext } from '../../../context/SoundContext';

interface DeskLampProps {
  isDarkMode: boolean;
}

const DeskLamp: React.FC<DeskLampProps> = ({ isDarkMode }) => {
  const [isOn, setIsOn] = useState(false);
  const { playClickSound } = useSoundContext();

  const handleClick = useCallback((e: any) => {
    e.stopPropagation();
    playClickSound();
    setIsOn(prev => !prev);
  }, [playClickSound]);

  const lightIntensity = isDarkMode 
    ? (isOn ? 2.0 : 0.7)  // Dark mode: brighter when on
    : (isOn ? 1.5 : 1.2); // Light mode: subtle difference

  const lightColor = isDarkMode
    ? (isOn ? "#f8e9a1" : "#a0a0ff") // Warmer light when on in dark mode
    : "#f8e9a1";                      // Always warm in light mode

  return (
    <group position={[-1.2, 0, -0.6]} onClick={handleClick}>
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.3, 16]} />
        <meshStandardMaterial color={isDarkMode ? "#1a1a1a" : "#2c2c2c"} />
      </mesh>
      <mesh position={[0, 0.35, 0.15]} castShadow>
        <boxGeometry args={[0.02, 0.4, 0.02]} />
        <meshStandardMaterial color={isDarkMode ? "#1a1a1a" : "#2c2c2c"} />
      </mesh>
      <mesh position={[0, 0.55, 0.3]} castShadow rotation={[-Math.PI/4, 0, 0]}>
        <boxGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial color={isDarkMode ? "#1a1a1a" : "#2c2c2c"} />
      </mesh>
      <mesh position={[0, 0.66, 0.42]} castShadow rotation={[-Math.PI/4, 0, 0]}>
        <coneGeometry args={[0.12, 0.2, 16]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#3a3a3a" : "#e5e5e5"} 
          emissive={isDarkMode ? (isOn ? "#f0c420" : "#5a5a5a") : "#f0c420"} 
          emissiveIntensity={isDarkMode ? (isOn ? 0.8 : 0.3) : 0.2} 
        />
      </mesh>
      <pointLight 
        position={[0, 0.67, 0.43]} 
        intensity={lightIntensity} 
        distance={isOn ? 6 : 3} 
        color={lightColor}
        castShadow
      />
    </group>
  );
};

export default DeskLamp; 