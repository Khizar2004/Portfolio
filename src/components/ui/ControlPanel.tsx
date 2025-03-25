import React from 'react';
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
  z-index: 100;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  cursor: pointer;
  
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
  z-index: 100;
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
  // Add more objects as needed
};

interface ControlPanelProps {
  activeObject: string | null;
  resetCamera: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ activeObject, resetCamera }) => {
  const { theme, toggleTheme } = useTheme();
  const { isSoundEnabled, isMusicEnabled, toggleSound, toggleMusic, playClickSound } = useSoundContext();

  const handleButtonClick = (action: () => void) => {
    playClickSound();
    action();
  };

  return (
    <>
      <InfoPanel isVisible={!!activeObject}>
        {activeObject && objectInfoData[activeObject] ? (
          <>
            <InfoTitle>{objectInfoData[activeObject].title}</InfoTitle>
            <InfoDescription>{objectInfoData[activeObject].description}</InfoDescription>
          </>
        ) : (
          <InfoDescription>
            Click on objects in the room to interact with them and learn more about my work.
          </InfoDescription>
        )}
      </InfoPanel>

      <ControlPanelContainer>
        {activeObject && (
          <ControlButton 
            onClick={() => handleButtonClick(resetCamera)}
            aria-label="Back to overview"
          >
            ←
          </ControlButton>
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