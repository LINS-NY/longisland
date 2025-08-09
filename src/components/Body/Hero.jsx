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
  {/* Floating picnic emojis */}
  {/*
  {['🪁', '🍉', '🌼', '🧃', '🐝', '🐞'].map((e, i) => (
    <div
      key={i}
      className={`absolute ${[
        'top-10 left-8',
        'top-20 right-12',
        'bottom-16 left-12',
        'bottom-10 right-16',
        'top-1/2 left-1/3',
        'bottom-1/3 right-1/4'
      ][i]} text-3xl animate-float${i % 2 ? -'' + i : '-reverse delay-' + i * 200}`}
    >
      {e}
    </div>
  ))}
  */}

  {/* Title */}
  {/*
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 drop-shadow-lg text-center mb-10 animate-fade-in-up">
    Long Island Nepalese Society
  </h1>
  */}

  {/* Button + CTA */}
  {/*
  <div className="flex flex-col items-center justify-center text-center px-4">
    <Link href="/EventPage">
      <button
        className={
          'relative text-xl sm:text-2xl md:text-3xl font-bold text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-pink-400 via-yellow-300 to-green-400 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white hover:border-yellow-200 group overflow-hidden animate-pulse'
        }
      >
        {/* Shining overlay effect */}
{/*         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-45 w-1/2 h-full translate-x-[-100%] group-hover:translate-x-[300%]"></div>

        <span className="relative z-10 flex items-center justify-center gap-2">
          <span className="text-yellow-200">🧺</span>
          <span className="text-shadow">
            Picnic Day – <span className="text-green-200">July 27th</span>
          </span>
          <span className="text-yellow-200">🌞</span>
        </span>
      </button>
    </Link>
 */}
    {/* Call to action */}
{/*     <div className="mt-4 inline-flex items-center text-pink-600 text-sm animate-bounce">
      <span className="mr-1">👆</span>
      <span>Click to see full picnic details</span>
      <span className="ml-1">👆</span>
    </div>
  </div>
  */}
  {/* Embedded animations */}
  {/*
  <style jsx>{`
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
      }
      50% {
        transform: scale(1.03);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
      }
    }
    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0) rotate(0deg);
      }
      50% {
        transform: translateY(-12px) translateX(8px) rotate(5deg);
      }
    }
    @keyframes float-reverse {
      0%, 100% {
        transform: translateY(0) translateX(0) rotate(0deg);
      }
      50% {
        transform: translateY(12px) translateX(-8px) rotate(-5deg);
      }
    }
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }
    @keyframes fade-in-up {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
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
  */}

      {/* *************Summer Picnic -- Till Here**************** */}


      {/* *************LINS Soccer Cup 2025 Banner*************** */}
      {/* <section className="w-full py-16 px-4 bg-white"> */}
{/*         <div className="max-w-5xl mx-auto bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white rounded-2xl shadow-2xl px-6 sm:px-12 py-10 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">


            {/* LEFT COLUMN: Content */}
{/*             <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">

              {/* Title + Animated Soccer Ball */}
{/*               <div className="flex items-center justify-center md:justify-start gap-5">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] whitespace-nowrap">
                  LINS Soccer Cup
                </h1>

              </div> */}
{/*               <div className="text-8xl animate-spin-slow select-none" aria-hidden="true">⚽</div>
              <h1 className="text-5xl sm:text-6xl font-extrabold text-white -400 glow-red">
                2025
              </h1> */}
              {/* Date + Time + Location */}
{/*               <div className="space-y-1">
                <p className="text-xl font-semibold flex items-center justify-center md:justify-start gap-2">
                  <span role="img" aria-label="calendar">📅</span> Saturday, August 9, 2025
                </p>
                <p className="text-lg font-medium flex items-center justify-center md:justify-start gap-2">
                  <span role="img" aria-label="clock">🕗</span> 8 AM – 6 PM
                </p>
                <p className="text-lg font-medium flex items-center justify-center md:justify-start gap-2">
                  <span role="img" aria-label="location pin">📍</span> Field 2, Cedar Creek Park, 3340 Merrick Rd, Seaford, NY
                </p>
              </div> */}

              {/* Registration Fee Card */}
{/*               <div className="bg-yellow-100/10 border border-yellow-400 rounded-xl px-8 py-6 shadow-lg backdrop-blur-md max-w-md w-full text-center">
                <h2 className="text-3xl font-extrabold text-yellow-300 mb-3 flex items-center justify-center gap-3">
                  <span className="icon-glow-pulse text-4xl">💸</span> Registration Fee
                </h2>
                <p className="text-4xl font-bold text-white">$650</p>
                <p className="text-sm text-yellow-100 mt-1">Deadline: August 3, 2025</p>
              </div> */}

              {/* Prizes Card */}
{/*               <div className="bg-yellow-100/10 border border-yellow-400 rounded-xl px-8 py-6 shadow-lg backdrop-blur-md max-w-md w-full text-center">
                <h2 className="text-3xl font-extrabold text-yellow-300 mb-3 flex items-center justify-center gap-3">
                  <span className="icon-glow-pulse text-4xl">🏆</span> Prizes
                </h2>
                <p className="text-3xl font-semibold">Winner: <span className="text-white">$3,000</span></p>
                <p className="text-3xl font-semibold">Runner-Up: <span className="text-white">$1,000</span></p>
              </div>
            </div> */} 

            {/* RIGHT COLUMN: Flyer + Coordinators */}
{/*             <div className="flex flex-col items-center md:items-end space-y-6">

              {/* Coordinators Info */}
{/*               <div className="text-center md:text-right text-yellow-300 font-semibold max-w-[300px]">
                <p className="mb-4 text-xl font-bold text-white">📞 Coordinators</p>
                <ul className="space-y-2 text-yellow-200 text-lg">
                  <li><strong>Dr. Yam Giri:</strong> (405) 922-9845</li>
                  <li><strong>Yog Raj:</strong> (571) 382-0403</li>
                  <li><strong>Ravi Khadka:</strong> (516) 800-3809</li>
                  <li><strong>Niraj Sapkota:</strong> (516) 717-7008</li>
                </ul>
              </div> */}

              {/* Flyer Image */}
{/*               <div className="rounded-xl border-4 border-yellow-300 shadow-2xl overflow-hidden max-w-full md:max-w-[90%] transition-transform duration-300 hover:scale-105">
                <Image
                  src="/images/2025/LINSSoccer/soccerFlyer.jpg"
                  alt="LINS Soccer Cup 2025 Flyer"
                  width={800}
                  height={500}
                  className="object-cover rounded-xl"
                  priority
                />
              </div> */}
{/*               <div className="flex justify-center mt-6">
                <button
                  aria-label="Contact Coordinators"
                  className="px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold rounded-full shadow-xl transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                  onClick={() => alert('Call Dr. Yam Giri: (405) 922-9845')}
                >
                  📞 Contact Coordinators
                </button>
              </div>
 */}

