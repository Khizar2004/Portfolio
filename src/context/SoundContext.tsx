import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
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

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
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
        console.log('Click sound played');
      } catch (error) {
        console.error('Error playing click sound:', error);
      }
    }
  }, [isSoundEnabled, playClick]);
  
  const playHoverSound = useCallback(() => {
    if (isSoundEnabled) {
      try {
        playHover();
        console.log('Hover sound played');
      } catch (error) {
        console.error('Error playing hover sound:', error);
      }
    }
  }, [isSoundEnabled, playHover]);
  
  const playSwishSound = useCallback(() => {
    if (isSoundEnabled) {
      try {
        playSwish();
        console.log('Swish sound played');
      } catch (error) {
        console.error('Error playing swish sound:', error);
      }
    }
  }, [isSoundEnabled, playSwish]);
  
  const playSwishReverseSound = useCallback(() => {
    if (isSoundEnabled) {
      try {
        playSwishReverse();
        console.log('Swish reverse sound played');
      } catch (error) {
        console.error('Error playing swish reverse sound:', error);
      }
    }
  }, [isSoundEnabled, playSwishReverse]);
  
  const playStartupSound = useCallback(() => {
    if (isSoundEnabled) {
      try {
        playStartup();
        console.log('Startup sound played');
      } catch (error) {
        console.error('Error playing startup sound:', error);
      }
    }
  }, [isSoundEnabled, playStartup]);
  
  const playShutdownSound = useCallback(() => {
    if (isSoundEnabled) {
      try {
        playShutdown();
        console.log('Shutdown sound played');
      } catch (error) {
        console.error('Error playing shutdown sound:', error);
      }
    }
  }, [isSoundEnabled, playShutdown]);

  const toggleSound = () => {
    setIsSoundEnabled(prev => !prev);
    console.log(`Sound effects ${!isSoundEnabled ? 'enabled' : 'disabled'}`);
  };

  const toggleMusic = () => {
    setIsMusicEnabled(prev => !prev);
    console.log(`Background music ${!isMusicEnabled ? 'enabled' : 'disabled'}`);
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