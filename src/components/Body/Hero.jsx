'use client'
import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import {
  FaCalendarAlt,
  FaFileInvoice,
  FaNewspaper,
  FaComments,
  FaImages,
  FaBalanceScale,
} from 'react-icons/fa';

const Hero = () => {
  return (
    <div>

      {/* ******Below is for New Year Event***********          */}

      {/* New Year 2082 Banner - Added at the top */}
      {/* <div className="w-full relative overflow-hidden bg-gradient-to-b from-red-800 to-yellow-600 py-6 text-center"> */}
      {/* Decorative elements */}
      {/* <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"> */}
      {/* <div className="absolute top-1/4 left-1/4 text-3xl opacity-20 animate-float">🎩</div> */}
      {/* <div className="absolute top-1/3 right-1/4 text-3xl opacity-20 animate-float-reverse">🔪</div> */}
      {/* </div> */}

      {/* Main button container */}
      {/* <div className="relative z-10 pb-8"> Added pb-8 for spacing */}
      {/* <Link href="/EventPage"> */}
      {/* <button className="relative text-xl sm:text-2xl md:text-3xl font-bold text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-red-700 via-yellow-500 to-red-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-yellow-300 hover:border-white group overflow-hidden animate-pulse"> */}

      {/* Shining overlay effect */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-45 w-1/2 h-full translate-x-[-100%] group-hover:translate-x-[300%]"></div> */}

      {/* <span className="relative z-10 flex items-center justify-center gap-2"> */}
      {/* <span className="text-yellow-300">🎉</span> */}
      {/* <span className="text-shadow"> */}
      {/* नयाँ वर्ष २०८२ को शुभकामना | <span className="text-yellow-200">New Year 2082 Celebration</span> */}
      {/* </span> */}
      {/* {/* <span className="text-yellow-300">🎉</span> */}
      {/* </span> */}
      {/* </button> */}
      {/* </Link> */}

      {/* Click prompt - now positioned relative to button container */}
      {/* <div className="absolute bottom-0 left-0 right-0 text-center mt-2"> */}
      {/* <div className="inline-flex items-center text-yellow-200 text-sm animate-bounce"> */}
      {/* <span className="mr-1">👆</span> */}
      {/* <span>Click for more information</span> */}
      {/* <span className="ml-1">👆</span> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}

      {/* Embedded animations */}
      {/*  <style jsx>{`
    @keyframes pulse {
      0%, 100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3); }
      50% { transform: scale(1.03); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
      50% { transform: translateY(-15px) translateX(10px) rotate(5deg); }
    }
    @keyframes float-reverse {
      0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
      50% { transform: translateY(15px) translateX(-10px) rotate(-5deg); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    .animate-pulse {
      animation: pulse 2s ease-in-out infinite;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-float-reverse {
      animation: float-reverse 7s ease-in-out infinite;
    }
    .animate-bounce {
      animation: bounce 1.5s ease-in-out infinite;
    }
    .text-shadow {
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  `}</style> */}
      {/* </div> */}
      {/* *************Till Here**************** */}

      {/* *************Below is for Picnic Event**************** */}
      {/* Main picnic button container */}
      <div className="relative z-10 pb-12 pt-16 bg-gradient-to-b from-blue-100 via-green-100 to-yellow-50 overflow-hidden">
        {/* Floating picnic emojis */}
        {['🪁', '🍉', '🌼', '🧃', '🐝', '🐞'].map((e, i) => (
          <div
            key={i}
            className={`absolute ${['top-10 left-8', 'top-20 right-12', 'bottom-16 left-12', 'bottom-10 right-16', 'top-1/2 left-1/3', 'bottom-1/3 right-1/4'][i]} text-3xl animate-float${i % 2 ? -'' + i : '-reverse delay-' + (i * 200)}`}
          >{e}</div>
        ))}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 drop-shadow-lg text-center mb-10 animate-fade-in-up">
          Long Island Nepalese Society
        </h1>

        {/* Button + CTA */}
        <div className="flex flex-col items-center justify-center text-center px-4">
          <Link href="/EventPage">
            <button className={'relative text-xl sm:text-2xl md:text-3xl font-bold text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-pink-400 via-yellow-300 to-green-400 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white hover:border-yellow-200 group overflow-hidden animate-pulse'}>
              {/* Shining overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-45 w-1/2 h-full translate-x-[-100%] group-hover:translate-x-[300%]"></div>

              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-yellow-200">🧺</span>
                <span className="text-shadow">Picnic Day – <span className="text-green-200">July 27th</span></span>
                <span className="text-yellow-200">🌞</span>
              </span>
            </button>
          </Link>

          {/* Call to action */}
          <div className="mt-4 inline-flex items-center text-pink-600 text-sm animate-bounce">
            <span className="mr-1">👆</span>
            <span>Click to see full picnic details</span>
            <span className="ml-1">👆</span>
          </div>
        </div>

        {/* Embedded animations */}
        <style jsx>{`
    @keyframes pulse {
      0%, 100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3); }
      50% { transform: scale(1.03); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
      50% { transform: translateY(-12px) translateX(8px) rotate(5deg); }
    }
    @keyframes float-reverse {
      0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
      50% { transform: translateY(12px) translateX(-8px) rotate(-5deg); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    @keyframes fade-in-up {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-pulse {
      animation: pulse 2s ease-in-out infinite;
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
    .animate-fade-in-up {
      animation: fade-in-up 1.2s ease-out forwards;
    }
    .text-shadow {
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    }
    .delay-200 { animation-delay: 0.2s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-600 { animation-delay: 0.6s; }
    .delay-800 { animation-delay: 0.8s; }
    .delay-[1s] { animation-delay: 1s; }
  `}</style>
      </div>
      {/* *************Till Here**************** */}

      {/* *************Small Screen**************** */}
      <section
        className="sm:hidden relative container mx-auto my-6 w-11/12 h-auto rounded-3xl overflow-hidden shadow-2xl"
        style={{ backgroundImage: "url('./Designer.jpeg')" }}
      >
        {/* Glassy overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 backdrop-blur-xl"></div>

        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center text-center text-white px-5 py-10 space-y-6">
          {/* Hero Text */}
          <div className="space-y-1 drop-shadow-sm">
            <h1 className="text-3xl font-extrabold leading-snug tracking-tight">
              Long Island <br /> Nepalese Society
            </h1>
            <p className="text-sm text-gray-300">New York</p>
            <p className="text-sm text-gray-300 font-medium">
              लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
            </p>
            <p className="text-xs italic text-blue-200">From Planning To Progress</p>
          </div>

          {/* Gradient Buttons with Icons */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs text-sm font-medium">
            <Link href="/EventPage">
              <div className="flex items-center justify-center space-x-2 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl py-4 px-3 shadow-lg hover:scale-105 transition-all duration-300">
                <FaCalendarAlt />
                <span>Events</span>
              </div>
            </Link>
            <Link href="/FinancialReport">
              <div className="flex items-center justify-center space-x-2 bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-xl py-4 px-3 shadow-lg hover:scale-105 transition-all duration-300">
                <FaFileInvoice />
                <span>Finance</span>
              </div>
            </Link>
            <Link href="/News">
              <div className="flex items-center justify-center space-x-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl py-4 px-3 shadow-lg hover:scale-105 transition-all duration-300">
                <FaNewspaper />
                <span>News</span>
              </div>
            </Link>
            <Link href="/Forums">
              <div className="flex items-center justify-center space-x-2 bg-gradient-to-br from-green-400 to-teal-500 text-white rounded-xl py-4 px-3 shadow-lg hover:scale-105 transition-all duration-300">
                <FaComments />
                <span>Forum</span>
              </div>
            </Link>
            <Link href="/GalleryYearSelection">
              <div className="flex items-center justify-center space-x-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl py-4 px-3 shadow-lg hover:scale-105 transition-all duration-300">
                <FaImages />
                <span>Gallery</span>
              </div>
            </Link>
            <Link href="/Bylaws">
              <div className="flex items-center justify-center space-x-2 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-xl py-4 px-3 shadow-lg hover:scale-105 transition-all duration-300">
                <FaBalanceScale />
                <span>Bylaws</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* *************Big Screen**************** */}
<div className="px-20 rounded-3xl shadow-lg overflow-hidden bg-gray-50">
  <section className="hidden sm:flex justify-center py-12 bg-gradient-to-r from-[#dc143c] to-[#003893] relative rounded-3xl">
    {/* Nepali flag triangle on left */}
    <div
      className="absolute left-0 top-0 bottom-0 w-20 bg-[#dc143c] clip-triangle"
      aria-hidden="true"
    ></div>

    {/* Main hero container */}
    <div className="relative z-10 bg-white rounded-2xl shadow-xl w-4/6 p-8 flex items-center gap-8">
      {/* Left - text & buttons */}
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-center gap-4">
          {/* Logo container, smaller size */}
          <div className="bg-[#003893] rounded-full p-1 shadow-lg flex-shrink-0">
            <Image
              src="/LINS.png"
              alt="LINS Logo"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#003893]">
              Long Island Nepalese Society
            </h1>
            <p className="text-lg text-gray-700">
              लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
            </p>
            <p className="italic text-sm text-[#dc143c] font-semibold">
              From Planning to Progress
            </p>
          </div>
        </div>

        {/* Buttons grid */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { href: '/EventPage', label: 'Events', icon: <FaCalendarAlt /> },
            { href: '/FinancialReport', label: 'Finance', icon: <FaFileInvoice /> },
            { href: '/News', label: 'News', icon: <FaNewspaper /> },
            { href: '/Forums', label: 'Forum', icon: <FaComments /> },
            { href: '/GalleryYearSelection', label: 'Gallery', icon: <FaImages /> },
            { href: '/Bylaws', label: 'Bylaws', icon: <FaBalanceScale /> },
          ].map(({ href, label, icon }, idx) => (
            <Link
              key={idx}
              href={href}
              className="flex flex-col items-center justify-center gap-1 py-3 rounded-lg text-white font-semibold shadow-md bg-gradient-to-br from-[#dc143c] to-[#003893] hover:from-[#b112a] hover:to-[#002a70] transition-transform transform hover:scale-105"
            >
              <div className="text-2xl">{icon}</div>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>

    {/* Custom CSS for triangle clipping */}
    <style jsx>{`
      .clip-triangle {
        clip-path: polygon(0 0, 100% 50%, 0 100%);
      }
    `}</style>
  </section>
</div>







      {/* President's Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto my-10 w-5/6">
        {/* President's Message */}
        <Link href="/PresidentialMessages">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="p-6">
              <div className="flex justify-center">
                <Image
                  src="/RajanGouli.jpg"
                  width={120}
                  height={120}
                  alt="Rajan Gouli"
                  className="rounded-full"
                />
              </div>
              <h1 className="text-2xl font-bold text-blue-900 dark:text-white text-center mt-4">
                President's Message
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center mt-2">
                Dear Valuable and Respected Members of the Long-island Nepalese Society New York...
              </p>
            </div>
          </div>
        </Link>


        {/* Gen. Secretary's Message */}
        <Link href="/GeneralSecretaryMessages">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="p-6 text-center">
              <div className="flex justify-center">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-2 shadow-lg">
                  <Image
                    src="/RajendraKarki.jpg"
                    width={120}
                    height={120}
                    alt="Rajendra Karki"
                    className="rounded-full border-4 border-white dark:border-gray-800"
                  />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-blue-900 dark:text-white text-center mt-4">
                Gen. Sec's Message
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                Dear Valuable and Respected Members of the Long-island Nepalese Society New York...
              </p>
            </div>
          </div>
        </Link>

      </div>

      {/* *************LINS Soccer Cup 2025 Banner*************** */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white rounded-2xl shadow-2xl px-6 sm:px-12 py-10 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">


            {/* LEFT COLUMN: Content */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">

              {/* Title + Animated Soccer Ball */}
              <div className="flex items-center justify-center md:justify-start gap-5">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] whitespace-nowrap">
                  LINS Soccer Cup
                </h1>

              </div>
              <div className="text-8xl animate-spin-slow select-none" aria-hidden="true">⚽</div>
              <h1 className="text-5xl sm:text-6xl font-extrabold text-white -400 glow-red">
                2025
              </h1>
              {/* Date + Time + Location */}
              <div className="space-y-1">
                <p className="text-xl font-semibold flex items-center justify-center md:justify-start gap-2">
                  <span role="img" aria-label="calendar">📅</span> Saturday, August 9, 2025
                </p>
                <p className="text-lg font-medium flex items-center justify-center md:justify-start gap-2">
                  <span role="img" aria-label="clock">🕗</span> 8 AM – 6 PM
                </p>
                <p className="text-lg font-medium flex items-center justify-center md:justify-start gap-2">
                  <span role="img" aria-label="location pin">📍</span> Field 2, Cedar Creek Park, 3340 Merrick Rd, Seaford, NY
                </p>
              </div>

              {/* Registration Fee Card */}
              <div className="bg-yellow-100/10 border border-yellow-400 rounded-xl px-8 py-6 shadow-lg backdrop-blur-md max-w-md w-full text-center">
                <h2 className="text-3xl font-extrabold text-yellow-300 mb-3 flex items-center justify-center gap-3">
                  <span className="icon-glow-pulse text-4xl">💸</span> Registration Fee
                </h2>
                <p className="text-4xl font-bold text-white">$650</p>
                <p className="text-sm text-yellow-100 mt-1">Deadline: August 3, 2025</p>
              </div>

              {/* Prizes Card */}
              <div className="bg-yellow-100/10 border border-yellow-400 rounded-xl px-8 py-6 shadow-lg backdrop-blur-md max-w-md w-full text-center">
                <h2 className="text-3xl font-extrabold text-yellow-300 mb-3 flex items-center justify-center gap-3">
                  <span className="icon-glow-pulse text-4xl">🏆</span> Prizes
                </h2>
                <p className="text-3xl font-semibold">Winner: <span className="text-white">$3,000</span></p>
                <p className="text-3xl font-semibold">Runner-Up: <span className="text-white">$1,000</span></p>
              </div>
            </div>

            {/* RIGHT COLUMN: Flyer + Coordinators */}
            <div className="flex flex-col items-center md:items-end space-y-6">

              {/* Coordinators Info */}
              <div className="text-center md:text-right text-yellow-300 font-semibold max-w-[300px]">
                <p className="mb-4 text-xl font-bold text-white">📞 Coordinators</p>
                <ul className="space-y-2 text-yellow-200 text-lg">
                  <li><strong>Dr. Yam Giri:</strong> (405) 922-9845</li>
                  <li><strong>Yog Raj:</strong> (571) 382-0403</li>
                  <li><strong>Ravi Khadka:</strong> (516) 800-3809</li>
                  <li><strong>Niraj Sapkota:</strong> (516) 717-7008</li>
                </ul>
              </div>

              {/* Flyer Image */}
              <div className="rounded-xl border-4 border-yellow-300 shadow-2xl overflow-hidden max-w-full md:max-w-[90%] transition-transform duration-300 hover:scale-105">
                <Image
                  src="/images/2025/LINSSoccer/soccerFlyer.jpg"
                  alt="LINS Soccer Cup 2025 Flyer"
                  width={800}
                  height={500}
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
              <div className="flex justify-center mt-6">
                <button
                  aria-label="Contact Coordinators"
                  className="px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold rounded-full shadow-xl transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                  onClick={() => alert('Call Dr. Yam Giri: (405) 922-9845')}
                >
                  📞 Contact Coordinators
                </button>
              </div>


            </div>
          </div>
        </div>

        {/* Animation Styles */}
        {/* Animation Styles */}
        <style jsx>{`
  /* Slow spinning soccer ball */
  .animate-spin-slow {
    animation: spin 6s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Glowing & pulsing 2025 animation */
  .animated-2025 {
    animation: boomGlow 2.5s ease-in-out infinite;
    text-shadow:
      0 0 8px #ffffff,
      0 0 12px #22c55e,
      0 0 20px #22c55e,
      0 0 30px #16a34a;
  }

  .glow-red {
    text-shadow:
      0 0 8px #ff0000,
      0 0 12px #ff4d4d,
      0 0 20px #ff1a1a;
  }

  @keyframes boomGlow {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.9;
    }
  }
`}</style>

      </section>

      {/* *************LINS Soccer Cup 2025 Banner End*************** */}

    </div>
  )
}

export default Hero