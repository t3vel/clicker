import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/GameContext';
import NavBar from '../components/NavBar';
import StatsBar from '../components/StatsBar';
import CurrencyDisplay from '../components/CurrencyDisplay';
import MainScreen from '../components/MainScreen';
import EnergyBar from '../components/EnergyBar';

export default function Home() {
  const { coinCount, setCoinCount, energyCount, setEnergyCount, upgrades } =
    useContext(GameContext);

  useEffect(() => {
    // Перевірка наявності збережених монет та енергії у localStorage
    const savedCoinCount = localStorage.getItem('coinCount');
    const savedEnergyCount = localStorage.getItem('energyCount');

    if (savedCoinCount) {
      setCoinCount(Number(savedCoinCount));
    } else {
      setCoinCount(0);
    }

    if (savedEnergyCount) {
      setEnergyCount(Number(savedEnergyCount));
    } else {
      setEnergyCount(1000);
    }
  }, []); // Виконується тільки при першому завантаженні

  const [clickMultiplier, setClickMultiplier] = useState(0);
  const [passiveIncome, setPassiveIncome] = useState(0);

  useEffect(() => {
    // Обчислюємо множник кліка на основі кількості монет
    const multiplier = Math.floor(coinCount / 1000) + 1; // Збільшуємо на 1 кожні 1000 монет
    setClickMultiplier(multiplier);
  }, [coinCount]);

  useEffect(() => {
    // Якщо пасивний дохід більше нуля, то додаємо монети кожну хвилину
    if (passiveIncome > 0) {
      const hourlyIncome = passiveIncome;
      const minuteIncome = hourlyIncome / 60;

      const interval = setInterval(() => {
        setCoinCount((prev) => prev + minuteIncome);
      }, 60000);

      return () => clearInterval(interval); // Очищаємо інтервал після зміни
    }
  }, [passiveIncome]); // Залежить від зміни `passiveIncome`

  useEffect(() => {
    // Обчислюємо загальний пасивний дохід з усіх оновлень
    const totalPassiveIncome = upgrades.reduce((total, upgrade) => {
      const profit = typeof upgrade.profit === 'number' ? upgrade.profit : 0;
      return total + profit;
    }, 0);

    // Оновлюємо стан пасивного доходу
    console.log('Total Passive Income:', totalPassiveIncome);
    setPassiveIncome(totalPassiveIncome);
  }, [upgrades]); // Викликається кожного разу, коли оновлюється `upgrades`

  // Збереження значень у localStorage при їх оновленні
  useEffect(() => {
    localStorage.setItem('coinCount', coinCount);
    localStorage.setItem('energyCount', energyCount);
  }, [coinCount, energyCount]);

  console.log('Click Multiplier:', clickMultiplier);
  console.log('Energy Count:', energyCount);

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col gap-5 items-center justify-center overflow-hidden font-unbounded">
      <StatsBar
        clickMultiplier={clickMultiplier}
        coinCount={coinCount}
        passiveIncome={passiveIncome}
      />
      <CurrencyDisplay coinCount={coinCount} />
      <MainScreen
        onCoinClick={() => {
          // Перевірка чи достатньо енергії для кліка
          if (energyCount > 0) {
            setCoinCount((prev) => prev + clickMultiplier);
            setEnergyCount((prev) => Math.max(prev - 1, 0)); // Зберігаємо енергію не менше 0
          }
        }}
        className="flex-grow"
      />

      <EnergyBar energyCount={energyCount} />
      <NavBar />
    </div>
  );
}
