import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const ProjectContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const WindowBar = styled.div`
  height: 30px;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const WindowControls = styled.div`
  display: flex;
  gap: 6px;
`;

const WindowButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const WindowTitle = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin: 0 auto;
`;

const ProjectContent = styled.div`
  padding: 1rem;
  flex-grow: 1;
  overflow-y: auto;
  color: ${({ theme }) => theme.text};
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

const ProjectTabs = styled.div`
  display: flex;
  gap: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
  padding: 0 4px;
`;

const ProjectTab = styled.button<{ $active: boolean }>`
  padding: 8px 12px;
  border-radius: 4px 4px 0 0;
  background-color: ${({ $active, theme }) => $active ? theme.primary : 'transparent'};
  color: ${({ $active, theme }) => $active ? 'white' : theme.text};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ $active, theme }) => $active ? theme.primary : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const ProjectCard = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${({ theme }) => theme.primary};
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const ProjectTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.primary};
`;

const ProjectDescription = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 0.5rem;
`;

const ProjectTag = styled.span`
  padding: 3px 8px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.secondary};
  color: white;
  font-size: 0.7rem;
`;

const ProjectLink = styled.a`
  margin-top: 0.5rem;
  display: inline-block;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const NoProjects = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
`;

type ProjectCategory = 'all' | 'web' | 'mobile' | 'design';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory[];
  url?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: '3D Interactive Portfolio',
    description: 'A 3D interactive portfolio website with ThreeJS and React, featuring custom animations and object interactions.',
    tags: ['React', 'Three.js', 'TypeScript'],
    category: ['web', 'design'],
    url: 'https://github.com/example/portfolio'
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, payment processing, and inventory management.',
    tags: ['Next.js', 'Node.js', 'MongoDB'],
    category: ['web'],
    url: 'https://github.com/example/ecommerce'
  },
  {
    id: 3,
    title: 'AI Content Generator',
    description: 'An AI-powered content generation tool that creates custom marketing copy based on user prompts.',
    tags: ['Python', 'TensorFlow', 'NLP'],
    category: ['web', 'design'],
    url: 'https://github.com/example/ai-content'
  },
  {
    id: 4,
    title: 'iOS Fitness Tracker',
    description: 'A native iOS app for tracking workouts, nutrition, and sleep patterns with Apple Health integration.',
    tags: ['Swift', 'UIKit', 'HealthKit'],
    category: ['mobile'],
    url: 'https://github.com/example/fitness'
  },
  {
    id: 5,
    title: 'Mobile Game',
    description: 'A cross-platform mobile game built with Unity, featuring 3D graphics and multiplayer functionality.',
    tags: ['Unity', 'C#', '3D'],
    category: ['mobile', 'design'],
    url: 'https://github.com/example/game'
  },
  {
    id: 6,
    title: 'UI Component Library',
    description: 'A reusable component library built with React and Styled Components, with comprehensive documentation.',
    tags: ['React', 'Styled Components', 'Storybook'],
    category: ['web', 'design'],
    url: 'https://github.com/example/components'
  }
];

const ProjectDisplay: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category.includes(activeTab)));
    }
  }, [activeTab]);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleCapture = (e: Event) => {
      e.stopPropagation();
    };
    
    container.addEventListener('click', handleCapture, true);
    container.addEventListener('pointerdown', handleCapture, true);
    container.addEventListener('pointerup', handleCapture, true);
    
    return () => {
      container.removeEventListener('click', handleCapture, true);
      container.removeEventListener('pointerdown', handleCapture, true);
      container.removeEventListener('pointerup', handleCapture, true);
    };
  }, []);
  
  const handleTabChange = (tab: ProjectCategory) => {
    setActiveTab(tab);
  };
  
  const handleProjectClick = (e: React.MouseEvent, url?: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (url) {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }, 0);
    }
  };

  const handleLinkClick = (e: React.MouseEvent, url?: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (url) {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }, 0);
    }
  };
  
  return (
    <ProjectContainer 
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      style={{ 
        position: 'relative', 
        zIndex: 100 
      }}
    >
      <WindowBar>
        <WindowControls>
          <WindowButton color="#FF5F57" />
          <WindowButton color="#FFBD2E" />
          <WindowButton color="#28CA41" />
        </WindowControls>
        <WindowTitle>My Projects</WindowTitle>
      </WindowBar>
      
      <ProjectContent onClick={(e) => e.stopPropagation()}>
        <ProjectTabs>
          <ProjectTab 
            $active={activeTab === 'all'} 
            onClick={(e) => {
              e.stopPropagation();
              handleTabChange('all');
            }}
          >
            All
          </ProjectTab>
          <ProjectTab 
            $active={activeTab === 'web'} 
            onClick={(e) => {
              e.stopPropagation();
              handleTabChange('web');
            }}
          >
            Web
          </ProjectTab>
          <ProjectTab 
            $active={activeTab === 'mobile'} 
            onClick={(e) => {
              e.stopPropagation();
              handleTabChange('mobile');
            }}
          >
            Mobile
          </ProjectTab>
          <ProjectTab 
            $active={activeTab === 'design'} 
            onClick={(e) => {
              e.stopPropagation();
              handleTabChange('design');
            }}
          >
            Design
          </ProjectTab>
        </ProjectTabs>
        
        {filteredProjects.length > 0 ? (
          <ProjectGrid>
            {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id}
                onClick={(e) => handleProjectClick(e, project.url)}
              >
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTags>
                  {project.tags.map((tag, index) => (
                    <ProjectTag key={index}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>
                {project.url && (
                  <ProjectLink 
                    href={project.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleLinkClick(e, project.url)}
                  >
                    View Project
                  </ProjectLink>
                )}
              </ProjectCard>
            ))}
          </ProjectGrid>
        ) : (
          <NoProjects>
            No projects found in this category.
          </NoProjects>
        )}
      </ProjectContent>
    </ProjectContainer>
  );
};

export default ProjectDisplay; 