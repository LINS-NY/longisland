'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const updateCountdown = () => {
      // Event date: April 12, 2025 5:00 PM EDT (New York time)
      const eventDate = new Date("2025-04-12T17:00:00-04:00").getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      setTimeLeft({
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))).toString().padStart(2, "0"),
        hours: Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toString().padStart(2, "0"),
        minutes: Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, "0"),
        seconds: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000)).toString().padStart(2, "0")
      });
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const countdownUnits = [
    { id: 'days', en: 'Days', ne: 'दिन' },
    { id: 'hours', en: 'Hours', ne: 'घण्टा' },
    { id: 'minutes', en: 'Minutes', ne: 'मिनेट' },
    { id: 'seconds', en: 'Seconds', ne: 'सेकेन्ड' }
  ];

  return (
    <div className="mt-8">
      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-white text-center mb-6"
      >
        <span className="block">Countdown to Nepali New Year 2082</span>
        <span className="block text-xl text-yellow-200 mt-2">नेपाली नयाँ वर्ष २०८२ को उत्सव</span>
      </motion.h3>
      
      <div className="flex justify-center gap-4 flex-wrap">
        {countdownUnits.map((unit) => (
          <motion.div
            key={unit.id}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white bg-opacity-20 rounded-xl p-4 min-w-[100px] backdrop-blur-sm border border-white border-opacity-30"
          >
            <div className="text-4xl md:text-5xl font-bold text-white text-center flash-animation-slow">
              {timeLeft[unit.id]}
            </div>
            <div className="text-center mt-2">
              <div className="text-yellow-200 uppercase text-sm">{unit.en}</div>
              <div className="text-yellow-100 text-xs">{unit.ne}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-white">
          Celebrating on <span className="font-bold">April 12, 2025</span> from <span className="font-bold">5:00 PM</span> till <span className="font-bold">11:45 PM</span>
        </p>
        <p className="text-yellow-200 mt-1">
          हाम्रो उत्सव: <span className="font-bold">अप्रिल १२, २०२५</span>, <span className="font-bold">बेलुका ५:००</span>
        </p>
      </motion.div>
    </div>
  );
}