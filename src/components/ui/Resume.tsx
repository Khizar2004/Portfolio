import React from 'react';
import styled from 'styled-components';

const ResumeContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ResumeHeader = styled.div`
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

const ResumeContent = styled.div`
  flex-grow: 1;
  position: relative;
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
`;

const DownloadButton = styled.a`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  z-index: 10;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

// Icon for download button
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
);

const Resume: React.FC = () => {
  const resumePath = '/documents/Updated Resume.pdf';
  
  return (
    <ResumeContainer>
      <ResumeHeader>My Resume</ResumeHeader>
      
      <ResumeContent>
        <PDFViewer 
          src={`${resumePath}#toolbar=0&navpanes=0`} 
          title="Resume"
        />
        <DownloadButton href={resumePath} download>
          <DownloadIcon />
          Download
        </DownloadButton>
      </ResumeContent>
    </ResumeContainer>
  );
};

export default Resume; 