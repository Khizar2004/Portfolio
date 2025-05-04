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
  const [hasInteracted, setHasInteracted] = useState(false);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const userDisabledMusicRef = useRef<boolean>(false);
  
  // Initialize audio element for background music
  useEffect(() => {
    backgroundMusicRef.current = new Audio(backgroundMusicUrl);
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.3;
    
    // Check if user has already interacted
    const hasUserInteracted = localStorage.getItem('hasInteracted') === 'true';
    if (hasUserInteracted) {
      setHasInteracted(true);
    }
    
    // Check saved music preference
    const savedMusicEnabled = localStorage.getItem('isMusicEnabled');
    if (savedMusicEnabled !== null) {
      setIsMusicEnabled(savedMusicEnabled === 'true');
      // If user explicitly disabled music, track it
      if (savedMusicEnabled === 'false') {
        userDisabledMusicRef.current = true;
      }
    }
    
    // Set up interaction listener for the entire document
    const startMusicOnInteraction = () => {
      setHasInteracted(true);
      localStorage.setItem('hasInteracted', 'true');
      
      // Only remove listeners if we're handling first interaction
      if (!hasUserInteracted) {
        document.removeEventListener('click', startMusicOnInteraction);
        document.removeEventListener('keydown', startMusicOnInteraction);
        document.removeEventListener('touchstart', startMusicOnInteraction);
      }
    };
    
    // Only add listeners if user hasn't interacted yet
    if (!hasUserInteracted) {
      document.addEventListener('click', startMusicOnInteraction);
      document.addEventListener('keydown', startMusicOnInteraction);
      document.addEventListener('touchstart', startMusicOnInteraction);
    }
    
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
      document.removeEventListener('click', startMusicOnInteraction);
      document.removeEventListener('keydown', startMusicOnInteraction);
      document.removeEventListener('touchstart', startMusicOnInteraction);
    };
  }, []);
  
  // Play music when user has interacted and music is enabled
  useEffect(() => {
    // Save the music preference when it changes
    if (hasInteracted) {
      localStorage.setItem('isMusicEnabled', isMusicEnabled.toString());
    }
    
    if (hasInteracted && backgroundMusicRef.current) {
      if (isMusicEnabled && !userDisabledMusicRef.current) {
        const playPromise = backgroundMusicRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error playing background music:", error);
          });
        }
      } else {
        backgroundMusicRef.current.pause();
      }
    }
  }, [isMusicEnabled, hasInteracted]);
  
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

  const toggleMusic = useCallback(() => {
    setIsMusicEnabled(prev => {
      const newValue = !prev;
      // Update user preference reference when manually toggling
      userDisabledMusicRef.current = !newValue;
      return newValue;
    });
  }, []);

  const value: SoundContextType = {
    isSoundEnabled,
    isMusicEnabled,
    toggleSound,
    toggleMusic,
    playClickSound,
    playHoverSound,
    playStartupSound,
    playShutdownSound
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}; 