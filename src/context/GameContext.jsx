import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [coinCount, setCoinCount] = useState(() => {
    return parseInt(localStorage.getItem('coinCount')) || 0;
  });

  const [energyCount, setEnergyCount] = useState(() => {
    return parseInt(localStorage.getItem('energyCount')) || 1000;
  });

  const defaultUpgrades = [
    {
      id: 1,
      type: 'click',
      name: 'Золотий Палець',
      price: 200,
      profit: 2,
      level: 1,
      img: '🖕',
    },
    {
      id: 2,
      type: 'click',
      name: 'Кібер-Рука',
      price: 1000,
      profit: 10,
      level: 1,
      img: '🦾',
    },
    {
      id: 3,
      type: 'click',
      name: 'Божественний Клік',
      price: 5000,
      profit: 50,
      level: 1,
      img: '⚡',
    },
    {
      id: 4,
      type: 'passive',
      name: 'Клік-Менеджер',
      price: 500,
      profit: 100,
      level: 1,
      img: '📊',
    },
    {
      id: 5,
      type: 'passive',
      name: 'Автоклік-Ферма',
      price: 5000,
      profit: 1000,
      level: 1,
      img: '🏡',
    },
    {
      id: 6,
      type: 'passive',
      name: 'Сервер Кліків',
      price: 25000,
      profit: 10000,
      level: 1,
      img: '🌍',
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

  useEffect(() => {
    if (upgrades.length > 0) {
      localStorage.setItem('upgrades', JSON.stringify(upgrades));
    }
  }, [upgrades]);

  useEffect(() => {
    localStorage.setItem('coinCount', coinCount);
    localStorage.setItem('energyCount', energyCount);
  }, [coinCount, energyCount]);

  return (
    <GameContext.Provider
      value={{
        coinCount,
        setCoinCount,
        energyCount,
        setEnergyCount,
        upgrades,
        setUpgrades,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
