import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/GameContext';
import NavBar from '../components/NavBar';
import StatsBar from '../components/StatsBar';
import CurrencyDisplay from '../components/CurrencyDisplay';
import MainScreen from '../components/MainScreen';
import EnergyBar from '../components/EnergyBar';

export default function Home() {
  const {
    coinCount,
    setCoinCount,
    energyCount,
    setEnergyCount,
    upgrades,
    totalCoinsEarned,
    setTotalCoinsEarned,
    clickMultiplier,
  } = useContext(GameContext);

  const [passiveIncome, setPassiveIncome] = useState(0);

  useEffect(() => {
    const totalPassive = upgrades
      .filter((upgrade) => upgrade.owned && upgrade.type === 'passive')
      .reduce((total, upgrade) => total + upgrade.profit, 0);

    setPassiveIncome(totalPassive);
  }, [upgrades]);

  useEffect(() => {
    if (passiveIncome > 0) {
      const interval = setInterval(() => {
        // Доходи за 10 секунд
        setCoinCount((prev) => prev + passiveIncome / 60 / 6);
        setTotalCoinsEarned((prev) => prev + passiveIncome / 60 / 6);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [passiveIncome]);

  const handleCoinClick = () => {
    if (energyCount > 0) {
      setCoinCount((prev) => prev + clickMultiplier);
      setTotalCoinsEarned((prev) => prev + clickMultiplier);
      setEnergyCount((prev) => Math.max(prev - 1, 0));
    }
  };

  const [level, setLevel] = useState(1);

  useEffect(() => {
    const newLevel = Math.floor(totalCoinsEarned / 500) + 1;
    setLevel(newLevel);
  }, [totalCoinsEarned]);

  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

  useEffect(() => {
    const newLevel = Math.floor(totalCoinsEarned / 500) + 1;
    if (newLevel > level) {
      setShowLevelUpModal(true);
      setTimeout(() => {
        setShowLevelUpModal(false);
      }, 3000);
    }
    setLevel(newLevel);
  }, [totalCoinsEarned]);

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col gap-5 items-center justify-center overflow-hidden font-unbounded">
      {showLevelUpModal && (
        <div className="fixed top-2 left-2 bg-green-500 text-white py-2 text-center text-xs sm:text-sm p-3 w-9/12 sm:w-auto rounded-lg shadow-lg z-50">
          You have reached a new level! 
        </div>
      )}
      <StatsBar
        clickMultiplier={clickMultiplier}
        coinCount={coinCount}
        passiveIncome={passiveIncome}
        totalCoinsEarned={totalCoinsEarned}
      />
      <CurrencyDisplay coinCount={coinCount} />
      <MainScreen onCoinClick={handleCoinClick} className="flex-grow" />
      <EnergyBar energyCount={energyCount} />
      <NavBar />
    </div>
  );
}
