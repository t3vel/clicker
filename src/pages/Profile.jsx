import React, { useContext, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { GameContext } from '../context/GameContext';

export default function Profile() {
  const { level, totalCoinsEarned, totalTaps, energyCount, upgrades } =
    useContext(GameContext);

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
      condition: energyCount <= 900,
      unlocked: false,
    },
  ]);

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
      if (achievement.id === 4) isUnlocked = energyCount <= 900;

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
        </div>
        {/* Досягнення */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-md w-64">
          <h3 className="text-lg mb-3">Achievement</h3>
          <ul className="list-none list-inside text-gray-300">
            {achievements.map((achievement) => (
              <li
                key={achievement.id}
                className={
                  achievement.unlocked ? 'text-green-400' : 'text-gray-400'
                }
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
