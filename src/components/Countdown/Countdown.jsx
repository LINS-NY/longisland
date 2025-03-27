'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const updateCountdown = () => {
      const eventDate = new Date("April 13, 2025 17:00:00").getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, "0"),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0"),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0"),
        seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, "0")
      });
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 flex justify-center">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-red-600 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{timeLeft.days}</span>
          <span className="text-white text-sm">Days</span>
        </div>
        <div className="bg-red-600 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{timeLeft.hours}</span>
          <span className="text-white text-sm">Hours</span>
        </div>
        <div className="bg-red-600 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{timeLeft.minutes}</span>
          <span className="text-white text-sm">Minutes</span>
        </div>
        <div className="bg-red-600 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{timeLeft.seconds}</span>
          <span className="text-white text-sm">Seconds</span>
        </div>
      </div>
    </div>
  );
}