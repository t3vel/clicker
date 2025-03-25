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
    level,
    setLevel,
  } = useContext(GameContext);

  const [passiveIncome, setPassiveIncome] = useState(0);
  const [offlineCoins, setOfflineCoins] = useState(0);
  const [showOfflineModal, setShowOfflineModal] = useState(false);

  useEffect(() => {
    const totalPassive = upgrades
      .filter((upgrade) => upgrade.owned && upgrade.type === 'passive')
      .reduce((total, upgrade) => total + upgrade.profit, 0);
    setPassiveIncome(totalPassive);
  }, [upgrades]);

  useEffect(() => {
    const lastExitTime = localStorage.getItem('lastExitTime');
    if (lastExitTime) {
      const elapsedTime = (Date.now() - parseInt(lastExitTime)) / 1000;
      const elapsedHours = elapsedTime / 3600;
      const earnedOffline = passiveIncome * elapsedHours;

      if (earnedOffline > 0) {
        setOfflineCoins(earnedOffline);
        setCoinCount((prev) => prev + earnedOffline);
        setTotalCoinsEarned((prev) => prev + earnedOffline);
      }
    }
  }, [passiveIncome]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('lastExitTime', Date.now().toString());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (passiveIncome > 0) {
      const interval = setInterval(() => {
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

  useEffect(() => {
    if (offlineCoins > 0) {
      setShowOfflineModal(true);
      setTimeout(() => {
        setShowOfflineModal(false);
      }, 5000);
    }
  }, [offlineCoins]);

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col gap-5 items-center justify-center overflow-hidden font-unbounded">
      {showLevelUpModal && (
        <div className="fixed top-2 left-2 bg-green-500 text-white py-2 text-center text-xs sm:text-sm p-3 w-9/12 sm:w-auto rounded-lg shadow-lg z-50">
          You have reached a {level} level!
        </div>
      )}

      {showOfflineModal && (
        <div className="fixed top-2 left-2 bg-blue-500 text-white py-2 text-center text-xs sm:text-sm p-3 w-9/12 sm:w-auto rounded-lg shadow-lg z-50">
          You earned {parseInt(offlineCoins)} coins while offline!
        </div>
      )}

      <StatsBar
        clickMultiplier={clickMultiplier}
        coinCount={coinCount}
        passiveIncome={passiveIncome}
        totalCoinsEarned={totalCoinsEarned}
        level={level}
      />
      <CurrencyDisplay coinCount={coinCount} />
      <MainScreen onCoinClick={handleCoinClick} className="flex-grow" />
      <EnergyBar energyCount={energyCount} />
      <div className="">
        <NavBar />
      </div>
    </div>
  );
}
