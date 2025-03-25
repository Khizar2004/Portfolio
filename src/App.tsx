import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import LoadingScreen from './components/ui/LoadingScreen';
import MainScene from './scenes/MainScene';
import GlobalStyles from './styles/GlobalStyles';
import ThemeProvider from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Force loading to end after 10 seconds regardless, for debugging
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000);
    
    return () => clearTimeout(timeout);
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <SoundProvider>
        <GlobalStyles />
        <AppContainer>
          <Router>
            {isLoading && <LoadingScreen />}
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<MainScene onLoadComplete={handleLoadComplete} />} />
              </Routes>
            </Suspense>
          </Router>
        </AppContainer>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
