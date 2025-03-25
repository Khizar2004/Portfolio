import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const ProgressBarContainer = styled.div`
  width: 300px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background-color: ${({ theme }) => theme.primary};
  transition: width 0.3s ease-in-out;
`;

const LoadingText = styled.div`
  font-size: 14px;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

interface LoadingScreenProps {
  progress?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress = 0 }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading assets');

  useEffect(() => {
    // If no progress is provided, use a fake progress simulation
    if (progress === 0) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          // Slow down as we reach 90%
          const increment = prev < 50 ? 5 : prev < 80 ? 3 : 0.5;
          const newProgress = Math.min(prev + increment, 99);
          return newProgress;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setLoadingProgress(progress);
    }
  }, [progress]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const dots = prev.match(/\./g)?.length || 0;
        return `Loading assets${'.'.repeat((dots + 1) % 4)}`;
      });
    }, 500);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <LoadingContainer>
      <LogoContainer>
        {/* You can add your logo here */}
        <h1>My 3D Portfolio</h1>
      </LogoContainer>
      <ProgressBarContainer>
        <ProgressBar progress={loadingProgress} />
      </ProgressBarContainer>
      <LoadingText>{loadingText}</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingScreen; 