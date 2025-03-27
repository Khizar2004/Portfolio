import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import useSound from 'use-sound';

// Sound file paths
const clickSoundUrl = '/sounds/switch-on.mp3';
const hoverSoundUrl = '/sounds/rising-pops.mp3';
const swishSoundUrl = '/sounds/swish.wav';
const swishReverseSoundUrl = '/sounds/swish-rev.wav';
const startupSoundUrl = '/sounds/windows-xp-startup.mp3';
const shutdownSoundUrl = '/sounds/windows-xp-shutdown.mp3';

// Define what our sound context provides
interface SoundContextType {
  isSoundEnabled: boolean;
  isMusicEnabled: boolean;
  toggleSound: () => void;
  toggleMusic: () => void;
  playClickSound: () => void;
  playHoverSound: () => void;
  playSwishSound: () => void;
  playSwishReverseSound: () => void;
  playStartupSound: () => void;
  playShutdownSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Create a fallback for when context is missing
const fallbackSoundContext: SoundContextType = {
  isSoundEnabled: false,
  isMusicEnabled: false,
  toggleSound: () => console.warn('Sound context not available'),
  toggleMusic: () => console.warn('Sound context not available'),
  playClickSound: () => {},
  playHoverSound: () => {},
  playSwishSound: () => {},
  playSwishReverseSound: () => {},
  playStartupSound: () => {},
  playShutdownSound: () => {}
};

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    console.warn('useSoundContext called outside of SoundProvider. Using fallback implementation.');
    return fallbackSoundContext;
  }
  return context;
};

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider = ({ children }: SoundProviderProps) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  
  // Initialize all sound effects with useSound
  const [playClick] = useSound(clickSoundUrl, { 
    volume: 0.3, 
    soundEnabled: isSoundEnabled 
  });
  
  const [playHover] = useSound(hoverSoundUrl, { 
    volume: 0.2, 
    soundEnabled: isSoundEnabled 
  });
  
  const [playSwish] = useSound(swishSoundUrl, { 
    volume: 0.3, 
    soundEnabled: isSoundEnabled 
  });
  
  const [playSwishReverse] = useSound(swishReverseSoundUrl, { 
    volume: 0.3, 
    soundEnabled: isSoundEnabled 
  });
  
  const [playStartup] = useSound(startupSoundUrl, { 
    volume: 0.5, 
    soundEnabled: isSoundEnabled 
  });
  
  const [playShutdown] = useSound(shutdownSoundUrl, { 
    volume: 0.5, 
    soundEnabled: isSoundEnabled 
  });
  
  // Create safe wrapper functions for all sounds
  const playClickSound = useCallback(() => {
    if (isSoundEnabled) {
      try {
        playClick();
      } catch (error) {
        console.error('Error playing click sound:', error);
      }
    }
  }, [isSoundEnabled, playClick]);
  
  const playHoverSound = useCallback(() => {
    if (isSoundEnabled) {
      try {
        playHover();
      } catch (error) {
        console.error('Error playing hover sound:', error);
      }
    }
  }, [isSoundEnabled, playHover]);
  
  const playSwishSound = useCallback(() => {
    if (isSoundEnabled) {
      try {
        playSwish();
      } catch (error) {
        console.error('Error playing swish sound:', error);
      }
    }
  }, [isSoundEnabled, playSwish]);
  
  const playSwishReverseSound = useCallback(() => {
    if (isSoundEnabled) {
      try {
        playSwishReverse();
      } catch (error) {
        console.error('Error playing swish reverse sound:', error);
      }
    }
  }, [isSoundEnabled, playSwishReverse]);
  
  const playStartupSound = useCallback(() => {
    if (isSoundEnabled) {
      try {
        playStartup();
      } catch (error) {
        console.error('Error playing startup sound:', error);
      }
    }
  }, [isSoundEnabled, playStartup]);
  
  const playShutdownSound = useCallback(() => {
    if (isSoundEnabled) {
      try {
        playShutdown();
      } catch (error) {
        console.error('Error playing shutdown sound:', error);
      }
    }
  }, [isSoundEnabled, playShutdown]);

  const toggleSound = () => {
    setIsSoundEnabled(prev => !prev);
  };

  const toggleMusic = () => {
    setIsMusicEnabled(prev => !prev);
  };

  const value: SoundContextType = {
    isSoundEnabled,
    isMusicEnabled,
    toggleSound,
    toggleMusic,
    playClickSound,
    playHoverSound,
    playSwishSound,
    playSwishReverseSound,
    playStartupSound,
    playShutdownSound
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}; 