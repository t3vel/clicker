import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import StatsBar from '../components/StatsBar';
import CurrencyDisplay from '../components/CurrencyDisplay';
import MainScreen from '../components/MainScreen';
import EnergyBar from '../components/EnergyBar';

export default function Home() {
  const [coinCount, setCoinCount] = useState(() => {
    const savedCoinCount = localStorage.getItem('coinCount');
    return savedCoinCount ? JSON.parse(savedCoinCount) : 0;
  });

  const [energyCount, setEnergyCount] = useState(() => {
    const savedEnergyCount = localStorage.getItem('energyCount');
    return savedEnergyCount ? JSON.parse(savedEnergyCount) : 1000;
  });

  useEffect(() => {
    localStorage.setItem('coinCount', JSON.stringify(coinCount));
    localStorage.setItem('energyCount', JSON.stringify(energyCount));
  }, [coinCount, energyCount]);

  const handleCoinClick = () => {
    if (energyCount > 0) {
      setCoinCount(coinCount + 1);
      setEnergyCount(energyCount - 1);
    }
  };

  useEffect(() => {
    if (energyCount < 1000) {
      const interval = setInterval(() => {
        setEnergyCount((prevEnergy) =>
          prevEnergy < 1000 ? prevEnergy + 1 : prevEnergy
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [energyCount]);

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col gap-5 items-center justify-center overflow-hidden font-unbounded">
      <StatsBar />
      <CurrencyDisplay coinCount={coinCount} />
      <MainScreen onCoinClick={handleCoinClick} className="flex-grow" />
      <EnergyBar energyCount={energyCount} />
      <NavBar />
    </div>
  );
}
