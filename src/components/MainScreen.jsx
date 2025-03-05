import React from 'react';
import mainCoin from '../images/main-coin.svg';

export default function MainScreen({ onCoinClick }) {
  return (
    <div className="flex justify-center items-center w-full h-[40vh] ">
      <img
        src={mainCoin}
        width={300}
        alt="Main coin"
        className="hover:cursor-pointer"
        onClick={onCoinClick}
      />
    </div>
  );
}