{/*             </div>
          </div>
        </div> */}

        {/* Animation Styles */}
        {/* Animation Styles */}
{/*         <style jsx>{`
  /* Slow spinning soccer ball */
  /* .animate-spin-slow {
    animation: spin 6s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
 */
  /* Glowing & pulsing 2025 animation */
/*   .animated-2025 {
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
`}</style> */}
     {/*  </section> */}

      {/* *************LINS Soccer Cup 2025 Banner End*************** */}




{/* *************Teej Banner Start*************** */}
<section className="w-full py-16 px-4 bg-white">
  <div className="max-w-5xl mx-auto bg-gradient-to-br from-red-700 via-pink-600 to-red-800 text-white rounded-2xl shadow-2xl px-6 sm:px-12 py-10 transition-all duration-300">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

      {/* LEFT COLUMN: Content */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">

        {/* Title + Nepali Dancing Lady Illustration */}
        <div className="flex flex-col items-center md:items-start gap-5">
          <h1 className="text-center text-3xl sm:text-5xl font-extrabold leading-snug"
    style={{
      color: '#7CFC00',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8), -2px -2px 0 #FFD700'
    }}>
  हरितालिका तीज 2025 को <br /><br /> हार्दिक शुभकामना
</h1>

          <div className="text-center">
  <h1 className="text-3xl sm:text-4xl font-extrabold text-white glow-gold leading-none mb-2">
    LINS - Teej Mahotsav
  </h1>
    <h1 className="text-3xl sm:text-4xl font-extrabold text-white glow-gold leading-none mb-2">
    2025
  </h1>


  <div className="w-32 h-32 mx-auto animate-bounce flex items-center justify-center overflow-hidden mb-2">
    <div className="text-6xl select-none leading-none" aria-hidden="true">💃</div>
  </div>

        

        {/* Date + Time + Location */}
        <div className="">
          <p className="text-xl font-semibold flex items-center justify-center md:justify-start gap-2">
            <span role="img" aria-label="calendar">📅</span> Sunday, August 24, 2025
          </p>
          <p className="text-lg font-medium flex items-center justify-center md:justify-start gap-2">
            <span role="img" aria-label="clock">🕗</span> 4 PM – 10 PM
          </p>
          <p className="text-lg font-medium flex items-center justify-center md:justify-start gap-2">
            <span role="img" aria-label="location pin">📍</span> 201 Levittown Pkwy, Hicksville, NY - 11801
          </p>
        </div></div></div>

