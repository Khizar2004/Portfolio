import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useSoundContext } from '../../context/SoundContext';
import { MobileScreenContext } from '../../scenes/MainScene';

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

const InfoPanel = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.backgroundSecondary};
  background-color: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.borderColor};
  border-radius: 10px;
  padding: 15px 25px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: ${({ $isVisible }) => $isVisible ? 'translateY(0)' : 'translateY(20px)'};
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  visibility: ${({ $isVisible }) => $isVisible ? 'visible' : 'hidden'};
  max-width: 400px;
  width: 100%;
  
  @media (max-width: 768px) {
    width: 70%;
    padding: 12px 16px;
    font-size: 14px;
    bottom: 80px;
    max-height: 30vh;
    overflow-y: auto;
    left: 40%;
    transform: translateX(-40%);
  }
`;

const InfoTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.text};
`;

const InfoDescription = styled.p`
  margin: 0 0 1rem 0;
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
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

const PhoneSocialTooltip = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  z-index: 10000;
  max-width: 320px;
  width: 90%;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  visibility: ${({ $isVisible }) => $isVisible ? 'visible' : 'hidden'};
`;

const SocialTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  text-align: center;
`;

const SocialDescription = styled.p`
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
`;

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const CloseButton = styled.button`
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.borderColor};
  }
`;

// SVG Icons
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
  </svg>
);

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
  resume: {
    title: 'My Resume',
    description: 'View my professional experience, education, and skills. You can also download a PDF copy for your reference.',
  },
};

interface ControlPanelProps {
  activeObject: string | null;
  resetCamera: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ activeObject, resetCamera }) => {
  const { theme, toggleTheme } = useTheme();
  const { playClickSound, isSoundEnabled, toggleSound, isMusicEnabled, toggleMusic } = useSoundContext();
  const [deviceType, setDeviceType] = useState('desktop');
  const { showMobileScreen } = useContext(MobileScreenContext);
  const [showPhoneSocialTooltip, setShowPhoneSocialTooltip] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDeviceType('mobile');
      } else if (window.innerWidth <= 1024) {
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
  
  // Show phone social tooltip when phone is active on mobile
  useEffect(() => {
    if (activeObject === 'phone' && deviceType === 'mobile') {
      setShowPhoneSocialTooltip(true);
    } else {
      setShowPhoneSocialTooltip(false);
    }
  }, [activeObject, deviceType]);
  
  // Use ref callback for stable escape key handler
  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && activeObject) {
      resetCamera();
    }
  }, [activeObject, resetCamera]);
  
  // Add direct handler for back button with proper cleanup
  useEffect(() => {
    // Add event listener with the callback reference
    window.addEventListener('keydown', handleEscapeKey);
    
    // Clean up properly
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleEscapeKey]); // Only re-run if handleEscapeKey changes

  const handleButtonClick = (action: () => void) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent event bubbling to fix the music toggle issue
      playClickSound();
      action();
    };
  };

  const handleSocialLinkClick = (e: React.MouseEvent) => {
    // Prevent bubbling to avoid triggering other events
    e.stopPropagation();
    playClickSound();
  };

  const handleClosePhoneSocialTooltip = () => {
    playClickSound();
    setShowPhoneSocialTooltip(false);
    resetCamera();
  };

  const isMobile = deviceType === 'mobile';

  return (
    <>
      <DeviceIndicator>
        {deviceType.toUpperCase()} MODE
      </DeviceIndicator>

      <InfoPanel $isVisible={!!activeObject && !showMobileScreen && !showPhoneSocialTooltip}>
        {activeObject && objectInfoData[activeObject] ? (
          <>
            <InfoTitle>{objectInfoData[activeObject].title}</InfoTitle>
            <InfoDescription>{objectInfoData[activeObject].description}</InfoDescription>
            {!isMobile && (
              <InfoDescription>Press ESC key to return to overview.</InfoDescription>
            )}
          </>
        ) : (
          <InfoDescription>
            Click on objects in the room to interact with them and learn more about my work.
          </InfoDescription>
        )}
      </InfoPanel>

      {/* Phone Social Links Tooltip for Mobile */}
      {isMobile && (
        <PhoneSocialTooltip $isVisible={showPhoneSocialTooltip}>
          <SocialTitle>My Socials</SocialTitle>
          <SocialDescription>
            Connect with me through any of these platforms:
          </SocialDescription>
          <SocialLinksContainer>
            <SocialLink 
              href="https://github.com/Khizar2004" 
              target="_blank" 
              aria-label="GitHub"
              onClick={handleSocialLinkClick}
            >
              <GitHubIcon />
            </SocialLink>
            <SocialLink 
              href="https://www.linkedin.com/in/khizar-aamir-680484292/" 
              target="_blank" 
              aria-label="LinkedIn"
              onClick={handleSocialLinkClick}
            >
              <LinkedInIcon />
            </SocialLink>
            <SocialLink 
              href="mailto:khizaraamir2004@gmail.com" 
              aria-label="Email"
              onClick={handleSocialLinkClick}
            >
              <EmailIcon />
            </SocialLink>
          </SocialLinksContainer>
        </PhoneSocialTooltip>
      )}

      {!showMobileScreen && (
        <ControlPanelContainer>
          {isMobile && activeObject && (
            <ControlButton 
              onClick={handleButtonClick(resetCamera)}
              aria-label="Back to overview"
            >
              ↩️
            </ControlButton>
          )}
          
          <ControlButton 
            onClick={handleButtonClick(toggleTheme)}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </ControlButton>
          
          <ControlButton 
            onClick={handleButtonClick(toggleSound)}
            aria-label={`Turn ${isSoundEnabled ? 'off' : 'on'} sound effects`}
          >
            {isSoundEnabled ? '🔊' : '🔇'}
          </ControlButton>
          
          <ControlButton 
            onClick={handleButtonClick(toggleMusic)}
            aria-label={`Turn ${isMusicEnabled ? 'off' : 'on'} background music`}
          >
            {isMusicEnabled ? '🎵' : '🎵'}
          </ControlButton>
        </ControlPanelContainer>
      )}
    </>
  );
};

export default ControlPanel; 