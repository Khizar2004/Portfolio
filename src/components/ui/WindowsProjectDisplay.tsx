import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useSoundContext } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';

// Define ThemeMode type locally
type ThemeMode = 'light' | 'dark';

// Windows XP styled components
const WindowsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #3b6ea5;
  background-image: linear-gradient(to bottom, #7ba2e7, #6291db, #3b6ea5);
  color: #000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Tahoma', sans-serif;
`;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transition: opacity 0.5s ease;
`;

const Logo = styled.div`
  width: 150px;
  height: 150px;
  background-image: url('https://raw.githubusercontent.com/tdcosta100/WindowsXP/master/images/System/WindowsLogo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 20px;
`;

const LoadingBox = styled.div`
  display: flex;
  gap: 10px;
`;

const LoadingBlock = styled.div`
  width: 12px;
  height: 12px;
  background-color: #6291db;
  animation: slide 1.5s infinite ease-in-out;
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes slide {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }
`;

const DesktopArea = styled.div`
  flex: 1;
  position: relative;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 20px;
`;

const ProjectFolder = styled.div`
  width: 80px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(49, 106, 197, 0.2);
  }
  
  &:active {
    background-color: rgba(49, 106, 197, 0.5);
  }
`;

const FolderIcon = styled.div`
  width: 48px;
  height: 48px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACKFBMVEUAAAD/3wD/vwD/xgD/zwD/zAD/ygD/0QD/xwD/ywD/yQD/xQD/zQD/ygD/zAD/zQD/ywD/ygD/zAD/ywD/ygD/ywD/zAD/ywD/ywD/ywD/ywD/ywD/ywD/ygD/ywD/ywD/ywD/zAD/ywD/ywD/ywD/ywD/ygD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ygD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/zAD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/zAD/ywD/zAD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywD/ywAAAABHcEwtAIA+AAAAhXRSTlMAAQIEBQYHCAkKCwwNDhQVFhcYGR4fICEiIyQoKSorLC0uLzAyNTY3ODk8QkZHSElKS0xQUVJTVFVXWFldXmJjY2RlZmdobW9wc3R1d3h6e3x9fn+AgYKIiYqNjpCRkpOVlpeYmZydnp+goaKjpaanqKqrra6vsLGys7S1t7i5ury9vr/Aw6CsJvgAAAJvSURBVEjHlZWJVxJRFMZfFiIgS5aIkVqWpWVZmS2WlVbaBpW2b1S2b1Zpexbavn3/bm8YZhgGhtL3H+Z+99zfO3fOvTNAQCIECB/kIJmPSwYkxJfGIdkFYzNAtooN9mYrE5e5+GNzl0VwF0j2ZWI2cXyBgGPxOCRfC3DfLsZWOcDq2PALQrIVeX2Jy/t6kZoIMxO47KtMTQXEssBvK6ieBGsZa1XJA0sQsJVRDW9MTVV36I/bSa5ioNIm+HH1pJf+GK7mUldhQMzN39OzukCjZz9L7Q30bnLtW0d0N0X0O9x0uj+D3nbG5oNxvbfUOJ2m9x4JcKwZqOcXnbf6a4xUNy1b5dI3AvVJtOOgrz0PNJOQrItm8DPH7lXNyUVZ16f37fTbPO9XFR+Nq3mNPXeRy6aVu46WD+lH4WpEfWBnNVddCOx2eNzS/q8UZQ4m1H/HtexhJNa6OJk3R00KdJn8tnkIAa/Z/n0j3z0Q19YFQpFk1YA94FqjPDvyxLYlItg2KfBJ2Oc42fYnw4IFBHqHw3TvuH1HQKCNBNxlntjGlQJJlYTTxUiIBCQs1W0wNkNAAUKpMDZFQD5CGRj6CAnI4ygVgVQBuTBQiIBiBJQYKCYgB4ZShfxiT+y1oIj2gXRTyGnV3m0FLaXA3iLUZkRt+tLtqN/EZsKk9qnPzKX2f2lXmlUZqZZeqOVVcYHSBp3h1XR+b1KYKu+mtIs1uUKorsvQ9TKKXrSFQ0KBfMWUOtLBaFUeGpZuJYeFtKnNwNQW9N0hnSvf65FHPjcB97qJD/1Fl0UWkR9u8QVh0gAAAABJRU5ErkJggg==');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const FolderName = styled.div`
  width: 100%;
  text-align: center;
  font-size: 11px;
  margin-top: 4px;
  color: white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TaskBar = styled.div`
  height: 30px;
  background: linear-gradient(to bottom, #245edb 0%, #3573e0 6%, #3574e1 8%, #3776e1 10%, #3776e1 12%, #3877e2 14%, #3979e3 16%, #397ae3 18%, #3a7be3 20%, #3b7ce4 24%, #3b7de4 28%, #3c7fe5 32%, #3c7fe5 36%, #3d80e5 40%, #3d81e6 44%, #3d81e6 48%, #3e81e6 52%, #3d81e6 56%, #3d80e5 60%, #3c7fe5 64%, #3c7fe5 68%, #3b7de4 72%, #3b7ce4 76%, #3a7be3 80%, #397ae3 82%, #3979e3 84%, #3877e2 86%, #3776e1 88%, #3776e1 90%, #3574e1 92%, #3573e0 94%, #245edb 100%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StartButton = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 4px;
  background: linear-gradient(to bottom, #379944 0%, #3ea64c 6%, #3fa74d 8%, #40a94e 10%, #41ab4f 14%, #43ad51 18%, #44af52 24%, #45b053 32%, #46b153 40%, #47b354 52%, #46b253 60%, #45b053 68%, #44af52 76%, #43ad51 82%, #41ab4f 86%, #40a94e 90%, #3fa74d 92%, #3ea64c 94%, #379944 100%);
  cursor: pointer;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: -3px;
    height: 100%;
    width: 3px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.2), transparent);
  }
  
  &:hover {
    background: linear-gradient(to bottom, #41ac4e 0%, #49b658 6%, #4ab85a 8%, #4cb95b 10%, #4dbb5c 14%, #4fbd5e 18%, #50bf5f 24%, #51c060 32%, #52c161 40%, #53c262 52%, #52c161 60%, #51c060 68%, #50bf5f 76%, #4fbd5e 82%, #4dbb5c 86%, #4cb95b 90%, #4ab85a 92%, #49b658 94%, #41ac4e 100%);
  }
  
  &:active {
    background: linear-gradient(to bottom, #358d40 0%, #3c9b46 6%, #3d9c47 8%, #3e9e48 10%, #3fa049 14%, #41a24b 18%, #42a44c 24%, #43a54d 32%, #44a64e 40%, #45a74f 52%, #44a64e 60%, #43a54d 68%, #42a44c 76%, #41a24b 82%, #3fa049 86%, #3e9e48 90%, #3d9c47 92%, #3c9b46 94%, #358d40 100%);
  }
`;

const StartIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAw1BMVEUAAAD///8AemQAiHEAh3AAh3AAhnAAh3AAh3AAh3AAh3AAh3AAiHEAiHEAh3AAh3AAh3AAh3AAh3AAiHEAiHEAh3AAhnAAhnAAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAiHAAh3AAh3AAh3AAh3AAh3AAiHEAiHEAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAh3AAiHEVvU6JAAAAO3RSTlMAAQMEBQYHCAoLDA0ODxASExQVFhgZGhscHR4gIiMkJigsLjEzNDU3OERFSUpLXF9gY2ZucH+AkpfAx+AAMAAAAVNJREFUOE/djcdyglAARa8YQXoLIL333nvU/P9vRaMjKDpw4Vnu7pn3ZgDg36jS5ZHKdUeTrQ9FrLUBbbwK9WQqm+ZJwlkX0WjLcz2HsSEBTd9enfieOxLRzCNq85IHcxHoToTmPFKdC0BvKWEVwpg/EvlN1a4jNQkInA3lWbCWhieQ7GbdH94IXHqtDm9H3ea7BZf9WWcFKDgbOVDjGVhuzvZ2hnOK5q1nweuA51mRgxk2rFHlOVi4AQK94a2cOYrwBQi2h6NQ1cAlYGDXKYsxgDsgsJOVZbiPk98CiZUkSTEA94BjsxCuAYUVfwcUluIzAPcvLkG4eXHwweHlAkPmj2tVOCY5WNxNlWAVfUimrbtDZSJWPdRI7fNBk7ZhxrL3+fBTcmB5XQtGzCrXlOxoQ/L7j/gB+AK2qA6Fd8Qy+QAAAABJRU5ErkJggg==');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 4px;
`;

const TaskBand = styled.div`
  flex: 1;
`;

const TaskClock = styled.div`
  min-width: 75px;
  height: 22px;
  background: linear-gradient(to bottom, #2667e0 0%, #3d7fe6 40%, #3d7fe6 60%, #2667e0 100%);
  border-left: 1px solid #125ce4;
  border-right: 1px solid #4c92fe;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  padding: 0 8px;
  margin-right: 10px;
`;

const ProjectModal = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 70%;
  background-color: #ece9d8;
  border: 1px solid #0055e5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: ${props => props.$visible ? 'flex' : 'none'};
  flex-direction: column;
  z-index: 10;
`;

const ModalTitleBar = styled.div`
  height: 28px;
  background: linear-gradient(to right, #0058ee 0%, #3f8cf8 10%, #0058ee 20%, #3f8cf8 30%, #0058ee 40%, #3f8cf8 50%, #0058ee 60%, #3f8cf8 70%, #0058ee 80%, #3f8cf8 90%, #0058ee 100%);
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: move;
`;

const CloseButton = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ff5c5c;
  border-radius: 3px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: auto;
  
  &:hover {
    background-color: #ff3c3c;
  }
  
  &:active {
    background-color: #cc2929;
  }
`;

const ModalContent = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
`;

const ProjectTitle = styled.h2`
  margin-top: 0;
  color: #0055e5;
  font-size: 18px;
`;

const ProjectDescription = styled.p`
  margin-bottom: 15px;
  font-size: 13px;
  line-height: 1.5;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 15px;
`;

const ProjectTag = styled.span`
  background-color: #dce8fc;
  border: 1px solid #a7c0f2;
  padding: 3px 8px;
  font-size: 11px;
  border-radius: 3px;
`;

const ProjectLink = styled.a`
  display: inline-block;
  background-color: #4c92fe;
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  margin-top: 10px;
  
  &:hover {
    background-color: #3573e0;
  }
  
  &:active {
    background-color: #2667e0;
  }
`;

// Type definitions for project data
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string[];
  url?: string;
}

interface WindowsProjectDisplayProps {
  projects: Array<{
    title: string;
    description: string;
    link: string;
  }>;
}

// Create mock sound functions
const dummySoundFunction = () => {
  console.log('Sound effect would play here (mock)');
};

// Main component
const WindowsProjectDisplay: React.FC<WindowsProjectDisplayProps> = ({ projects }) => {
  const { playClickSound } = useSoundContext();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(moment().format('h:mm A'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format('h:mm A'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleProjectClick = (index: number) => {
    playClickSound();
    setSelectedProject(index);
  };

  const handleCloseModal = () => {
    playClickSound();
    setSelectedProject(null);
  };

  return (
    <WindowsContainer>
      <DesktopArea>
        {projects.map((project, index) => (
          <ProjectFolder 
            key={index}
            onClick={() => handleProjectClick(index)}
          >
            <FolderIcon />
            <FolderName>{project.title}</FolderName>
          </ProjectFolder>
        ))}
        
        <ProjectModal $visible={selectedProject !== null}>
          {selectedProject !== null && (
            <>
              <ModalTitleBar>
                <span>{projects[selectedProject].title}</span>
                <CloseButton onClick={handleCloseModal}>✕</CloseButton>
              </ModalTitleBar>
              <ModalContent>
                <ProjectTitle>{projects[selectedProject].title}</ProjectTitle>
                <ProjectDescription>{projects[selectedProject].description}</ProjectDescription>
                <ProjectTags>
                  {projects[selectedProject].tags.map((tag, index) => (
                    <ProjectTag key={index}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>
                {projects[selectedProject].link && (
                  <ProjectLink 
                    href={projects[selectedProject].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseModal();
                    }}
                  >
                    View Project
                  </ProjectLink>
                )}
              </ModalContent>
            </>
          )}
        </ProjectModal>
      </DesktopArea>
      
      <TaskBar>
        <StartButton>
          <StartIcon />
          Start
        </StartButton>
        <TaskBand />
        <TaskClock>
          {currentTime}
        </TaskClock>
      </TaskBar>
    </WindowsContainer>
  );
};

export default WindowsProjectDisplay; 