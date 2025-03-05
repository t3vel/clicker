import React from 'react';
import NavBar from '../components/NavBar';
import calendar from '../images/calendar.svg';
import mainCoin from '../images/main-coin.svg';

import { useState } from 'react';

export default function DailyBonus() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log(isModalOpen);
  };

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col gap-5 items-center justify-center overflow-hidden font-unbounded">
      <h1 className="text-white text-5xl mb-4">Earn more money</h1>
      <div
        onClick={openModal}
        className="text-white border border-x-slate-400 rounded-xl py-3 px-8 flex flex-col items-center gap-2  cursor-pointer"
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
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white text-2xl"
              >
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
              {[1000, 1500, 1500, 2000, 2000, 2500, 2500, 3000, 3000, 6000].map(
                (amount, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-2 rounded-lg ${
                      index < 1 ? 'border border-green-500' : 'bg-[#383838]'
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
                )
              )}
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
              Claim
            </button>
          </div>
        </div>
      )}

      <NavBar />
    </div>
  );
}
