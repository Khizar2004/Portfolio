import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSoundContext } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';

// Styled components
const PlayerContainer = styled.div<{ $isDarkMode: boolean; $isVisible: boolean }>`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 250px;
  background-color: ${props => props.$isDarkMode ? 'rgba(25, 25, 25, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transition: all 0.3s ease;
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(calc(100% - 40px))'};

  &:hover {
    transform: translateY(0);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  user-select: none;
`;

const Title = styled.div<{ $isDarkMode: boolean }>`
  color: ${props => props.$isDarkMode ? '#ffffff' : '#333333'};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MusicIcon = styled.div`
  font-size: 1.2rem;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ControlButton = styled.button<{ $isDarkMode: boolean }>`
  background-color: ${props => props.$isDarkMode ? 'rgba(60, 60, 60, 0.7)' : 'rgba(240, 240, 240, 0.7)'};
  color: ${props => props.$isDarkMode ? '#ffffff' : '#333333'};
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$isDarkMode ? 'rgba(80, 80, 80, 0.9)' : 'rgba(220, 220, 220, 0.9)'};
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: scale(1);
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(100, 100, 100, 0.2);
  border-radius: 2px;
  margin: 10px 0;
  position: relative;
  cursor: pointer;
`;

const Progress = styled.div<{ $progress: number; $isDarkMode: boolean }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background: ${props => props.$isDarkMode 
    ? 'linear-gradient(90deg, #4cc9f0, #4361ee)' 
    : 'linear-gradient(90deg, #3a86ff, #4cc9f0)'};
  border-radius: 2px;
  transition: width 0.1s linear;
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VolumeIcon = styled.div<{ $muted: boolean }>`
  opacity: ${props => props.$muted ? 0.5 : 1};
  cursor: pointer;
  color: inherit;
`;

const VolumeSlider = styled.input`
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  background: rgba(100, 100, 100, 0.2);
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3a86ff;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3a86ff;
    cursor: pointer;
    border: none;
  }
`;

const TimeInfo = styled.div<{ $isDarkMode: boolean }>`
  font-size: 0.75rem;
  color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`;

// Format time in MM:SS format
const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

const MusicPlayer: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { playClickSound } = useSoundContext();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio('/sounds/background-music.mp3');
    audioRef.current.volume = volume;
    audioRef.current.loop = true;
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    
    const handleDurationChange = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    // Add event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    
    // Cleanup
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('durationchange', handleDurationChange);
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, []);
  
  // Handle play/pause
  const togglePlay = () => {
    playClickSound();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : newVolume;
    }
  };
  
  // Handle mute toggle
  const toggleMute = () => {
    playClickSound();
    if (audioRef.current) {
      audioRef.current.volume = muted ? volume : 0;
      setMuted(!muted);
    }
  };
  
  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const bounds = progressBar.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const width = bounds.width;
      const percent = x / width;
      const newTime = percent * duration;
      
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(percent * 100);
    }
  };
  
  // Handle toggle expanded view
  const toggleExpanded = () => {
    playClickSound();
    setExpanded(!expanded);
  };

  return (
    <PlayerContainer $isDarkMode={isDarkMode} $isVisible={expanded}>
      <Header onClick={toggleExpanded}>
        <Title $isDarkMode={isDarkMode}>
          <MusicIcon>🎵</MusicIcon>
          Music Player
        </Title>
        <span>{expanded ? '▼' : '▲'}</span>
      </Header>
      
      <ProgressContainer onClick={handleProgressClick}>
        <Progress $progress={progress} $isDarkMode={isDarkMode} />
      </ProgressContainer>
      
      <TimeInfo $isDarkMode={isDarkMode}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </TimeInfo>
      
      <ControlsRow>
        <ButtonGroup>
          <ControlButton 
            $isDarkMode={isDarkMode} 
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶️'}
          </ControlButton>
        </ButtonGroup>
        
        <VolumeContainer>
          <VolumeIcon 
            $muted={muted} 
            onClick={toggleMute}
          >
            {muted ? '🔇' : volume > 0.5 ? '🔊' : volume > 0 ? '🔉' : '🔈'}
          </VolumeIcon>
          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
          />
        </VolumeContainer>
      </ControlsRow>
    </PlayerContainer>
  );
};

export default MusicPlayer; 