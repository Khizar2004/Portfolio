import React, { useState } from 'react';
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
  padding: 1.5rem;
  flex-grow: 1;
  overflow-y: auto;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h2`
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  text-align: center;
`;

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.text};
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.text};
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const MessageSent = styled.div`
  padding: 1rem;
  background-color: rgba(40, 200, 64, 0.1);
  border: 1px solid rgba(40, 200, 64, 0.2);
  border-radius: 4px;
  color: #28C840;
  margin-top: 1rem;
  text-align: center;
`;

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally connect to a backend API
    // For demo purposes, we'll just show a success message
    setIsSubmitted(true);
  };
  
  return (
    <ContactContainer>
      <ContactHeader>Contact Me</ContactHeader>
      
      <ContactContent>
        <Title>Get In Touch</Title>
        
        <SocialLinksContainer>
          <SocialLink href="https://github.com" target="_blank" aria-label="GitHub">
            <span>GH</span>
          </SocialLink>
          <SocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
            <span>LI</span>
          </SocialLink>
          <SocialLink href="https://twitter.com" target="_blank" aria-label="Twitter">
            <span>TW</span>
          </SocialLink>
        </SocialLinksContainer>
        
        {!isSubmitted ? (
          <FormContainer as="form" onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea 
                id="message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </InputGroup>
            
            <SubmitButton type="submit">Send Message</SubmitButton>
          </FormContainer>
        ) : (
          <MessageSent>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. I'll get back to you soon.</p>
          </MessageSent>
        )}
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact; 