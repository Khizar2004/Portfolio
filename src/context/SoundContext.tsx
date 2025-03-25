import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import useSound from 'use-sound';

// Using placeholder sounds - in a real project you would replace these with actual sound files
const clickSoundUrl = '/sounds/placeholder.txt';
const hoverSoundUrl = '/sounds/placeholder.txt';
const ambientSoundUrl = '/sounds/placeholder.txt';

interface SoundContextType {
  isSoundEnabled: boolean;
  isMusicEnabled: boolean;
  toggleSound: () => void;
  toggleMusic: () => void;
  playClickSound: () => void;
  playHoverSound: () => void;
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
  
  // For development, we'll use empty functions since we don't have actual sound files yet
  // In a production environment, you would uncomment these lines and use real sound files
  /*
  const [playClick] = useSound(clickSoundUrl, { 
    volume: 0.5, 
    soundEnabled: isSoundEnabled 
  });
  
  const [playHover] = useSound(hoverSoundUrl, { 
    volume: 0.2, 
    soundEnabled: isSoundEnabled 
  });
  
  const [playAmbient, { stop: stopAmbient }] = useSound(ambientSoundUrl, { 
    volume: 0.3, 
    soundEnabled: isMusicEnabled,
    loop: true
  });
  */
  
  // For now we'll use empty functions as placeholders that just log to console
  const playClick = useCallback(() => {
    if (isSoundEnabled) {
      console.log('Click sound played');
    }
  }, [isSoundEnabled]);
  
  const playHover = useCallback(() => {
    if (isSoundEnabled) {
      console.log('Hover sound played');
    }
  }, [isSoundEnabled]);
  
  // Handle background music toggle
  useEffect(() => {
    if (isMusicEnabled) {
      console.log('Background music started');
      // In production: playAmbient()
      return () => {
        console.log('Background music stopped');
        // In production: stopAmbient()
      };
    }
  }, [isMusicEnabled]);

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
    playClickSound: playClick,
    playHoverSound: playHover
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}; 