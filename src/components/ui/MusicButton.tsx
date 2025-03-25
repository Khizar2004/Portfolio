import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSoundContext } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';

// Keyframes for animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled components
const MusicButtonContainer = styled.button<{ active: boolean; isDarkMode: boolean }>`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.isDarkMode 
    ? props.active ? '#4cc9f0' : '#2a2a2a'
    : props.active ? '#3a86ff' : '#e0e0e0'};
  color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 10px ${props => props.isDarkMode 
    ? 'rgba(0, 0, 0, 0.3)' 
    : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  /* Apply pulse animation when active */
  animation: ${props => props.active ? pulse : 'none'} 2s infinite ease-in-out;
`;

const MusicIcon = styled.div<{ active: boolean }>`
  position: relative;
  width: 20px;
  height: 20px;

  &::before, &::after {
    content: '';
    position: absolute;
  }
  
  /* Music note shape */
  &::before {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    bottom: 0;
    left: 0;
  }
  
  &::after {
    height: 14px;
    width: 2px;
    background: currentColor;
    bottom: 6px;
    left: 8px;
  }
`;

const MusicWaves = styled.div<{ active: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid currentColor;
  opacity: 0;
  animation: ${props => props.active ? rotate : 'none'} 10s linear infinite;
  pointer-events: none;
  
  ${props => props.active && `
    opacity: 0.2;
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border: 1px solid currentColor;
    border-radius: 50%;
    opacity: 0.3;
  }
`;

const MusicButton: React.FC = () => {
  const { isMusicEnabled, toggleMusic } = useSoundContext();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleClick = () => {
    toggleMusic();
  };

  return (
    <MusicButtonContainer 
      onClick={handleClick} 
      active={isMusicEnabled}
      isDarkMode={isDarkMode}
      aria-label={isMusicEnabled ? 'Disable music' : 'Enable music'}
      title={isMusicEnabled ? 'Disable music' : 'Enable music'}
    >
      <MusicIcon active={isMusicEnabled} />
      <MusicWaves active={isMusicEnabled} />
    </MusicButtonContainer>
  );
};

export default MusicButton; 