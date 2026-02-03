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
            <Title>Software Engineer & Full-Stack Developer</Title>
            <Bio>
              I'm a Computer Science student at UBC with a passion for building scalable, full-stack applications. 
              From architecting AI-powered features with Django and React to developing real-time WebSocket systems, 
              I thrive on solving complex problems. I combine strong backend fundamentals with creative frontend 
              development to deliver exceptional user experiences.
            </Bio>
          </ProfileInfo>
        </ProfileSection>
        
        <SectionTitle>Skills</SectionTitle>
        <SkillsContainer>
          <Skill>TypeScript</Skill>
          <Skill>React</Skill>
          <Skill>Node.js</Skill>
          <Skill>Python</Skill>
          <Skill>Django</Skill>
          <Skill>Next.js</Skill>
          <Skill>Three.js</Skill>
          <Skill>MongoDB</Skill>
          <Skill>PostgreSQL</Skill>
          <Skill>MySQL</Skill>
          <Skill>Docker</Skill>
          <Skill>AWS</Skill>
          <Skill>Redis</Skill>
          <Skill>Socket.io</Skill>
          <Skill>Jest</Skill>
          <Skill>Git</Skill>
        </SkillsContainer>
        
        <SectionTitle>Experience</SectionTitle>
        <TimelineContainer>
          <TimelineItem>
            <TimelineDate>Aug 2025 - Present</TimelineDate>
            <TimelineTitle>Software Engineer Intern</TimelineTitle>
            <TimelineSubtitle>Aucctos AI (Toronto, Remote) - Architecting full-stack AI features with Django REST, React/TypeScript, and WebSockets; building scalable backend services with Celery, Docker, and AWS</TimelineSubtitle>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineDate>Jan 2025 - Present</TimelineDate>
            <TimelineTitle>R&D Software Engineer</TimelineTitle>
            <TimelineSubtitle>University of British Columbia - Designed a Generative AI simulation engine using GPT-4 for modeling student behavior; built production-ready TypeScript/Node.js pipeline with MySQL integration</TimelineSubtitle>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineDate>Dec 2024 - May 2025</TimelineDate>
            <TimelineTitle>Full-Stack Engineer Intern</TimelineTitle>
            <TimelineSubtitle>Strike Den (Kelowna, Remote) - Built a full-stack gym management platform with Next.js, MongoDB, and Tailwind CSS; achieved 257ms median response times under 50 concurrent users</TimelineSubtitle>
          </TimelineItem>
        </TimelineContainer>
        
        <SectionTitle>Projects</SectionTitle>
        <TimelineContainer>
          <TimelineItem>
            <TimelineDate>Dec 2024 - Mar 2025</TimelineDate>
            <TimelineTitle>ShakeScribe</TimelineTitle>
            <TimelineSubtitle>AI-Powered Translator using Python, React, Flask, Redis, and DeepSeek LLM with multi-model NLP pipeline and Shakespeare detection system</TimelineSubtitle>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineDate>Jan 2025 - Apr 2025</TimelineDate>
            <TimelineTitle>TSKFLO</TimelineTitle>
            <TimelineSubtitle>Full-Stack Task Manager with React, Redux, Node.js, Socket.io, and MongoDB featuring real-time messaging and Dockerized REST API with 15+ endpoints</TimelineSubtitle>
          </TimelineItem>
        </TimelineContainer>
        
        <SectionTitle>Education</SectionTitle>
        <TimelineContainer>
          <TimelineItem>
            <TimelineDate>Sep 2022 - May 2027</TimelineDate>
            <TimelineTitle>BSc in Computer Science (Minor in Economics), Co-op</TimelineTitle>
            <TimelineSubtitle>University of British Columbia - GPA: 4.2/4.33, Dean's List (2023-2025), Deputy Vice-Chancellor Scholarship (2023-2025)</TimelineSubtitle>
          </TimelineItem>
        </TimelineContainer>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutMe; 