import React, { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';
import NavBar from '../components/NavBar';

export default function Mine() {
  const {
    coinCount,
    setCoinCount,
    upgrades,
    setUpgrades,
    setTotalProfit,
    clickMultiplier,
    setClickMultiplier,
  } = useContext(GameContext);

  const [activeUpgrade, setActiveUpgrade] = useState(null);

  const handlePurchase = () => {
    const previousClickMultiplier = clickMultiplier;

    setCoinCount((prevCoinCount) => prevCoinCount - activeUpgrade.price);

    setUpgrades((prevUpgrades) => {
      const updatedUpgrades = prevUpgrades.map((u) => {
        const newLevel = u.level + 1;
        const newPrice = Math.round(u.price * 1.5);

        const newProfit =
          u.type === 'click'
            ? u.baseProfit * newLevel
            : u.baseProfit * newLevel;

        if (u.id === activeUpgrade.id) {
          console.log('🔧 Оновлення апгрейду:', {
            id: u.id,
            name: u.name,
            type: u.type,
            currentLevel: u.level,
            newLevel,
            currentProfit: u.profit,
            newProfit,
            currentPrice: u.price,
            newPrice,
          });

          return {
            ...u,
            owned: true,
            level: newLevel,
            price: newPrice,
            profit: newProfit,
          };
        }
        return u;
      });

      const purchasedUpgrade = updatedUpgrades.find(
        (u) => u.id === activeUpgrade.id
      );

      if (purchasedUpgrade.type === 'click') {
        const newClickMultiplier =
          previousClickMultiplier + purchasedUpgrade.profit;
        setClickMultiplier(newClickMultiplier);
      }

      setTotalProfit((prevTotal) => {
        const previousProfit = activeUpgrade.profit || 0;
        const profitDifference = purchasedUpgrade.profit - previousProfit;
        const newTotal = prevTotal + profitDifference;
        return newTotal;
      });

      return updatedUpgrades;
    });

    setActiveUpgrade(null);
  };

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col items-center justify-center font-unbounded">
      <h1 className="text-white lg:text-2xl sm:text-lg mb-4 mt-4">
        Balance: {parseInt(coinCount)}
      </h1>
      {/* <button
        className="text-white"
        onClick={() => setCoinCount((prevCoins) => prevCoins + 100000)}
      >
        Im developer
      </button> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
        {upgrades.map((upgrade) => (
          <button
            key={upgrade.id}
            className="w-full sm:w-[300px] flex flex-col items-center p-4 bg-blue-500 text-white rounded-lg shadow-md hover:scale-110 duration-300 hover:bg-blue-400"
            onClick={() => setActiveUpgrade(upgrade)}
          >
            <div className="text-4xl">{upgrade.img}</div>
            <h3 className="mt-2 font-bold">{upgrade.name}</h3>
            <p className="text-sm"> Price: {upgrade.price}</p>
            <p className="text-sm">
              +{upgrade.profit + upgrade.baseProfit} coins (
              {upgrade.type === 'click' ? 'by click' : 'passive'})
            </p>
            <p className="text-sm"> Lvl: {upgrade.level}</p>
          </button>
        ))}
      </div>

      {activeUpgrade && (
        <div className="fixed z-10 bottom-0 left-0 w-full bg-gray-800 text-white p-6 shadow-lg transition-all duration-500 ease-in-out transform translate-y-0">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold">{activeUpgrade.name}</h3>
              <p> Current level: {activeUpgrade.level}</p>
              <p>
                ⚡ Improvement: +
                {activeUpgrade.baseProfit * (activeUpgrade.level + 1)} coins (
                {activeUpgrade.type === 'click' ? 'by click' : 'passive'})
              </p>

              <p> Price: {activeUpgrade.price} coins</p>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setActiveUpgrade(null)}
            >
              Close
            </button>
          </div>

          <button
            className={`mt-4 w-full p-3 rounded-lg font-bold transition-colors duration-300 ease-in-out ${
              coinCount >= activeUpgrade.price
                ? 'bg-blue-900 hover:bg-gray-600'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
            onClick={handlePurchase}
            disabled={coinCount < activeUpgrade.price}
          >
            {coinCount >= activeUpgrade.price ? 'Buy' : 'Not enough coins'}
          </button>
        </div>
      )}
      <div className="">
        <NavBar />
      </div>
    </div>
  );
}
