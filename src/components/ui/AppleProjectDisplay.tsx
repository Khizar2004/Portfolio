import React, { useState } from 'react';
import styled from 'styled-components';
import { ThemeMode } from '../../context/ThemeContext';

const MacOSContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('https://512pixels.net/downloads/macos-wallpapers-thumbs/10-14-Day-Thumb.jpg');
  background-size: cover;
  background-position: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  position: relative;
  overflow: hidden;
`;

const TopBar = styled.div`
  height: 24px;
  width: 100%;
  background: rgba(50, 50, 50, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: white;
  font-weight: 500;
  font-size: 13px;
  position: relative;
  z-index: 2;
`;

const AppleLogo = styled.div`
  width: 16px;
  height: 16px;
  position: relative;
  margin-right: 12px;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z'/%3E%3C/svg%3E");
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
  }
`;

const MenuItems = styled.div`
  display: flex;
  gap: 18px;
  margin-left: 6px;
`;

const MenuItem = styled.div`
  font-weight: 500;
  
  &:first-child {
    font-weight: 700;
  }
`;

const Clock = styled.div`
  margin-left: auto;
`;

const DesktopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
`;

const FolderIcon = styled.div`
  width: 80px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
`;

const IconImage = styled.div`
  width: 60px;
  height: 50px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjMDA5OGZjIiBkPSJNNDY1LjUgNDE2LjVIMzAwLjJDMjk0IDQxOS4xIDI4OCA0MjIgMjgyLjEgNDI0LjlDMjcwLjEgNDMwLjcgMjU2LjYgNDM2LjcgMjQyLjEgNDM2LjdDMjI3LjcgNDM2LjcgMjE0LjEgNDMwLjcgMjAyLjEgNDI0LjlDMTg2LjcgNDE3LjYgMTcwLjYgNDAyLjcgMTU0LjUgNDAyLjdINDYuNEM0NC41IDQwMi43IDQyLjYgNDAyLjIgNDAuOSA0MDEuM0MzOS4xIDQwMC40IDM3LjUgMzk5IDM2LjIgMzk3LjNDMzQuOSAzOTUuNSAzNCAxOTcuNCAzMy41IDE5NS41QzMzLjEgOTMuNiAzMyA5MS43IDMzLjQgODkuOUMzMy43IDg4LjEgMzQuNSA4Ni40IDM1LjcgODUuMUMzNi45IDgzLjggMzguNCA4Mi44IDQwLjEgODIuMUM0MS45IDgxLjUgNDMuOCA4MS4zIDQ1LjcgODEuNUgxODBDMTg2LjIgNzguOSAyMzIgNzYgMjM4IDczLjFDMjUwIDY3LjMgMjYzLjUgNjEuMyAyNzcuOSA2MS4zQzI5Mi4zIDYxLjMgMzA1LjkgNjcuMyAzMTcuOSA3My4xQzMzMy4zIDgwLjQgMzQ5LjQgOTUuMyAzNjUuNSA5NS4zSDQ2NS41QzQ2Ny40IDk1LjMgNDY5LjQgOTUuOCA0NzEuMSA5Ni43QzQ3Mi45IDk3LjYgNDc0LjUgOTkuMSA0NzUuOCAxMDAuOEM0NzcuMSAxMDIuNSA0NzggMTA0LjUgNDc4LjUgMTA2LjZDNDc4LjkgMTA4LjcgNDc5IDExMC45IDQ3OC41IDExM0w0MjMuOSAzOTkuMkM0MjMuMiA0MDEuOSA0MjEuOSA0MDQuNCA0MTkuOSA0MDYuMUM0MTcuOSA0MDcuOSA0MTUuNSA0MDkgNDEyLjkgNDA5LjNDNDEwLjQgNDA5LjYgNDA3LjggNDA5IDQwNS42IDQwNy43QzQwMy4zIDQwNi40IDQwMS41IDQwNC40IDQwMC41IDQwMnYtMjg5SDQ1MS4yTDQ2NS41IDQxNi41WiIvPjwvc3ZnPg==');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 8px;
`;

const IconText = styled.div`
  color: white;
  font-size: 12px;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  word-break: break-word;
  max-width: 90px;
`;

const Dock = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
`;

const DockIcon = styled.div`
  width: 40px;
  height: 40px;
  background-size: cover;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

interface Project {
  title: string;
  repo?: string;
  description?: string;
}

interface AppleProjectDisplayProps {
  isVisible: boolean;
  currentTheme?: ThemeMode;
  projects?: Project[];
  className?: string;
}

const defaultProjects: Project[] = [
  { 
    title: "Personal Portfolio", 
    repo: "https://github.com/username/portfolio",
    description: "3D interactive portfolio website built with Three.js and React" 
  },
  { 
    title: "E-Commerce App", 
    repo: "https://github.com/username/ecommerce",
    description: "Full-stack e-commerce application with React and Node.js" 
  },
  { 
    title: "Weather Dashboard", 
    repo: "https://github.com/username/weather-app",
    description: "Weather forecast application using a weather API" 
  },
  { 
    title: "Task Tracker", 
    repo: "https://github.com/username/task-tracker",
    description: "Task management application with React" 
  },
  { 
    title: "Blog Platform", 
    repo: "https://github.com/username/blog-platform",
    description: "Content management system for blogging" 
  }
];

const AppleProjectDisplay: React.FC<AppleProjectDisplayProps> = ({ 
  isVisible, 
  currentTheme,
  projects = defaultProjects,
  className
}) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  
  const handleFolderClick = (repo?: string) => {
    if (repo) {
      window.open(repo, '_blank');
    }
  };
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <MacOSContainer className={className}>
      <TopBar>
        <AppleLogo />
        <MenuItems>
          <MenuItem>Finder</MenuItem>
          <MenuItem>File</MenuItem>
          <MenuItem>Edit</MenuItem>
          <MenuItem>View</MenuItem>
          <MenuItem>Go</MenuItem>
          <MenuItem>Window</MenuItem>
          <MenuItem>Help</MenuItem>
        </MenuItems>
        <Clock>{currentTime}</Clock>
      </TopBar>
      
      <DesktopGrid>
        {projects.map((project, index) => (
          <FolderIcon key={index} onClick={() => handleFolderClick(project.repo)}>
            <IconImage />
            <IconText>{project.title}</IconText>
          </FolderIcon>
        ))}
      </DesktopGrid>
      
      <Dock style={{ display: 'none' }}>
        <DockIcon style={{ backgroundImage: 'url("https://macpaw.com/images/uploads/wiki%20image%20pages/finder-icon/Finder_2.png")' }} />
        <DockIcon style={{ backgroundImage: 'url("https://cdn.jim-nielsen.com/macos/512/safari-2021-10-18.png")' }} />
        <DockIcon style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png")' }} />
        <DockIcon style={{ backgroundImage: 'url("https://static-00.iconduck.com/assets.00/terminal-icon-2048x2048-11a922k0.png")' }} />
      </Dock>
    </MacOSContainer>
  );
};

export default AppleProjectDisplay; 