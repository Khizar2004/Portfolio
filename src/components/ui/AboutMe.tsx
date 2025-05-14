import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const AboutHeader = styled.div`
  height: 30px;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
`;

const AboutContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  overflow-y: auto;
  color: ${({ theme }) => theme.text};
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-direction: column;
  
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

interface ProfileImageProps {
  $hasImage: boolean;
}

const ProfileImage = styled.div<ProfileImageProps>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${({ theme, $hasImage }) => $hasImage ? 'transparent' : theme.accent};
  background-image: ${({ $hasImage }) => $hasImage ? 'url("/images/profile.jpg")' : 'none'};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin: 0 auto;
  overflow: hidden;
  
  @media (min-width: 600px) {
    margin: 0;
  }
`;

const ProfileInfo = styled.div`
  flex-grow: 1;
`;

const Name = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
`;

const Title = styled.p`
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.accent};
`;

const Bio = styled.p`
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const SectionTitle = styled.h3`
  margin: 1.5rem 0 0.5rem 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.primary};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: ${({ theme }) => theme.accent};
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1rem;
`;

const Skill = styled.div`
  padding: 5px 10px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 0.8rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 1.5rem;
  padding-bottom: 1rem;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.3rem;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.secondary};
  }
  
  &:after {
    content: '';
    position: absolute;
    left: 4px;
    top: 0.5rem;
    width: 2px;
    height: calc(100% - 0.5rem);
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &:last-child:after {
    display: none;
  }
`;

const TimelineDate = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondary};
  font-weight: 500;
`;

const TimelineTitle = styled.h4`
  margin: 0.2rem 0;
  font-size: 0.9rem;
`;

const TimelineSubtitle = styled.p`
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.7;
`;

const AboutMe: React.FC = () => {
  const [hasProfileImage, setHasProfileImage] = useState(false);
  
  useEffect(() => {
    // Check if profile image exists
    const img = new Image();
    img.src = '/images/profile.jpg';
    img.onload = () => setHasProfileImage(true);
    img.onerror = () => setHasProfileImage(false);
  }, []);
  
  return (
    <AboutContainer>
      <AboutHeader>About Me</AboutHeader>
      
      <AboutContent>
        <ProfileSection>
          <ProfileImage $hasImage={hasProfileImage}>
            {!hasProfileImage && 'KA'}
          </ProfileImage>
          
          <ProfileInfo>
            <Name>Khizar Aamir</Name>
            <Title>Computer Science Student & Creative Developer</Title>
            <Bio>
              I'm a Computer Science student at UBC Okanagan with a passion for blending technology with artistry. 
              I love creating applications that aren't just functional, but visually engaging and delightful to use. 
              Whether it's crafting pixel-perfect UIs or building robust backend systems, I try to infuse creativity 
              into every project I work on.
            </Bio>
          </ProfileInfo>
        </ProfileSection>
        
        <SectionTitle>Skills</SectionTitle>
        <SkillsContainer>
          <Skill>React</Skill>
          <Skill>TypeScript</Skill>
          <Skill>Node.js</Skill>
          <Skill>Python</Skill>
          <Skill>Swift</Skill>
          <Skill>Java</Skill>
          <Skill>MongoDB</Skill>
          <Skill>PostgreSQL</Skill>
          <Skill>Docker</Skill>
          <Skill>Next.js</Skill>
          <Skill>Three.js</Skill>
          <Skill>SwiftUI</Skill>
        </SkillsContainer>
        
        <SectionTitle>Experience</SectionTitle>
        <TimelineContainer>
          <TimelineItem>
            <TimelineDate>Feb 2025 - May 2025</TimelineDate>
            <TimelineTitle>Software Engineer</TimelineTitle>
            <TimelineSubtitle>Strike Den - Built a full-stack gym management platform with JWT auth and RBAC, optimizing scheduling by 70%</TimelineSubtitle>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineDate>Jan 2025 - May 2025</TimelineDate>
            <TimelineTitle>Undergraduate Researcher</TimelineTitle>
            <TimelineSubtitle>UBC Okanagan - Developed an OpenAI-driven simulation system for testing adaptive learning algorithms</TimelineSubtitle>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineDate>Jan 2024 - Present</TimelineDate>
            <TimelineTitle>Teaching Assistant</TimelineTitle>
            <TimelineSubtitle>UBC Okanagan - Supporting 300+ students in quantitative courses and creating instructional content</TimelineSubtitle>
          </TimelineItem>
        </TimelineContainer>
        
        <SectionTitle>Projects</SectionTitle>
        <TimelineContainer>
          <TimelineItem>
            <TimelineDate>Jan 2025 - Apr 2025</TimelineDate>
            <TimelineTitle>TSKFLO</TimelineTitle>
            <TimelineSubtitle>A full-stack task manager with real-time messaging and Dockerized microservices</TimelineSubtitle>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineDate>Jan 2025 - Apr 2025</TimelineDate>
            <TimelineTitle>Re:member</TimelineTitle>
            <TimelineSubtitle>An artistic iOS journaling app using Metal shaders to simulate memory decay</TimelineSubtitle>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineDate>Jan 2023 - May 2023</TimelineDate>
            <TimelineTitle>Loreleaf</TimelineTitle>
            <TimelineSubtitle>A Zettelkasten-style knowledge platform with Force Graph UI for dynamic note visualization</TimelineSubtitle>
          </TimelineItem>
        </TimelineContainer>
        
        <SectionTitle>Education</SectionTitle>
        <TimelineContainer>
          <TimelineItem>
            <TimelineDate>Sep 2022 - May 2026</TimelineDate>
            <TimelineTitle>BSc in Computer Science (Minor in Economics)</TimelineTitle>
            <TimelineSubtitle>University of British Columbia - Dean's List (2023-2025), Deputy Vice-Chancellor Scholarship (2023,2024)</TimelineSubtitle>
          </TimelineItem>
        </TimelineContainer>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutMe; 