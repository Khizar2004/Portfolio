import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ThemeProvider from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import GlobalStyles from './styles/GlobalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <SoundProvider>
        <GlobalStyles />
        <App />
      </SoundProvider>
    </ThemeProvider>
  </React.StrictMode>
);