{/* Flashy Free Entry */}
<div className="bg-pink-100/10 border border-yellow-400 rounded-xl px-6 py-6 shadow-lg backdrop-blur-md max-w-full w-full text-center overflow-hidden">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 mb-3 flex items-center justify-center gap-3">
    <span className="icon-glow-pulse text-3xl sm:text-4xl">🎟</span> Entry Ticket
  </h2>
  <span
    className="whitespace-nowrap text-2xl sm:text-4xl font-extrabold text-white px-3 py-1 rounded-lg animate-pulse shadow-[0_0_10px_rgba(0,0,0,0.7)] inline-block"
    style={{
      background: "linear-gradient(90deg, #ff0000, #ffcc00, #00cc00)",
      border: "3px solid white",
      textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
    }}
  >
    🎉 FREE ENTRY 🎉
  </span>
  <p className="text-xs sm:text-sm text-yellow-100 mt-1">All are welcome!</p>
</div>




        {/* Special Program Highlights */}
        <div className="bg-pink-100/10 border border-yellow-400 rounded-xl px-8 py-6 shadow-lg backdrop-blur-md max-w-md w-full text-center">
          <h2 className="text-3xl font-extrabold text-yellow-300 mb-3 flex items-center justify-center gap-3">
            <span className="icon-glow-pulse text-4xl">🌺</span> Highlights
          </h2>
          <p className="text-lg font-semibold">🎤 Live Teej Songs &amp; DJ</p>
          <p className="text-lg font-semibold">💃 Group Dance Performances</p>
          <p className="text-lg font-semibold">🍛 Delicious Nepali Food</p>
        </div>
      </div>

      {/* RIGHT COLUMN: Full Dancing Lady Image + Coordinators */}
      <div className="flex flex-col items-center md:items-end space-y-6">

