import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const lightTheme = {
  background: '#f5f5f5',
  text: '#333333',
  primary: '#4361ee',
  secondary: '#3a0ca3',
  accent: '#f72585',
  surface: '#ffffff',
};

const darkTheme = {
  background: '#0f0f0f',
  text: '#ffffff',
  primary: '#4cc9f0',
  secondary: '#7209b7',
  accent: '#f72585',
  surface: '#1a1a1a',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create a fallback for when context is missing
const fallbackThemeContext: ThemeContextType = {
  theme: 'dark',
  toggleTheme: () => console.warn('Theme context not available')
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.warn('useTheme called outside of ThemeProvider. Using fallback implementation.');
    return fallbackThemeContext;
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
}

const ThemeProvider = ({ children, initialTheme = 'dark' }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeObject = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={themeObject}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 