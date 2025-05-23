import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import LoadingScreen from './components/ui/LoadingScreen';
import MainScene from './scenes/MainScene';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
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
      </Router>
    </AppContainer>
  );
}

export default App;
