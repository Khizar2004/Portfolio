import React, { useState } from 'react';
import styled from 'styled-components';

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
  padding: 1.5rem;
  flex-grow: 1;
  overflow-y: auto;
  color: ${({ theme }) => theme.text};
`;

const ProjectTabs = styled.div`
  display: flex;
  gap: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
`;

const ProjectTab = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  border-radius: 4px 4px 0 0;
  background-color: ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.text};
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ active, theme }) => active ? theme.primary : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const ProjectCard = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.05);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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

const projects = [
  {
    id: 1,
    title: 'Interactive Portfolio',
    description: 'A 3D interactive portfolio website with ThreeJS and React, featuring custom animations and object interactions.',
    tags: ['React', 'Three.js', 'TypeScript']
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, payment processing, and inventory management.',
    tags: ['Next.js', 'Node.js', 'MongoDB']
  },
  {
    id: 3,
    title: 'AI Content Generator',
    description: 'An AI-powered content generation tool that creates custom marketing copy based on user prompts.',
    tags: ['Python', 'TensorFlow', 'NLP']
  },
  // Add more projects as needed
];

const ProjectDisplay: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  return (
    <ProjectContainer>
      <WindowBar>
        <WindowControls>
          <WindowButton color="#FF5F57" />
          <WindowButton color="#FEBC2E" />
          <WindowButton color="#28C840" />
        </WindowControls>
        <WindowTitle>My Projects</WindowTitle>
      </WindowBar>
      
      <ProjectContent>
        <ProjectTabs>
          <ProjectTab 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            All Projects
          </ProjectTab>
          <ProjectTab 
            active={activeTab === 'web'} 
            onClick={() => setActiveTab('web')}
          >
            Web Dev
          </ProjectTab>
          <ProjectTab 
            active={activeTab === 'mobile'} 
            onClick={() => setActiveTab('mobile')}
          >
            Mobile Apps
          </ProjectTab>
        </ProjectTabs>
        
        {projects.map(project => (
          <ProjectCard key={project.id}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <ProjectTags>
              {project.tags.map(tag => (
                <ProjectTag key={tag}>{tag}</ProjectTag>
              ))}
            </ProjectTags>
          </ProjectCard>
        ))}
      </ProjectContent>
    </ProjectContainer>
  );
};

export default ProjectDisplay; 