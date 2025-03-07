import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

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

export default function Mine() {
  const [coins, setCoins] = useState(() => {
    return parseInt(localStorage.getItem('coinCount')) || 0;
  });

  useEffect(() => {
    localStorage.setItem('coinCount', coins);
  }, [coins]);

  const [upgrades, setUpgrades] = useState(() => {
    const savedUpgrades = localStorage.getItem('upgrades');
    return savedUpgrades ? JSON.parse(savedUpgrades) : defaultUpgrades;
  });

  const [activeUpgrade, setActiveUpgrade] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeUpgrade ? 'hidden' : 'auto';
  }, [activeUpgrade]);

  useEffect(() => {
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
  }, [upgrades]);

  const handlePurchase = () => {
    if (!activeUpgrade) return;

    if (coins >= activeUpgrade.price) {
      const newCoins = coins - activeUpgrade.price;
      setCoins(newCoins);

      const updatedUpgrades = upgrades.map((u) =>
        u.id === activeUpgrade.id
          ? {
              ...u,
              level: u.level + 1,
              price: Math.round(u.price * 1.5),
              profit: Math.round(u.profit * 1.5),
              }
          : u
      );

      setUpgrades(updatedUpgrades);
      setActiveUpgrade(null);
    } else {
      console.log('❌ Недостатньо монет!');
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col items-center justify-center font-unbounded">
      <h1 className="text-white text-2xl mb-4">💰 Баланс: {coins}</h1>

      <div className="grid grid-cols-2 gap-6 p-6">
        {upgrades.map((upgrade) => (
          <button
            key={upgrade.id}
            className="w-[300px] flex flex-col items-center p-4 bg-blue-500 text-white rounded-lg shadow-md hover:scale-110 duration-300 hover:bg-blue-400"
            onClick={() => setActiveUpgrade(upgrade)}
          >
            <div className="text-4xl">{upgrade.img}</div>
            <h3 className="mt-2 font-bold">{upgrade.name}</h3>
            <p className="text-sm">💰 Ціна: {upgrade.price}</p>
            <p className="text-sm">
              📈 +{upgrade.profit} монет (
              {upgrade.type === 'click' ? 'за клік' : 'пасивно'})
            </p>
            <p className="text-sm">🔼 Рівень: {upgrade.level}</p>
          </button>
        ))}
      </div>

      {activeUpgrade && (
        <div className="fixed z-10 bottom-0 left-0 w-full bg-gray-800 text-white p-6 shadow-lg transition-all duration-500 ease-in-out transform translate-y-0">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold">{activeUpgrade.name}</h3>
              <p>🏆 Поточний рівень: {activeUpgrade.level}</p>
              <p>⚡ Покращення: +{activeUpgrade.profit} монет</p>
              <p>💰 Ціна: {activeUpgrade.price} монет</p>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setActiveUpgrade(null)}
            >
              Закрити
            </button>
          </div>

          <button
            className={`mt-4 w-full p-3 rounded-lg font-bold transition-colors duration-300 ease-in-out ${
              coins >= activeUpgrade.price
                ? 'bg-blue-900 hover:bg-gray-600'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
            onClick={handlePurchase}
            disabled={coins < activeUpgrade.price}
          >
            {coins >= activeUpgrade.price ? 'Придбати' : 'Недостатньо монет'}
          </button>
        </div>
      )}

      <NavBar />
    </div>
  );
}
