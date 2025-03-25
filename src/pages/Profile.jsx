import React, { useContext, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { GameContext } from '../context/GameContext';

export default function Profile() {
  const {
    level,
    totalCoinsEarned,
    totalTaps,
    energyCount,
    upgrades,
    passiveIncome,
  } = useContext(GameContext);

  const [nickname, setNickname] = useState(
    () => localStorage.getItem('nickname') || 'user'
  );

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      name: 'First 1000 coins 💰',
      condition: totalCoinsEarned >= 1000,
      unlocked: false,
    },
    {
      id: 2,
      name: '1000 taps in total 🔥',
      condition: totalTaps >= 1000,
      unlocked: false,
    },
    {
      id: 3,
      name: 'First upgrade 🛠️',
      condition: upgrades.filter((upg) => upg.owned).length >= 1,
      unlocked: false,
    },
    {
      id: 4,
      name: '100 energy spent ⚡',
      condition: totalTaps >= 100,
      unlocked: false,
    },
    {
      id: 5,
      name: 'Millionaire 💎',
      condition: totalCoinsEarned >= 1000000,
      unlocked: false,
    },
    {
      id: 6,
      name: '5000 taps in total 🖱️',
      condition: totalTaps >= 5000,
      unlocked: false,
    },

    {
      id: 7,
      name: 'Investor 📈',
      condition: upgrades.filter((upg) => upg.owned).length >= 10,
      unlocked: false,
    },
    {
      id: 9,
      name: 'Passive Income Earner 🏦',
      condition: passiveIncome >= 5000,
      unlocked: false,
    },
    {
      id: 11,
      name: 'Level 100 Reached 🚀',
      condition: level >= 10,
      unlocked: false,
    },
  ]);

  const getRank = (level) => {
    if (level <= 10) return 'Newcomer';
    if (level <= 25) return 'Beginner';
    if (level <= 50) return 'Experienced';
    if (level <= 200) return 'Professional';
    return 'Master';
  };

  useEffect(() => {
    const savedAchievements = localStorage.getItem('achievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  useEffect(() => {
    const updatedAchievements = achievements.map((achievement) => {
      let isUnlocked = false;

      if (achievement.id === 1) isUnlocked = totalCoinsEarned >= 1000;
      if (achievement.id === 2) isUnlocked = totalTaps >= 1000;
      if (achievement.id === 3)
        isUnlocked = upgrades.filter((upg) => upg.owned).length >= 1;
      if (achievement.id === 4) isUnlocked = totalTaps >= 100;

      return {
        ...achievement,
        unlocked: isUnlocked,
      };
    });

    setAchievements(updatedAchievements);
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
  }, [totalCoinsEarned, totalTaps, level, energyCount]);

  const getLevelColor = () => {
    if (level >= 16) return 'text-yellow-400';
    if (level >= 11) return 'text-blue-400';
    if (level >= 6) return 'text-green-400';
    return 'text-gray-400';
  };

  useEffect(() => {
    localStorage.setItem('nickname', nickname);
  }, [nickname]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col items-center justify-center font-unbounded text-white">
      {/* Блок профілю */}
      <div className="flex flex-col items-center mb-4">
        <div className="bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center text-4xl">
          <span>👤</span>
        </div>
        <input
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          className="bg-gray-800 text-white text-center rounded-md p-1 mt-2 mb-1 w-10/12"
          placeholder="Enter nickname"
        />
        <p className={`text-sm ${getLevelColor()}`}>Level: {level}</p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center w-full">
        {/* Статистика */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-md w-64">
          <h3 className="text-lg mb-3">
            Stats player <span className="text-green-400">{nickname}</span>:
          </h3>
          <p>
            Totoal earned coins:{' '}
            <span className="text-yellow-400">
              {parseInt(totalCoinsEarned)}
            </span>
          </p>
          <p>
            Total number of taps:{' '}
            <span className="text-yellow-400">{totalTaps}</span>
          </p>
          <p>
            Rank: <span className="text-purple-400">{getRank(level)}</span>
          </p>
        </div>
        {/* Досягнення */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-md w-64 max-h-48 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
          <h3 className="text-lg mb-3">Achievement</h3>
          <ul className="list-none list-inside text-gray-300 w-full">
            {achievements.map((achievement, index) => (
              <li
                key={achievement.id}
                className={`py-2 px-1 ${
                  achievement.unlocked ? 'text-green-400' : 'text-gray-400'
                } ${
                  index !== achievements.length - 1
                    ? 'border-b border-gray-600'
                    : ''
                }`}
              >
                {achievement.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-5">
        <NavBar />
      </div>
    </div>
  );
}
