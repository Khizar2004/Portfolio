import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useSoundContext } from '../../context/SoundContext';

const ControlPanelContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 9999;
  pointer-events: all;
`;

const ControlButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  border: 2px solid ${({ theme }) => theme.primary};
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  cursor: pointer;
  font-size: 1.2rem;
  
  &:hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const InfoPanel = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  background-color: ${({ theme }) => theme.surface};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: ${({ theme }) => theme.text};
  max-width: 350px;
  transform: ${({ isVisible }) => isVisible ? 'translateY(0)' : 'translateY(20px)'};
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  z-index: 1000;
`;

const InfoTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
`;

const InfoDescription = styled.p`
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const DeviceIndicator = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0.7;
  z-index: 100;
`;

const BackButton = styled(ControlButton)`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  position: relative;
  z-index: 9999;
`;

interface ObjectInfo {
  [key: string]: {
    title: string;
    description: string;
  };
}

const objectInfoData: ObjectInfo = {
  computer: {
    title: 'My Projects',
    description: 'Click to view my development projects and coding work. I specialize in web applications and interactive experiences.',
  },
  book: {
    title: 'About Me',
    description: 'Learn more about my journey, skills, and background. I love tackling complex problems and creating innovative solutions.',
  },
  phone: {
    title: 'Contact',
    description: 'Want to get in touch? Here\'s how you can reach me for collaborations, job opportunities, or just to say hello!',
  },
  coffee: {
    title: 'Coffee Break',
    description: 'Even developers need a break sometimes! This represents my love for coffee and taking moments to recharge.',
  },
  plant: {
    title: 'Growth Mindset',
    description: 'This plant represents my commitment to continuous learning and growth as a developer and designer.',
  },
  // Add more objects as needed
};

interface ControlPanelProps {
  activeObject: string | null;
  resetCamera: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ activeObject, resetCamera }) => {
  const { theme, toggleTheme } = useTheme();
  const { isSoundEnabled, isMusicEnabled, toggleSound, toggleMusic, playClickSound } = useSoundContext();
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDeviceType('mobile');
      } else if (window.innerWidth < 1024) {
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
  
  // Add direct handler for back button 
  useEffect(() => {
    // Create a direct DOM event handler to ensure the back button always works
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeObject) {
        resetCamera();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeObject, resetCamera]);

  const handleButtonClick = (action: () => void) => {
    playClickSound();
    // Call action directly - don't use setTimeout
    action();
  };

  return (
    <>
      <DeviceIndicator>
        {deviceType.toUpperCase()} MODE
      </DeviceIndicator>

      <InfoPanel isVisible={!!activeObject}>
        {activeObject && objectInfoData[activeObject] ? (
          <>
            <InfoTitle>{objectInfoData[activeObject].title}</InfoTitle>
            <InfoDescription>{objectInfoData[activeObject].description}</InfoDescription>
            <InfoDescription>Press ESC key to return to overview.</InfoDescription>
          </>
        ) : (
          <InfoDescription>
            Click on objects in the room to interact with them and learn more about my work.
          </InfoDescription>
        )}
      </InfoPanel>

      <ControlPanelContainer>
        {activeObject && (
          <BackButton 
            onClick={() => resetCamera()}
            aria-label="Back to overview"
            style={{ cursor: 'pointer !important' }}
          >
            ←
          </BackButton>
        )}
        
        <ControlButton 
          onClick={() => handleButtonClick(toggleTheme)}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </ControlButton>
        
        <ControlButton 
          onClick={() => handleButtonClick(toggleSound)}
          aria-label={`Turn ${isSoundEnabled ? 'off' : 'on'} sound effects`}
        >
          {isSoundEnabled ? '🔊' : '🔇'}
        </ControlButton>
        
        <ControlButton 
          onClick={() => handleButtonClick(toggleMusic)}
          aria-label={`Turn ${isMusicEnabled ? 'off' : 'on'} background music`}
        >
          {isMusicEnabled ? '🎵' : '🎵'}
        </ControlButton>
      </ControlPanelContainer>
    </>
  );
};

export default ControlPanel; 