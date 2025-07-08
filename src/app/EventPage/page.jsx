'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const TOTAL_IMAGES = 30;

const PicnicPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  const [currentPic, setCurrentPic] = useState(0);
  const [isConfetti, setConfetti] = useState(true);
  const { width, height } = useWindowSize();

  const pics = Array.from({ length: TOTAL_IMAGES }, (_, i) => `/images/2024/Picnic/${i + 1}.jpg`);

  useEffect(() => {
    const update = () => {
      const eventDate = new Date('July 27, 2025 12:00:00').getTime();
      const now = Date.now();
      const d = eventDate - now;
      setTimeLeft({
        days: String(Math.floor(d / 86400000)).padStart(2, '0'),
        hours: String(Math.floor((d % 86400000) / 3600000)).padStart(2, '0'),
        minutes: String(Math.floor((d % 3600000) / 60000)).padStart(2, '0'),
        seconds: String(Math.floor((d % 60000) / 1000)).padStart(2, '0'),
      });
    };
    update();
    const i1 = setInterval(update, 1000);
    const i2 = setInterval(() => setCurrentPic((p) => (p + 1) % TOTAL_IMAGES), 5000);
    return () => {
      clearInterval(i1);
      clearInterval(i2);
    };
  }, []);

  return (
    <>
      {isConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
          onConfettiComplete={() => setConfetti(false)}
        />
      )}

      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-100 via-green-100 to-yellow-50 pt-6 pb-15 overflow-hidden">
        {['🪁', '🍉', '🌼', '🧃', '🐝', '🐞', '🪁'].map((e, i) => (
          <div
            key={i}
            className={`absolute ${[
              'top-10 left-8',
              'top-20 right-12',
              'bottom-16 left-12',
              'bottom-10 right-16',
              'top-1/2 left-1/3',
              'bottom-1/3 right-1/4',
              'top-32 left-1/2',
            ][i]} text-3xl animate-float${i % 2 === 0 ? '' : '-reverse'}`}
          >
            {e}
          </div>
        ))}

        <div className="max-w-3xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-pink-600 drop-shadow-lg mb-4"
          >
            LINS Summer BBQ Picnic & Health Camp
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-800 mb-6"
          >
            July 27th • 12 PM–8 PM • Cantiague Park (Field A2, near Parking Field 2)
          </motion.p>

          <Link
            href="https://www.evite.com/event/0034CHBF65YBFUNS6EPQBHI5UOCC4I?utm_campaign=send_sharable_link&utm_source=evitelink&utm_medium=sharable_invite"
            target="_blank"
          >
            <button className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-400 via-yellow-300 to-green-400 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition transform hover:scale-105 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-45 w-1/2 h-full translate-x-[-100%] group-hover:translate-x-[300%]" />
              <span className="relative z-10">RSVP on Evite</span>
            </button>
          </Link>

          <div className="mt-4 inline-flex items-center text-pink-600 text-sm animate-bounce">
            <span className="mr-1">👇</span>
            <span>Scroll for details & countdown</span>
            <span className="ml-1">👇</span>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="py-6 bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-pink-700 mb-4 flex justify-center items-center gap-2">
            ⏳ Countdown to Picnic & Health Camp
          </h2>
          <div className="mb-4 text-md text-gray-700 flex justify-center items-center gap-3">
            📍 <strong>Cantiague Park</strong> | 🗓️ <strong>July 27</strong> | 🕛 <strong>12:00 PM – 8:00 PM</strong>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            {['days', 'hours', 'minutes', 'seconds'].map((u, i) => (
              <div
                key={i}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-lg border-4 border-pink-300 flex flex-col justify-center items-center animate-pulse-slow"
              >
                <span className="text-3xl md:text-4xl font-bold text-pink-600">{timeLeft[u]}</span>
                <span className="text-xs uppercase text-gray-500">{u}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="py-6 bg-gradient-to-br from-yellow-50 to-green-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-pink-700 mb-6">📸 Picnic & Health Camp Highlights</h2>
          <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-pink-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPic}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <Image
                  src={pics[currentPic]}
                  alt={`Picnic Image ${currentPic + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                  <h3 className="text-white text-lg md:text-xl font-semibold tracking-wide">
                    {currentPic != 15 ? '🌿 Picnic Moments' : '🩺 Health Camp Snapshots'}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => setCurrentPic((currentPic - 1 + TOTAL_IMAGES) % TOTAL_IMAGES)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
            >
              ◀
            </button>
            <button
              onClick={() => setCurrentPic((currentPic + 1) % TOTAL_IMAGES)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
            >
              ▶
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Image {currentPic + 1} of {TOTAL_IMAGES}
          </div>
        </div>
      </div>

      {/* Coordinators */}
      <div className="py-16 bg-gradient-to-br from-yellow-100 via-pink-100 to-green-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Picnic Coordinators */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-4 border-yellow-300">
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">🌞 Picnic Coordinators</h3>
            <ul className="space-y-3">
              {[
                { name: 'Ram K Rai (Coordinator)', phone: '516‑800‑5478' },
                { name: 'Gokul Sapkota', phone: '347‑523‑3377' },
                { name: 'Deepak Adhikari', phone: '856‑776‑8105' },
                { name: 'Sujan Regmi', phone: '347‑421‑7874' },
                { name: 'Ravi Khadka', phone: '516‑800‑3089' },
                { name: 'Raj Tamang', phone: '516‑288‑0210' },
                { name: 'Namita Paudel', phone: '516‑260‑8529' },
                { name: 'Gyanu Chand', phone: '631‑885‑3429' },
                { name: 'Bikash Mainali', phone: '516‑849‑2171' },
              ].map((c, i) => (
                <li key={i} className="flex items-center text-gray-800">
                  <span className="mr-2 text-yellow-500">📞</span>
                  <span>
                    {c.name}: <strong>{c.phone}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Health Camp Coordinators */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-4 border-pink-300">
            <h3 className="text-2xl font-bold text-pink-600 mb-4">🏥 Health Camp (NANA)</h3>
            <ul className="space-y-3">
              {[
                { name: 'Dr. Yam Giri (Coordinator)', phone: '405‑922‑9845' },
                { name: 'NP Sabitra Siwakoti', phone: '516‑242‑6345' },
                { name: 'Dr. Samip Baral', phone: '561‑476‑9141' },
                { name: 'Dr. Bishal Tiwari', phone: '516‑605‑7570' },
                { name: 'NP Sunita Bhandari', phone: '718‑404‑7130' },
                { name: 'Dr. Sandesh Pokhrel', phone: '267‑994‑2031' },
                { name: 'BSN Ambika Phuyal', phone: '516‑450‑7659' },
                { name: 'Bimala Bhandari', phone: '917‑373‑0940' },
              ].map((c, i) => (
                <li key={i} className="flex items-center text-gray-800">
                  <span className="mr-2 text-pink-500">📞</span>
                  <span>
                    {c.name}: <strong>{c.phone}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="text-xl font-bold">Long Island Nepalese Society</p>
          <p>
            <a href="https://www.linsny.org" className="underline">
              linsny.org
            </a>{' '}
            |{' '}
            <a href="https://www.facebook.com/LongislandNepaleseSociety" className="underline ml-2">
              Facebook
            </a>
          </p>
          <p>
            Contact:{' '}
            <a href="mailto:longislandnepalese@gmail.com" className="underline">
              longislandnepalese@gmail.com
            </a>
          </p>
          <p>Phone: (718)‑974‑7252 (Rajan), (516)‑234‑1642 (Rajendra)</p>
          <p>&copy; {new Date().getFullYear()} Long Island Nepalese Society</p>
        </div>
      </footer>

      {/* Float animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 6s ease-in-out infinite;
        }
        .animate-bounce {
          animation: bounce 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default PicnicPage;
