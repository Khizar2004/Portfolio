import React, { ReactNode } from 'react';
import { SoundProvider } from '../../context/SoundContext';
import ThemeProvider from '../../context/ThemeContext';

interface HtmlContextWrapperProps {
  children: ReactNode;
  currentTheme?: 'light' | 'dark';
}

const HtmlContextWrapper: React.FC<HtmlContextWrapperProps> = ({ children, currentTheme = 'dark' }) => {
  return (
    <ThemeProvider initialTheme={currentTheme}>
      <SoundProvider>
        {children}
      </SoundProvider>
    </ThemeProvider>
  );
};

export default HtmlContextWrapper; 