{/* Coordinators Info */}
<div className="text-center md:text-right text-yellow-300 font-semibold max-w-[300px]">
  <p className="mb-4 text-xl font-bold text-white">📞 Coordinators</p>
  <ul className="space-y-2 text-lg">
    <li>
      <span className="text-yellow-300 font-bold">Sabitra Siwakoti:</span>{' '}
      <a href="tel:5162426345" className="text-green-400 hover:underline">(516) 242-6345</a>
    </li>
    <li>
      <span className="text-yellow-300 font-bold">Indira Simkhada:</span>{' '}
      <a href="tel:5167245057" className="text-green-400 hover:underline">(516) 724-5057</a>
    </li>
    <li>
      <span className="text-yellow-300 font-bold">Namita Paudel:</span>{' '}
      <a href="tel:5162608529" className="text-green-400 hover:underline">(516) 260-8529</a>
    </li>
    <li>
      <span className="text-yellow-300 font-bold">Gyanu Chand:</span>{' '}
      <a href="tel:6318853429" className="text-green-400 hover:underline">(631) 885-3429</a>
    </li>
    <li>
      <span className="text-yellow-300 font-bold">Ambika Phuyal:</span>{' '}
      <a href="tel:5164507659" className="text-green-400 hover:underline">(516) 450-7659</a>
    </li>
    <li>
      <span className="text-yellow-300 font-bold">Bimala Bhandari:</span>{' '}
      <a href="tel:9173730940" className="text-green-400 hover:underline">(917) 373-0940</a>
    </li>
  </ul>

  {/* Contact Button */}
  <div className="flex justify-center mt-6">
    <button
      aria-label="Contact Coordinators"
      className="px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold rounded-full shadow-xl transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
       onClick={() => window.location.href = 'tel:+15162426345'}
    >
      📞 Contact Coordinators
    </button>
  </div>
</div>


        {/* Full Dancing Lady Illustration */}
        <div className="rounded-xl border-4 border-yellow-300 shadow-2xl overflow-hidden max-w-full md:max-w-[90%] transition-transform duration-300 hover:scale-105">
          <Image
                          src="/images/2025/Teej/Teejflyer.jpeg"

            alt="Nepali Dancing Lady - Teej 2025"
            width={800}
            height={500}
            className="object-cover rounded-xl"
            priority
          />
        </div>

      </div>
    </div>
  </div>

  {/* Animation Styles */}
  <style jsx>{`
    .animate-bounce {
      animation: bounce 2s infinite;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    .glow-gold {
      text-shadow:
        0 0 8px #ffd700,
        0 0 12px #ffcc33,
        0 0 20px #ffaa00;
    }
    .icon-glow-pulse {
      animation: pulseGlow 2s infinite;
    }
    @keyframes pulseGlow {
      0%, 100% { text-shadow: 0 0 10px gold; }
      50% { text-shadow: 0 0 20px orange; }
    }
    .flashy-text {
      animation: flashyGlow 1.5s infinite;
    }
    @keyframes flashyGlow {
      0%, 100% {
        text-shadow: 0 0 8px #00ff00, 0 0 12px #00ff99, 0 0 20px #00ffcc;
        transform: scale(1);
      }
      50% {
        text-shadow: 0 0 15px #00ff66, 0 0 25px #00ffcc, 0 0 35px #00ffff;
        transform: scale(1.1);
      }
    }
  `}</style>
</section>


