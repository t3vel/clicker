import React from 'react';
import { useState, useRef, useEffect } from 'react';
import NavBar from '../components/NavBar';

const upgrades = [
  {
    id: 1,
    name: 'Робот-Клікер',
    price: 100,
    profit: '+1 клік/сек',
    level: 1,
    img: '🤖',
  },
  {
    id: 2,
    name: 'Автоклік 2000',
    price: 500,
    profit: '+5 кліків/сек',
    level: 1,
    img: '⚙️',
  },
  {
    id: 3,
    name: 'Фабрика Кліків',
    price: 2000,
    profit: '+20 кліків/сек',
    level: 1,
    img: '🏭',
  },
];

export default function Mine() {
  const [activeUpgrade, setActiveUpgrade] = useState(null);
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveUpgrade(null);
    }
  };

  useEffect(() => {
    if (activeUpgrade !== null) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeUpgrade]);

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col gap-5 items-center justify-center overflow-hidden font-unbounded">
      {upgrades.map((upgrade) => (
        <div key={upgrade.id} className="relative">
          <button
            className="w-full flex flex-col items-center p-4 bg-blue-500 text-white rounded-lg shadow-md"
            onClick={() => setActiveUpgrade(upgrade)}
          >
            <div className="text-4xl">{upgrade.img}</div>
            <h3 className="mt-2 font-bold">{upgrade.name}</h3>
            <p className="text-sm">💰 {upgrade.price} монет</p>
            <p className="text-sm">📈 {upgrade.profit}</p>
            <p className="text-sm">🔼 Рівень: {upgrade.level}</p>
          </button>

          {activeUpgrade?.id === upgrade.id && (
            <div
              ref={popupRef}
              className="absolute left-1/2 top-full mt-2 w-56 p-4 bg-white shadow-lg border rounded-lg -translate-x-1/2"
            >
              <h3 className="font-bold">{activeUpgrade.name}</h3>
              <p>🏆 Поточний рівень: {activeUpgrade.level}</p>
              <p>⚡ Покращення: {activeUpgrade.profit}</p>
              <p>💰 Ціна наступного рівня: {activeUpgrade.price * 1.5} монет</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
