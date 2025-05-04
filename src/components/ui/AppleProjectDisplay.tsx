import React, { useState } from 'react';
import styled from 'styled-components';

const MacOSContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('https://512pixels.net/downloads/macos-wallpapers-thumbs/10-14-Day-Thumb.jpg');
  background-size: cover;
  background-position: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  position: relative;
  overflow: hidden;
  
  &.fullscreen-display {
    background-size: cover;
    background-position: center;
  }
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
  
  .fullscreen-display & {
    height: 32px;
    font-size: 16px;
  }
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
  
  .fullscreen-display & {
    width: 20px;
    height: 20px;
  }
`;

const MenuItems = styled.div`
  display: flex;
  gap: 18px;
  margin-left: 6px;
  
  .fullscreen-display & {
    gap: 24px;
  }
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
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  justify-items: center;
  max-width: 100%;
  margin: 0 auto;
  padding-top: 40px;
  
  /* Desktop view (non-fullscreen) will have 3 columns layout */
  @media (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    padding: 10px;
    padding-top: 10px;
    width: 95%;
    max-width: 1000px;
  }
  
  /* Mobile view (fullscreen) stays with 2 columns */
  .fullscreen-display & {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    padding: 40px;
    padding-top: 60px;
    width: 90%;
  }
`;

const FolderIcon = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }
  
  /* Desktop view (non-fullscreen) with slightly larger icons */
  @media (min-width: 769px) {
    width: 110px;
    height: 90px;
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 2px;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  /* Mobile view (fullscreen) */
  .fullscreen-display & {
    width: 150px;
    height: 160px;
  }
`;

const IconImage = styled.div`
  width: 80px;
  height: 70px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjMDA5OGZjIiBkPSJNNDY1LjUgNDE2LjVIMzAwLjJDMjk0IDQxOS4xIDI4OCA0MjIgMjgyLjEgNDI0LjlDMjcwLjEgNDMwLjcgMjU2LjYgNDM2LjcgMjQyLjEgNDM2LjdDMjI3LjcgNDM2LjcgMjE0LjEgNDMwLjcgMjAyLjEgNDI0LjlDMTg2LjcgNDE3LjYgMTcwLjYgNDAyLjcgMTU0LjUgNDAyLjdINDYuNEM0NC41IDQwMi43IDQyLjYgNDAyLjIgNDAuOSA0MDEuM0MzOS4xIDQwMC40IDM3LjUgMzk5IDM2LjIgMzk3LjNDMzQuOSAzOTUuNSAzNCAxOTcuNCAzMy41IDE5NS41QzMzLjEgOTMuNiAzMyA5MS43IDMzLjQgODkuOUMzMy43IDg4LjEgMzQuNSA4Ni40IDM1LjcgODUuMUMzNi45IDgzLjggMzguNCA4Mi44IDQwLjEgODIuMUM0MS45IDgxLjUgNDMuOCA4MS4zIDQ1LjcgODEuNUgxODBDMTg2LjIgNzguOSAyMzIgNzYgMjM4IDczLjFDMjUwIDY3LjMgMjYzLjUgNjEuMyAyNzcuOSA2MS4zQzI5Mi4zIDYxLjMgMzA1LjkgNjcuMyAzMTcuOSA3My4xQzMzMy4zIDgwLjQgMzQ5LjQgOTUuMyAzNjUuNSA5NS4zSDQ2NS41QzQ2Ny40IDk1LjMgNDY5LjQgOTUuOCA0NzEuMSA5Ni43QzQ3Mi45IDk3LjYgNDc0LjUgOTkuMSA0NzUuOCAxMDAuOEM0NzcuMSAxMDIuNSA0NzggMTA0LjUgNDc4LjUgMTA2LjZDNDc4LjkgMTA4LjcgNDc5IDExMC45IDQ3OC41IDExM0w0MjMuOSAzOTkuMkM0MjMuMiA0MDEuOSA0MjEuOSA0MDQuNCA0MTkuOSA0MDYuMUM0MTcuOSA0MDcuOSA0MTUuNSA0MDkgNDEyLjkgNDA5LjNDNDEwLjQgNDA5LjYgNDA3LjggNDA5IDQwNS42IDQwNy43QzQwMy4zIDQwNi40IDQwMS41IDQwNC40IDQwMC41IDQwMnYtMjg5SDQ1MS4yTDQ2NS41IDQxNi41WiIvPjwvc3ZnPg==');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* Desktop view (non-fullscreen) */
  @media (min-width: 769px) {
    width: 75px;
    height: 65px;
    margin-bottom: 4px;
    margin-top: 4px;
  }
  
  /* Mobile view (fullscreen) */
  .fullscreen-display & {
    width: 100px;
    height: 90px;
  }
`;

const IconText = styled.div`
  color: white;
  font-size: 14px;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  word-break: break-word;
  max-width: 110px;
  width: 110px;
  font-weight: 500;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  
  /* Desktop view (non-fullscreen) */
  @media (min-width: 769px) {
    font-size: 13px;
    max-width: 110px;
    width: 110px;
    padding: 3px;
    background-color: rgba(0, 0, 0, 0.35);
    line-height: 1.2;
  }
  
  /* Mobile view (fullscreen) */
  .fullscreen-display & {
    font-size: 18px;
    max-width: 140px;
    width: 140px;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

interface Project {
  title: string;
  repo?: string;
  description?: string;
}

interface AppleProjectDisplayProps {
  isVisible: boolean;
  projects?: Project[];
  className?: string;
}

const AppleProjectDisplay: React.FC<AppleProjectDisplayProps> = ({ 
  isVisible, 
  projects = [],
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
    </MacOSContainer>
  );
};

export default AppleProjectDisplay; 