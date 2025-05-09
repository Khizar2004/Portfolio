import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import AppleProjectDisplay from './AppleProjectDisplay';
import AppleBootAnimation from './AppleBootAnimation';
import { ThemeMode } from '../../context/ThemeContext';
import { useSoundContext } from '../../context/SoundContext';

interface FullscreenContainerProps {
  $isDarkMode: boolean;
}

const FullscreenContainer = styled.div<FullscreenContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.$isDarkMode ? '#121212' : '#f0f0f0'};
  
  /* Custom styles for Apple display in fullscreen */
  .fullscreen-display {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  &:active {
    transform: scale(0.95);
  }
`;

const MusicButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  &:active {
    transform: scale(0.95);
  }
`;

interface MobileScreenViewProps {
  isVisible: boolean;
  onClose: () => void;
  theme: ThemeMode;
  projects: any[];
}

const MobileScreenView: React.FC<MobileScreenViewProps> = ({ isVisible, onClose, theme, projects }) => {
  const [isBooting, setIsBooting] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const { isMusicEnabled, toggleMusic, playClickSound } = useSoundContext();
  
  // Handle boot animation when component becomes visible
  useEffect(() => {
    if (isVisible) {
      // Start boot animation
      setIsBooting(true);
      setShowProjects(false);
      
      // Optional: Play boot sound
      const bootSound = new Audio('/sounds/monitor_startup.mp3');
      bootSound.volume = 0.3;
      bootSound.play().catch(e => console.error("Error playing sound:", e));
    } else {
      // Reset states when closed
      setIsBooting(false);
      setShowProjects(false);
    }
  }, [isVisible]);
  
  const handleBootComplete = () => {
    setIsBooting(false);
    setShowProjects(true);
  };
  
  const handleMusicToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    toggleMusic();
  };
  
  if (!isVisible) return null;
  
  const isDarkMode = theme === 'dark';
  
  return (
    <FullscreenContainer $isDarkMode={isDarkMode}>
      <AppleBootAnimation 
        isBooting={isBooting}
        onBootComplete={handleBootComplete}
      />
      <AppleProjectDisplay 
        isVisible={showProjects}
        projects={projects}
        className="fullscreen-display"
      />
      <BackButton onClick={onClose}>
        ←
      </BackButton>
      <MusicButton onClick={handleMusicToggle}>
        {isMusicEnabled ? '🎵' : '🎵'}
      </MusicButton>
    </FullscreenContainer>
  );
};

export default MobileScreenView; 