import React, { ReactNode } from 'react';
import { SoundProvider } from '../../context/SoundContext';
import ThemeProvider, { ThemeMode } from '../../context/ThemeContext';

interface HtmlContextWrapperProps {
  children: ReactNode;
  currentTheme?: ThemeMode;
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