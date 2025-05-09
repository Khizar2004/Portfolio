import React, { ReactNode } from 'react';
import ThemeProvider, { ThemeMode } from '../../context/ThemeContext';

interface HtmlContextWrapperProps {
  children: ReactNode;
  currentTheme?: ThemeMode;
}

const HtmlContextWrapper: React.FC<HtmlContextWrapperProps> = ({ children, currentTheme = 'dark' }) => {
  return (
    <ThemeProvider initialTheme={currentTheme}>
      {children}
    </ThemeProvider>
  );
};

export default HtmlContextWrapper; 