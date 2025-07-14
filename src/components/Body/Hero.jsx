'use client'
import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

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
  {['🪁','🍉','🌼','🧃','🐝','🐞'].map((e,i) => (
  <div
    key={i}
    className={`absolute ${['top-10 left-8','top-20 right-12','bottom-16 left-12','bottom-10 right-16','top-1/2 left-1/3','bottom-1/3 right-1/4'][i]} text-3xl animate-float${i%2?-''+i:'-reverse delay-'+(i*200)}`}
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


{/* *************LINS Soccer Cup 2025 Banner*************** */}
    <section className="w-full bg-gradient-to-br from-green-900 via-green-700 to-green-800 py-20 px-6 md:px-16 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* LEFT COLUMN: Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">

          {/* Title + Animated Soccer Ball */}
          <div className="flex items-center justify-center md:justify-start gap-5">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] whitespace-nowrap">
  LINS Soccer Cup 2025
</h1>
            <div className="text-6xl animate-spin-slow select-none" aria-hidden="true">⚽</div>
          </div>

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


          {/* CTA Button */}
          <button
            aria-label="Contact Coordinators"
            className="mt-6 px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold rounded-full shadow-xl transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            onClick={() => alert('Call Dr. Yam Giri: (405) 922-9845')}
          >
            📞 Contact Coordinators
          </button>
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
              src="/images/2025/LINSScoccer/soccerFlyer.jpg"
              alt="LINS Soccer Cup 2025 Flyer"
              width={800}
              height={500}
              className="object-cover rounded-xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>

{/* *************LINS Soccer Cup 2025 Banner End*************** */}


            <section className="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-96 shadow-sm dark:bg-gray-900 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url('./Designer.jpeg')` }}>
                <div className="relative flex justify-between m-2 rounded-xl  h-full mx-auto backdrop-blur-md bg-white/60 dark:bg-slate-700/60">
                    <div className="flex flex-grow justify-center font-bold">
                        <div className="flex flex-col text-center mx-5 justify-center item-center">
                            <h1 className="sm:max-w-2xl mb-2 text-md tracking-tight leading-none text-blue-900  dark:text-white">
                                Long Island Nepalese Society
                            </h1>
                            <p className="mb-4 text-md tracking-tight leading-none text-blue-900  dark:text-white"> New York</p>
                            <p className=" mb-4 text-md tracking-tight leading-none text-blue-900  dark:text-white">
                                लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
                            </p>
                            <p className="max-w-2xl mb-4 text-sm fond-sm tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                                From Planning To Progress
                            </p>
                            
                            
                            <div className="flex  flex-wrap text-sm font-light item-center justify-center">
                            <Link href="/EventPage" >
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950   
                            shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">
                                        New Year 2082 Events
                                    </button> 
                                </Link>
                                 <Link href="/FinancialReport" >
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950   
                            shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">
                                        Financial Report
                                    </button> 
                                </Link>
                                <Link href="/News">
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700 dark:text-white 
                            dark:shadow-slate-950   shadow-lg rounded-lg p-2 text-white m-2 drop-shadow-2xl">LINS News</button>
                                </Link>
                                <Link href="/Forums">
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  
                            dark:shadow-slate-950 shadow-lg rounded-lg p-2 dark:text-white text-white m-2 
                            drop-shadow-2xl">Forum</button>
                                </Link>
                                <Link href="/GalleryYearSelection">
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700 dark:text-white 
                            dark:shadow-slate-950   shadow-lg rounded-lg p-2 text-white m-2 drop-shadow-2xl">Gallery</button>
                                </Link>
                                <Link href="/Bylaws">
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700 dark:text-white 
                            dark:shadow-slate-950   shadow-lg rounded-lg p-2 text-white m-2 drop-shadow-2xl">Bylaws</button>
                                </Link>
                                <Link href="/ByLawsProposed">
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700 dark:text-white 
                            dark:shadow-slate-950   shadow-lg rounded-lg p-2 text-white m-2 drop-shadow-2xl">Proposed Bylaws</button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  my-5 sm:my-10  w-5/6  h-96 shadow-sm dark:bg-gray-900 bg-gradient-to-r from-purple-500 to-red-500 dark:from-slate-500 dark:to-slate-900">
                <div className="relative flex justify-between m-2 sm:w-5/6 h-full mx-auto">
                    <div className="flex justify-center ">
                        <div className="flex flex-col sm:mx-15 mx-4 justify-center item-center">
                            <h1 className=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                                Long Island Nepalese Society, New York
                            </h1>
                            <p className="sm:max-w-2xl mb-4 text-md md:text-2xl sm:font-extrabold tracking-tight 
                    leading-none text-blue-900 xl:text-2xl dark:text-white">
                                लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
                            </p>
                            <p className="max-w-2xl mb-4 text-sm fond-sm tracking-tight leading-none text-white xl:text-xl font-bold">
                                From Planning To Progress
                            </p>
                            <div className="flex flex-wrap item-center justify-center max-[800px]:text-sm ">
                           {/*  <Link href="/EventPage" >
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950   
                            shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">
                                        New Year 2082 Events
                                    </button> 
                                </Link> */}
                                 <Link href="/EventPage" >
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950   
                            shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">
                                        LINS Picnic - July 27th
                                    </button> 
                                </Link>
                                <Link href="/FinancialReport">
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950   
                            shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">Financial Report</button>
                                </Link> 
                                <Link href="/News">
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950  
                             shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">LINS News</button>
                                </Link>
                                <Link href="/Forums">
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950   
                            shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">Forum</button>
                                </Link>
                                <Link href="/GalleryYearSelection">
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950  
                             shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">Gallery</button>
                                </Link>
                                <Link href="/Bylaws">
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950  
                             shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">Bylaws</button>
                                </Link>
                                <Link href="/ByLawsProposed">
                                    <button className="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950  
                             shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">Proposed Bylaws</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className=" hidden sm:flex sm:mx-5 justify-center">
                        <div className="flex flex-col justify-center">
                            <Image
                                src="/LINS.png"
                                width={200}
                                height={200}
                                alt="Lins logo"
                            />
                        </div>
                    </div>
                </div>
            </section>

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

        </div>
    )
}

export default Hero