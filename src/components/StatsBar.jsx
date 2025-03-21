import React from 'react';

export default function StatsBar({
  clickMultiplier,
  passiveIncome,
  totalCoinsEarned,
}) {
  const validTotalCoinsEarned = Number(totalCoinsEarned) || 0;

  const coinsToLevelUp = Math.ceil((validTotalCoinsEarned + 1) / 500) * 500;

  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      <ul className="space-y-2">
        <li className="flex justify-between border-b border-gray-600 pb-1">
          <span>Earn per tap:</span>
          <span className="font-bold text-green-400">{clickMultiplier}</span>
        </li>
        <li className="flex justify-between border-b border-gray-600 pb-1">
          <span>Coins to LVL up:</span>
          <span className="font-bold text-yellow-400">
            {parseInt(coinsToLevelUp - validTotalCoinsEarned)}
          </span>
        </li>
        <li className="flex justify-between">
          <span>Profit per hour:</span>
          <span className="font-bold text-blue-400">{passiveIncome}</span>
        </li>
      </ul> 
    </div>
  );
}
