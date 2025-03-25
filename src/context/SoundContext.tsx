import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import useSound from 'use-sound';

// Note: These are placeholder imports - you'll need to add actual sound files to your assets folder
// import clickSound from '../assets/sounds/click.mp3';
// import hoverSound from '../assets/sounds/hover.mp3';
// import ambientSound from '../assets/sounds/ambient.mp3';

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
  
  // Once you have actual sound files, uncomment these
  // const [playClick] = useSound(clickSound, { volume: 0.5, soundEnabled: isSoundEnabled });
  // const [playHover] = useSound(hoverSound, { volume: 0.2, soundEnabled: isSoundEnabled });
  // const [playAmbient, { stop: stopAmbient }] = useSound(ambientSound, { 
  //   volume: 0.3, 
  //   soundEnabled: isMusicEnabled,
  //   loop: true
  // });
  
  // For now we'll use empty functions as placeholders
  const playClick = useCallback(() => {}, []);
  const playHover = useCallback(() => {}, []);

  const toggleSound = () => {
    setIsSoundEnabled(prev => !prev);
  };

  const toggleMusic = () => {
    setIsMusicEnabled(prev => !prev);
    
    // Uncomment once you have the actual sound files
    // if (!isMusicEnabled) {
    //   playAmbient();
    // } else {
    //   stopAmbient();
    // }
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