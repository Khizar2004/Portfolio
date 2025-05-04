import React from 'react';
import styled from 'styled-components';
import AppleProjectDisplay from './AppleProjectDisplay';
import { ThemeMode } from '../../context/ThemeContext';

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

interface MobileScreenViewProps {
  isVisible: boolean;
  onClose: () => void;
  theme: ThemeMode;
  projects: any[];
}

const myProjects = [
  { 
    title: "Personal Portfolio", 
    repo: "https://github.com/username/portfolio",
    description: "3D interactive portfolio website built with Three.js and React" 
  },
  { 
    title: "E-Commerce App", 
    repo: "https://github.com/username/ecommerce",
    description: "Full-stack e-commerce application with React and Node.js" 
  },
  { 
    title: "Weather Dashboard", 
    repo: "https://github.com/username/weather-app",
    description: "Weather forecast application using a weather API" 
  },
  { 
    title: "Task Tracker", 
    repo: "https://github.com/username/task-tracker",
    description: "Task management application with React" 
  },
  { 
    title: "Blog Platform", 
    repo: "https://github.com/username/blog-platform",
    description: "Content management system for blogging" 
  }
];

const MobileScreenView: React.FC<MobileScreenViewProps> = ({ isVisible, onClose, theme, projects }) => {
  if (!isVisible) return null;
  
  const isDarkMode = theme === 'dark';
  
  return (
    <FullscreenContainer $isDarkMode={isDarkMode}>
      <AppleProjectDisplay 
        isVisible={true}
        currentTheme={theme}
        projects={projects}
        className="fullscreen-display"
      />
      <BackButton onClick={onClose}>
        ←
      </BackButton>
    </FullscreenContainer>
  );
};

export default MobileScreenView; 