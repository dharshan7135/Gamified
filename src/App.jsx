import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Home from './pages/Home';
import Wealth from './pages/Wealth';
import Protection from './pages/Protection';
import Missions from './pages/Missions';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wealth" element={<Wealth />} />
          <Route path="/protection" element={<Protection />} />
          <Route path="/missions" element={<Missions />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
