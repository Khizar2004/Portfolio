import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect, useRef } from 'react';
import useSound from 'use-sound';

// Sound file paths
const clickSoundUrl = '/sounds/clicksound.mp3';
const hoverSoundUrl = '/sounds/hoversound.mp3';
const startupSoundUrl = '/sounds/monitor_startup.mp3';
const shutdownSoundUrl = '/sounds/monitor_shutdown.mp3';
const backgroundMusicUrl = '/sounds/background.mp3';

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
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element for background music
  useEffect(() => {
    backgroundMusicRef.current = new Audio(backgroundMusicUrl);
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.3;
    
    // Try to play music immediately (may fail due to browser autoplay restrictions)
    if (isMusicEnabled) {
      const playPromise = backgroundMusicRef.current.play();
      
      // Handle autoplay restrictions
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Autoplay prevented due to browser restrictions. User interaction required:", error);
          // Don't disable music so it can play when user interacts
        });
      }
    }
    
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);
  
  // Control background music playback based on isMusicEnabled state
  useEffect(() => {
    if (backgroundMusicRef.current) {
      if (isMusicEnabled) {
        backgroundMusicRef.current.play().catch(e => 
          console.error("Error playing background music:", e)
        );
      } else {
        backgroundMusicRef.current.pause();
      }
    }
  }, [isMusicEnabled]);
  
  // Initialize all sound effects with useSound
  const [playClick] = useSound(clickSoundUrl, { 
    volume: 0.3, 
    soundEnabled: isSoundEnabled 
  });
  
  const [playHover] = useSound(hoverSoundUrl, { 
    volume: 0.2, 
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
  
  // Empty functions for swish sounds since files are removed
  const playSwishSound = useCallback(() => {
    // Sound removed, this is a no-op function
  }, []);
  
  const playSwishReverseSound = useCallback(() => {
    // Sound removed, this is a no-op function
  }, []);
  
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