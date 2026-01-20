import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

// List of major towns and cities in Ghana
const GHANA_TOWNS = ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Cape Coast', 'Sunyani', 'Koforidua', 'Ho', 'Wa', 'Bolgatanga', 'Techiman', 'Tema', 'Obuasi', 'Tarkwa', 'Nkawkaw', 'Hohoe', 'Winneba', 'Kasoa', 'Nsawam', 'Sogakope', 'Berekum', 'Akim Oda', 'Aflao', 'Bawku', 'Salaga', 'Yendi', 'Ejura', 'Wenchi', 'Kintampo', 'Dunkwa-on-Offin'];

// Function to get random town pair
const getRandomTownPair = (): {
  from: string;
  to: string;
} => {
  const shuffled = [...GHANA_TOWNS].sort(() => Math.random() - 0.5);
  return {
    from: shuffled[0],
    to: shuffled[1]
  };
};
export const AnnouncementBar: React.FC = () => {
  const [announcement, setAnnouncement] = useState(getRandomTownPair());
  const [key, setKey] = useState(0);
  useEffect(() => {
    // Update announcement every 15 seconds (15000ms)
    const interval = setInterval(() => {
      setAnnouncement(getRandomTownPair());
      setKey(prev => prev + 1); // Force re-render with animation
    }, 15000);
    return () => clearInterval(interval);
  }, []);
  return <div className="w-full bg-gradient-to-r from-green-600 to-green-500 border-b border-green-700 py-1.5 px-4 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={key} initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: 10
      }} transition={{
        duration: 0.5
      }} className="flex items-center justify-center gap-2 text-white text-sm font-medium">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span className="text-center">
            Delivery from <span className="font-bold text-yellow-300">{announcement.from}</span> to{' '}
            <span className="font-bold text-yellow-300">{announcement.to}</span> completed.
          </span>
        </motion.div>
      </AnimatePresence>
    </div>;
};