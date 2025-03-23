import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [coinCount, setCoinCount] = useState(() => {
    return parseInt(localStorage.getItem('coinCount')) || 0;
  });

  const [energyCount, setEnergyCount] = useState(() => {
    return parseInt(localStorage.getItem('energyCount')) || 1000;
  });

  const [totalCoinsEarned, setTotalCoinsEarned] = useState(() => {
    return parseInt(localStorage.getItem('totalCoinsEarned')) || 0;
  });

  const [totalProfit, setTotalProfit] = useState(0);

  const [clickMultiplier, setClickMultiplier] = useState(() => {
    return parseInt(localStorage.getItem('clickMultiplier')) || 1;
  });

  const [level, setLevel] = useState(1);

  useEffect(() => {
    const newLevel = Math.floor(totalCoinsEarned / 500) + 1;
    setLevel(newLevel);
  }, [totalCoinsEarned]);

  const defaultUpgrades = [
    {
      id: 1,
      type: 'click',
      name: 'Golden Finger',
      price: 200,
      baseProfit: 2,
      profit: 2,
      level: 1,
      img: '💰',
      owned: false,
    },
    {
      id: 2,
      type: 'click',
      name: 'Cyber Hand',
      price: 1000,
      baseProfit: 10,
      profit: 10,
      level: 1,
      img: '🦾',
      owned: false,
    },
    {
      id: 3,
      type: 'click',
      name: 'Divine Click',
      price: 5000,
      baseProfit: 50,
      profit: 50,
      level: 1,
      img: '⚡',
      owned: false,
    },
    {
      id: 4,
      type: 'passive',
      name: 'Click Manager',
      price: 500,
      baseProfit: 50,
      profit: 50,
      level: 1,
      img: '📊',
      owned: false,
    },
    {
      id: 5,
      type: 'passive',
      name: 'Auto-Click Farm',
      price: 5000,
      baseProfit: 1000,
      profit: 1000,
      level: 1,
      img: '🏡',
      owned: false,
    },
    {
      id: 6,
      type: 'passive',
      name: 'Click Server',
      price: 25000,
      baseProfit: 10000,
      profit: 10000,
      level: 1,
      img: '🌍',
      owned: false,
    },
  ];

  const [upgrades, setUpgrades] = useState(() => {
    const savedUpgrades = localStorage.getItem('upgrades');
    if (savedUpgrades) {
      return JSON.parse(savedUpgrades);
    } else {
      localStorage.setItem('upgrades', JSON.stringify(defaultUpgrades));
      return defaultUpgrades;
    }
  });

  const [totalTaps, setTotalTaps] = useState(() => {
    return parseInt(localStorage.getItem('totalTaps')) || 0;
  });

  // Оновлення totalTaps при кліках (наприклад, при заробітку монет)
  const incrementTaps = () => {
    setTotalTaps((prev) => prev + 1);
  };

  // Збереження totalTaps у локальному сховищі
  useEffect(() => {
    localStorage.setItem('totalTaps', totalTaps);
  }, [totalTaps]);

  useEffect(() => {
    const energyRegenInterval = setInterval(() => {
      setEnergyCount((prev) => Math.min(prev + 1, 1000)); // +1 енергія, не більше 1000
    }, 3000);

    return () => clearInterval(energyRegenInterval);
  }, []);

  useEffect(() => {
    if (upgrades.length > 0) {
      localStorage.setItem('upgrades', JSON.stringify(upgrades));
    }
  }, [upgrades]);

  useEffect(() => {
    localStorage.setItem('coinCount', coinCount);
    localStorage.setItem('energyCount', energyCount);
    localStorage.setItem('totalCoinsEarned', totalCoinsEarned);
    localStorage.setItem('clickMultiplier', clickMultiplier);
  }, [coinCount, energyCount, totalCoinsEarned, clickMultiplier]);

  return (
    <GameContext.Provider
      value={{
        coinCount,
        setCoinCount,
        energyCount,
        setEnergyCount,
        upgrades,
        setUpgrades,
        totalProfit,
        setTotalProfit,
        clickMultiplier,
        setClickMultiplier,
        totalCoinsEarned,
        setTotalCoinsEarned,
        level,
        setLevel,
        incrementTaps,
        totalTaps,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
