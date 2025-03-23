import React, { useContext } from 'react';
import mainCoin from '../images/main-coin.svg';
import { GameContext } from '../context/GameContext';

export default function MainScreen({ onCoinClick }) {
  const { incrementTaps } = useContext(GameContext);

  const handleCoinClick = () => {
    incrementTaps();
    onCoinClick();
  };

  return (
    <div className="flex justify-center items-center w-full h-[40vh]">
      <img
        src={mainCoin}
        width={300}
        alt="Main coin"
        className="hover:cursor-pointer"
        onClick={handleCoinClick}
      />
    </div>
  );
}
