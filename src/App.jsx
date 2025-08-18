import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import GameboyModel from './components/GameboyModel.jsx';
import GameboyScreen from './components/screens/GameboyScreen.jsx';
import InitialLoadingScreen from './components/InitialLoadingScreen.jsx';

function App() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [screenContent, setScreenContent] = useState('loading');

  const handleModelLoaded = () => {
    setIsModelLoaded(true);
    // Keep loading screen for 3 seconds, then go to default
    setTimeout(() => setScreenContent('footer'));
  };

  return (
    <div className="min-h-screen min-w-full">
      <main className="w-full h-screen">
          <div className="w-full h-screen">
            <Canvas
              style={{ zIndex: 1, touchAction: 'none' }}
              shadows
              dpr={Math.min(window.devicePixelRatio * 1.5, 2)}
              camera={{ fov: 50, position: [0, 7, 0] }}
            >
              <Suspense fallback={null}>
                <GameboyModel 
                  onLoaded={handleModelLoaded} 
                  screenContent={screenContent}
                  GameboyScreenComponent={GameboyScreen}
                />
              </Suspense>
            </Canvas>
            <InitialLoadingScreen 
              isModelLoaded={isModelLoaded}
              onComplete={() => console.log('gameboy loaded')}
            />
          </div>
        </main>
    </div>
  );
}

export default App; 