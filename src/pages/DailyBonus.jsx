import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import NavBar from '../components/NavBar';
import calendar from '../images/calendar.svg';
import mainCoin from '../images/main-coin.svg';

export default function DailyBonus() {
  const { coinCount, setCoinCount, totalCoinsEarned, setTotalCoinsEarned } =
    useContext(GameContext); // Додано totalCoinsEarned і setTotalCoinsEarned

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dailyBonusData, setDailyBonusData] = useState(() => {
    const savedData = localStorage.getItem('dailyBonus');
    return savedData
      ? JSON.parse(savedData)
      : {
          lastClaimedDate: null,
          currentDay: 0,
          totalCoins: 0,
        };
  });

  const bonusAmounts = [
    1000, 1250, 1500, 2000, 2000, 2500, 2500, 3000, 3000, 6000,
  ];

  useEffect(() => {
    localStorage.setItem('dailyBonus', JSON.stringify(dailyBonusData));
  }, [dailyBonusData]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const claimBonus = () => {
    const today = new Date().toISOString().split('T')[0];
    if (dailyBonusData.lastClaimedDate === today) {
      alert('Ви вже отримали бонус сьогодні.');
      return;
    }

    const newDay = dailyBonusData.currentDay;
    const bonusAmount = bonusAmounts[newDay];

    setDailyBonusData({
      lastClaimedDate: today,
      currentDay: newDay < bonusAmounts.length - 1 ? newDay + 1 : newDay,
      totalCoins: dailyBonusData.totalCoins + bonusAmount,
    });

    // Оновлюємо totalCoinsEarned та coinCount
    setCoinCount((prev) => prev + bonusAmount);
    setTotalCoinsEarned((prev) => prev + bonusAmount); // Оновлення totalCoinsEarned

    closeModal();
  };

  const isBonusClaimedToday =
    dailyBonusData.lastClaimedDate === new Date().toISOString().split('T')[0];

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col gap-5 items-center justify-center overflow-hidden font-unbounded">
      <h1 className="text-white text-5xl mb-4">Earn more money</h1>
      <div
        onClick={openModal}
        className="text-white border border-x-slate-400 rounded-xl py-3 px-8 flex flex-col items-center gap-2 cursor-pointer"
      >
        <img src={calendar} alt="Calendar" width={40} />
        Daily reward
        <p className="flex items-center justify-center gap-1">
          +25000 <img src={mainCoin} alt="Coin" width={20} className="inline" />
        </p>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="bg-gray-800 p-5 rounded-lg flex flex-col items-center max-w-[800px] w-full">
            <div className="flex justify-end w-full">
              <button onClick={closeModal} className="text-white text-2xl">
                X
              </button>
            </div>
            <div className="flex flex-col items-center">
              <img src={calendar} alt="Calendar" width={100} />
              <h2 className="text-white text-2xl font-semibold mt-2">
                Daily reward
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Accrue coins for logging into the game daily without skipping.
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {bonusAmounts.map((amount, index) => {
                const isClaimed = index < dailyBonusData.currentDay;
                const isCurrent = index === dailyBonusData.currentDay;

                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-2 rounded-lg ${
                      isClaimed
                        ? 'bg-green-700 border border-green-500'
                        : isCurrent
                        ? 'border border-yellow-500'
                        : 'bg-[#383838]'
                    }`}
                  >
                    <img
                      src={mainCoin}
                      alt="Coin"
                      width={20}
                      className="inline"
                    />
                    <span className="text-white text-sm">{amount}</span>
                    <span className="text-gray-400 text-xs">
                      Day {index + 1}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={claimBonus}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 ${
                isBonusClaimedToday ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isBonusClaimedToday}
            >
              {isBonusClaimedToday ? 'Claimed' : 'Claim'}
            </button>
          </div>
        </div>
      )}

      <NavBar />
    </div>
  );
}
