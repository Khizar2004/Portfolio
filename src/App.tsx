import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import LoadingScreen from './components/ui/LoadingScreen';
import MainScene from './scenes/MainScene';
import MusicButton from './components/ui/MusicButton';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Force loading to end after a reasonable timeout (10s) for better user experience
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
    <AppContainer>
      <Router>
        {isLoading && <LoadingScreen />}
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<MainScene onLoadComplete={handleLoadComplete} />} />
          </Routes>
        </Suspense>
        {/* Only display these UI elements when not loading */}
        {!isLoading && (
          <>
            <MusicButton />
          </>
        )}
      </Router>
    </AppContainer>
  );
}

export default App;
