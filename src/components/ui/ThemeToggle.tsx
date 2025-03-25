import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useSoundContext } from '../../context/SoundContext';

const ToggleContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
`;

const ToggleButton = styled.button<{ $isDarkMode: boolean }>`
  background-color: ${props => props.$isDarkMode ? '#2a2a2a' : '#ffffff'};
  color: ${props => props.$isDarkMode ? '#ffffff' : '#000000'};
  border: 2px solid ${props => props.$isDarkMode ? '#444444' : '#dddddd'};
  border-radius: 30px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 90px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const IconContainer = styled.div<{ $active: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$active ? 1 : 0.3};
  transition: opacity 0.3s ease;
`;

const Slider = styled.div<{ $isDarkMode: boolean }>`
  position: absolute;
  top: 5px;
  left: ${props => props.$isDarkMode ? '52px' : '10px'};
  width: 28px;
  height: 28px;
  background-color: ${props => props.$isDarkMode ? '#4cc9f0' : '#ffb703'};
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  z-index: -1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

// SVG icons for sun and moon
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 12L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M19.7782 4.22183L18.364 5.63604" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5.63608 18.364L4.22187 19.7782" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M19.7782 19.7782L18.364 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5.63608 5.63603L4.22187 4.22183" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { playClickSound } = useSoundContext();
  const isDarkMode = theme === 'dark';

  const handleToggle = () => {
    playClickSound();
    toggleTheme();
  };

  return (
    <ToggleContainer>
      <ToggleButton onClick={handleToggle} $isDarkMode={isDarkMode}>
        <IconContainer $active={!isDarkMode}>
          <SunIcon />
        </IconContainer>
        <IconContainer $active={isDarkMode}>
          <MoonIcon />
        </IconContainer>
        <Slider $isDarkMode={isDarkMode} />
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle; 