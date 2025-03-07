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

  const [upgrades, setUpgrades] = useState(() => {
    const savedUpgrades = localStorage.getItem('upgrades');
    return savedUpgrades ? JSON.parse(savedUpgrades) : [];
  });

  const clickMultiplier = upgrades
    .filter((u) => u.type === 'click')
    .reduce((total, upgrade) => total + upgrade.profit, 1);

  const passiveIncome = upgrades
    .filter((u) => u.type === 'passive')
    .reduce((total, upgrade) => total + upgrade.profit, 0);

  useEffect(() => {
    localStorage.setItem('coinCount', JSON.stringify(coinCount));
    localStorage.setItem('energyCount', JSON.stringify(energyCount));
  }, [coinCount, energyCount]);

  const handleCoinClick = () => {
    if (energyCount > 0) {
      setCoinCount((prev) => prev + clickMultiplier);
      setEnergyCount((prev) => prev - 1);
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

  useEffect(() => {
    if (passiveIncome > 0) {
      const hourlyIncome = passiveIncome;
      const minuteIncome = hourlyIncome / 60;

      const interval = setInterval(() => {
        setCoinCount((prev) => prev + minuteIncome);
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [upgrades, passiveIncome]);

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col gap-5 items-center justify-center overflow-hidden font-unbounded">
      <StatsBar
        clickMultiplier={clickMultiplier}
        coinCount={coinCount}
        passiveIncome={passiveIncome}
      />
      <CurrencyDisplay coinCount={coinCount} />
      <MainScreen onCoinClick={handleCoinClick} className="flex-grow" />
      <EnergyBar energyCount={energyCount} />
      <NavBar />
    </div>
  );
}
