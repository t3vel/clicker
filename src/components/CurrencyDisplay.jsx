import React from 'react';
import { motion } from 'framer-motion';
import coin from '../images/coin.svg';

export default function CurrencyDisplay({ coinCount }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <img src={coin} alt="Number of coins" width={40} />
      <motion.h2
        key={coinCount} // Зміна ключа змусить Motion анімувати оновлення
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className="ml-2 text-white font-bold text-2xl"
      >
        {coinCount}
      </motion.h2>
    </div>
  );
}
