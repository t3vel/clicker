import React from 'react';

export default function StatsBar({
  clickMultiplier,
  coinCount,
  passiveIncome,
}) {
  const validCoinCount = Number(coinCount) || 0;

  const coinsToLevelUp = Math.floor(validCoinCount / 500) * 500 + 500;

  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md w-full max-w-sm mx-auto">
      <ul className="space-y-2">
        <li className="flex justify-between border-b border-gray-600 pb-1">
          <span>Earn per tap:</span>
          <span className="font-bold text-green-400">{clickMultiplier}</span>
        </li>
        <li className="flex justify-between border-b border-gray-600 pb-1">
          <span>Coins to LVL up:</span>
          <span className="font-bold text-yellow-400">{coinsToLevelUp}</span>
        </li>
        <li className="flex justify-between">
          <span>Profit per hour:</span>
          <span className="font-bold text-blue-400">{passiveIncome}</span>
        </li>
      </ul>
    </div>
  );
}
