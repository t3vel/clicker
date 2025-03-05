// NavBar.js
import React from 'react';

export default function NavBar() {
  return (
    <div className="bg-gray-800 p-4 shadow-xl mx-auto fixed bottom-0 left-1/2 transform -translate-x-1/2">
      <ul className="text-white text-xl flex justify-between list-none cursor-pointer gap-10">
        <li className="hover:text-gray-400 hover:bg-slate-600 transition-colors duration-300 p-3 rounded-xl">
          Home
        </li>
        <li className="hover:text-gray-400 transition-colors duration-300 p-3 hover:bg-slate-600 rounded-xl">
          Mine
        </li>
        <li className="hover:text-gray-400 transition-colors duration-300 p-3 hover:bg-slate-600 rounded-xl">
          Friends
        </li>
        <li className="hover:text-gray-400 transition-colors duration-300 p-3 hover:bg-slate-600 rounded-xl">
          Daily Bonus
        </li>
      </ul>
    </div>
  );
}
