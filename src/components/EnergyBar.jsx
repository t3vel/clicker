import React from 'react';

export default function EnergyBar({ energyCount }) {
  return (
    <div className="flex items-center gap-2 text-white text-xl font-bold">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="yellow"
        className="size-6"
      >
        <path d="M11.983 1.907a.75.75 0 0 0-1.292-.657l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.657l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z" />
      </svg>
      <span>{energyCount}</span>/<span>1000</span>
    </div>
  );
}
