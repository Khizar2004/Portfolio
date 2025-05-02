import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const TooltipContainer = styled.div<{ $isDarkMode: boolean; $active: boolean; $isMobile: boolean }>`
  position: fixed;
  top: ${props => props.$isMobile ? '50%' : '50%'};
  bottom: ${props => props.$isMobile ? 'auto' : 'auto'};
  left: 50%;
  transform: translate(-50%, ${props => props.$isMobile ? '-50%' : '-50%'});
  background-color: ${props => props.$isDarkMode 
    ? 'rgba(25, 25, 25, 0.85)' 
    : 'rgba(255, 255, 255, 0.85)'};
  color: ${props => props.$isDarkMode ? '#ffffff' : '#333333'};
  padding: 15px 25px;
  border-radius: 10px;
  box-shadow: 0 5px 15px ${props => props.$isDarkMode 
    ? 'rgba(0, 0, 0, 0.5)' 
    : 'rgba(0, 0, 0, 0.2)'};
  max-width: ${props => props.$isMobile ? '75%' : '300px'};
  text-align: center;
  z-index: 10000;
  animation: ${fadeIn} 0.5s ease-out;
  opacity: ${props => props.$active ? 1 : 0};
  pointer-events: ${props => props.$active ? 'auto' : 'none'};
  transition: opacity 0.3s ease;
  
  /* Additional mobile adjustments */
  @media (max-width: 768px) {
    top: 50%;
    bottom: auto;
    margin-bottom: 50px; /* Add space at the bottom */
    max-height: 80vh; /* Limit height on mobile */
    overflow-y: auto; /* Allow scrolling if needed */
  }
`;

const TooltipText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
`;

const ActionButton = styled.button<{ $isDarkMode: boolean }>`
  background-color: ${props => props.$isDarkMode ? '#4cc9f0' : '#3a86ff'};
  color: #ffffff;
  border: none;
  padding: 8px 15px;
  margin-top: 12px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  animation: ${pulse} 2s infinite ease-in-out;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  }
`;

const BackButton = styled.button<{ $isDarkMode: boolean }>`
  background-color: ${props => props.$isDarkMode ? '#333333' : '#dddddd'};
  color: ${props => props.$isDarkMode ? '#ffffff' : '#333333'};
  border: none;
  padding: 8px 15px;
  margin-top: 12px;
  margin-left: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;
`;

interface TooltipProps {
  text: string;
  buttonText?: string;
  onButtonClick?: () => void;
  active: boolean;
  onClose?: () => void;
  autoCloseDelay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  buttonText,
  onButtonClick,
  active,
  onClose,
  autoCloseDelay = 0
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect if on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (active && autoCloseDelay > 0 && onClose) {
      const timeout = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      
      return () => clearTimeout(timeout);
    }
  }, [active, autoCloseDelay, onClose]);
  
  return (
    <TooltipContainer $isDarkMode={isDarkMode} $active={active} $isMobile={isMobile}>
      <TooltipText>{text}</TooltipText>
      {isMobile ? (
        <ButtonContainer>
          {buttonText && onButtonClick && (
            <ActionButton 
              $isDarkMode={isDarkMode} 
              onClick={onButtonClick}
            >
              {buttonText}
            </ActionButton>
          )}
          {onClose && (
            <BackButton
              $isDarkMode={isDarkMode}
              onClick={onClose}
            >
              Back
            </BackButton>
          )}
        </ButtonContainer>
      ) : (
        <>
          {buttonText && onButtonClick && (
            <ActionButton 
              $isDarkMode={isDarkMode} 
              onClick={onButtonClick}
            >
              {buttonText}
            </ActionButton>
          )}
        </>
      )}
    </TooltipContainer>
  );
};

export default Tooltip; 