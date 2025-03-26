import React, { useState, useCallback } from 'react';
import { useSoundContext } from '../../../context/SoundContext';

interface CeilingLightProps {
  isDarkMode: boolean;
}

const CeilingLight: React.FC<CeilingLightProps> = ({ isDarkMode }) => {
  const [isOn, setIsOn] = useState(false);
  const { playClickSound } = useSoundContext();

  const handleClick = useCallback((e: any) => {
    e.stopPropagation();
    playClickSound();
    setIsOn(prev => !prev);
  }, [playClickSound]);

  const lightIntensity = isDarkMode 
    ? (isOn ? 3 : 0.0)  // Dark mode: off when not clicked
    : (isOn ? 1.2 : 0.8); // Light mode: subtle difference

  return (
    <group position={[4, 3.4, -0.5]} onClick={handleClick}>
      {/* Ceiling mount */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
        <meshStandardMaterial color={isDarkMode ? "#1a1a1a" : "#e0e0e0"} />
      </mesh>

      {/* Light fixture */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.08, 32]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#2a2a2a" : "#f0f0f0"}
          emissive={isDarkMode ? (isOn ? "#f8e9a1" : "#1a1a1a") : "#f8e9a1"}
          emissiveIntensity={isDarkMode ? (isOn ? 0.5 : 0.0) : 0.2}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Main light */}
      <pointLight
        position={[0, -0.2, 0]}
        intensity={lightIntensity}
        distance={8}
        color={isDarkMode ? "#f8e9a1" : "#fff5e6"}
        castShadow
      />

      {/* Additional fill lights for better coverage */}
      <pointLight
        position={[1, -0.2, 0]}
        intensity={lightIntensity * 0.6}
        distance={6}
        color={isDarkMode ? "#f8e9a1" : "#fff5e6"}
      />
      
      <pointLight
        position={[-1, -0.2, 0]}
        intensity={lightIntensity * 0.6}
        distance={6}
        color={isDarkMode ? "#f8e9a1" : "#fff5e6"}
      />
    </group>
  );
};

export default CeilingLight; 