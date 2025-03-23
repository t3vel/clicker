import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mine from './pages/Mine';
import DailyBonus from './pages/DailyBonus';
import { GameProvider } from './context/GameContext';
import Profile from './pages/Profile';

export default function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/daily-bonus" element={<DailyBonus />} />
      </Routes>
    </GameProvider>
  );
}
