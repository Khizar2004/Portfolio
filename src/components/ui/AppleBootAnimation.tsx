import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BootContainer = styled.div<{ $loading: boolean }>`
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 1s ease-in-out;
  opacity: ${props => props.$loading ? 1 : 0};
  pointer-events: ${props => props.$loading ? 'auto' : 'none'};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;

const AppleLogo = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  margin-bottom: 30px;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z'/%3E%3C/svg%3E");
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
  }
`;

const LoadingBar = styled.div<{ $progress: number }>`
  width: 200px;
  height: 5px;
  background-color: #333;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  margin-top: 20px;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.$progress}%;
    background-color: #fff;
    border-radius: 3px;
    transition: width 0.5s ease;
  }
`;

interface AppleBootAnimationProps {
  onBootComplete: () => void;
  isBooting: boolean;
}

const AppleBootAnimation: React.FC<AppleBootAnimationProps> = ({ onBootComplete, isBooting }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (isBooting) {
      // Reset progress when booting starts
      setProgress(0);
      
      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Boot animation complete, notify parent
            setTimeout(() => onBootComplete(), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [isBooting, onBootComplete]);
  
  return (
    <BootContainer $loading={isBooting}>
      <AppleLogo />
      <LoadingBar $progress={progress} />
    </BootContainer>
  );
};

export default AppleBootAnimation; 