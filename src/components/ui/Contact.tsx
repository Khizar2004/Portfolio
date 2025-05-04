import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ContactHeader = styled.div`
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

const ContactContent = styled.div`
  padding: 2rem;
  flex-grow: 1;
  overflow-y: auto;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0 0 2rem 0;
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
  text-align: center;
`;

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const EmailContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
`;

const EmailLink = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  max-width: 500px;
  line-height: 1.6;
`;

const MobileNote = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.primary};
  max-width: 400px;
`;

// SVG Icons
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
  </svg>
);

const Contact: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect if on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle link clicks to prevent propagation which could trigger global listeners
  const handleSocialLinkClick = (e: React.MouseEvent) => {
    // Prevent the event from bubbling up to document listeners
    e.stopPropagation();
  };

  return (
    <ContactContainer>
      <ContactHeader>Contact Me</ContactHeader>
      
      <ContactContent>
        <Title>Get In Touch</Title>
        
        {isMobile ? (
          <>
            <Description>
              Want to get in touch? Here's how you can reach me for collaborations, job opportunities, or just to say hello!
            </Description>
            <MobileNote>
              Find my social links in the control panel buttons at the bottom right of your screen.
            </MobileNote>
          </>
        ) : (
          <>
            <Description>
              I'm always open to new opportunities and collaborations. Feel free to reach out through any of the platforms below.
            </Description>
            
            <SocialLinksContainer>
              <SocialLink 
                href="https://github.com/Khizar2004" 
                target="_blank" 
                aria-label="GitHub"
                onClick={handleSocialLinkClick}
              >
                <GitHubIcon />
              </SocialLink>
              <SocialLink 
                href="https://www.linkedin.com/in/khizar-aamir-680484292/" 
                target="_blank" 
                aria-label="LinkedIn"
                onClick={handleSocialLinkClick}
              >
                <LinkedInIcon />
              </SocialLink>
              <SocialLink 
                href="mailto:khizaraamir2004@gmail.com" 
                aria-label="Email"
                onClick={handleSocialLinkClick}
              >
              <EmailIcon />
              </SocialLink>
            </SocialLinksContainer>
          </>
        )}
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact; 