{/* *************Teej Banner End*************** */}




      {/* *************Screen Icons/Buttons**************** */}
      <section
        className="relative container mx-auto my-6 w-[90%] rounded-[2rem] overflow-hidden shadow-2xl bg-cover bg-center"
        style={{
          backgroundImage: "url('/nepal-mountain-bg.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col w-full h-full px-6 py-8 text-white">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6 mb-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg hover:scale-105 transition-transform">
                <Image
                  src="/LINS.png"
                  width={60}
                  height={60}
                  alt="LINS Logo"
                  className="rounded-full"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white drop-shadow-xl">
                  Long Island Nepalese Society
                </h1>
                <p className="text-gray-300 font-medium text-sm sm:text-base">
                  New York | लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
                </p>
                <p className="italic text-cyan-300 text-sm">From Planning To Progress</p>
              </div>
            </div>
          </div>

          {/* Icons Grid - Responsive 2 Rows */}
          <div className="grid grid-cols-3 gap-4 w-full">
            {[
              { href: "/EventPage", label: "Events", icon: <FaCalendarAlt />, color: "from-red-500 to-orange-400" },
              { href: "/FinancialReports", label: "Finance", icon: <FaFileInvoice />, color: "from-green-500 to-emerald-400" },
              { href: "/News", label: "News", icon: <FaNewspaper />, color: "from-yellow-400 to-amber-300" },
              { href: "/Forums", label: "Forum", icon: <FaComments />, color: "from-blue-500 to-cyan-400" },
              { href: "/Gallery", label: "Gallery", icon: <FaImages />, color: "from-violet-500 to-indigo-400" },
              { href: "/Bylaws", label: "Bylaws", icon: <FaBalanceScale />, color: "from-pink-500 to-rose-400" },
              // { href: "/CommunityBuilding", label: "Community Building", icon: <span className="text-lg">🏛️</span>, color: "from-purple-600 to-pink-500" },
            ].map(({ href, label, icon, color }, index) => (
              <Link href={href} key={index}>
                <div
                  className={`flex flex-col items-center justify-center w-full h-24 rounded-xl px-2 py-2 text-white bg-gradient-to-br ${color} shadow-md border border-white/20 hover:scale-105 transition-transform duration-300`}
                >
                  <div className="text-lg mb-1">{icon}</div>
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/*******Till Here*********/}

      {/* Community Building Highlight Card */}
      <div className="container mx-auto w-[90%] my-10">
        <Link href="/CommunityBuilding">
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer h-[24rem] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/community-building/banner.jpg')" }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85 backdrop-blur-md"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-8 text-white text-center h-full">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/30 shadow-md">
                <Image
                  src="/images/community-building/icon.png"
                  width={120}
                  height={120}
                  alt="Community Icon"
                  className="rounded-full border-4 border-white"
                />
              </div>
              <h2 className="text-2xl sm:text-5xl font-extrabold mt-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-lg">
                Help Build Our Future: LINS-NY Community Center
              </h2>

              <p className="text-gray-200 text-sm sm:text-base mt-3 max-w-2xl drop-shadow-sm">
                Join our mission to create the first-ever Nepalese community building in Long Island. Powered by love, unity, and purpose.
              </p>
            </div>
          </div>
        </Link>
      </div>
      {/*******Till Here*********/}

      {/* President's & Gen. Sec Message Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto w-[90%] my-12">
        {/* President's Message */}
        <Link href="/PresidentialMessages">
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer h-[22rem] bg-cover bg-center"
            style={{ backgroundImage: "url('/nepal-mountain-bg.jpg')" }}
          >
            {/* Darker Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85 backdrop-blur-md"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-white text-center h-full">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/30 shadow-md">
                <Image
                  src="/RajanGouli.jpg"
                  width={110}
                  height={110}
                  alt="Rajan Gouli"
                  className="rounded-full border-4 border-white"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold mt-4 drop-shadow-md">
                President's Message
              </h2>
              <p className="text-gray-200 text-sm mt-2 max-w-sm drop-shadow-sm">
                Dear Valuable and Respected Members of the Long-Island Nepalese Society New York...
              </p>
            </div>
          </div>
        </Link>

        {/* General Secretary's Message */}
        <Link href="/GeneralSecretaryMessages">
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer h-[22rem] bg-cover bg-center"
            style={{ backgroundImage: "url('/nepal-mountain-bg.jpg')" }}
          >
            {/* Darker Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85 backdrop-blur-md"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-white text-center h-full">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/30 shadow-md">
                <Image
                  src="/RajendraKarki.jpg"
                  width={110}
                  height={110}
                  alt="Rajendra Karki"
                  className="rounded-full border-4 border-white"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold mt-4 drop-shadow-md">
                Gen. Sec's Message
              </h2>
              <p className="text-gray-200 text-sm mt-2 max-w-sm drop-shadow-sm">
                Dear Valuable and Respected Members of the Long-Island Nepalese Society New York...
              </p>
            </div>
          </div>
        </Link>
      </div>




    </div>
  )
}

export default Hero