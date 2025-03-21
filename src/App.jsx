import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mine from './pages/Mine';
import Friends from './pages/Friends';
import DailyBonus from './pages/DailyBonus';
import { GameProvider } from './context/GameContext';

export default function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/daily-bonus" element={<DailyBonus />} />
      </Routes>
    </GameProvider>
  );
}
