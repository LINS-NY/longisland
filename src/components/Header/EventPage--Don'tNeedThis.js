import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Header from './Header';
import { useEffect, useState } from 'react'; // Add this import

const EventPage = () => {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  // Countdown effect
  useEffect(() => {
    const updateCountdown = () => {
      const eventDate = new Date("April 13, 2024 17:00:00").getTime();
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
    <>
      <Head>
        <title>Nepali New Year 2082 Celebration | Long Island Nepali Society</title>
        <meta name="description" content="Join us for the grand celebration of Nepali New Year 2082 with cultural programs, food, and festivities!" />
      </Head>
      
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-red-600 to-yellow-500 py-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/NewYear2082Flyer.jpg')] bg-repeat opacity-50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              <span className="block">Nepali New Year</span>
              <span className="block text-5xl md:text-7xl text-yellow-300">2082 B.S.</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-white font-semibold">
              ग्रेटर न्युयोर्क नेपाली समुदायको साझा उत्सव
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-30">
          <Image src="/NewYear2082Flyer.jpg" width={128} height={128} alt="Mandala decoration" />
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-30 rotate-180">
          <Image src="/NewYear2082Flyer.jpg" width={128} height={128} alt="Mandala decoration" />
        </div>
      </div>
      
      {/* Event Details Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            {/* Event Flyer */}
            <div className="mb-8 lg:mb-0">
              <div className="rounded-lg shadow-xl overflow-hidden transform rotate-1 hover:rotate-0 transition duration-500">
                <Image 
                  src="/nepali-new-year-flyer.jpg" 
                  width={800} 
                  height={1000} 
                  alt="Nepali New Year 2082 Event Flyer"
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Event Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-900">
                <span className="block text-red-600">Celebrate With Us!</span>
                <span className="block">नयाँ वर्ष २०८२ को शुभकामना</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium text-gray-900">Saturday, April 13, 2024</p>
                    <p className="text-gray-600">5:00 PM onwards</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium text-gray-900">Hicksville Community Center</p>
                    <p className="text-gray-600">28 West Carl Street, Hicksville, NY 11801</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium text-gray-900">For more information</p>
                    <p className="text-gray-600">longislandnepalese@gmail.com</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Event Highlights:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Traditional Nepali cultural performances
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Live music and DJ entertainment
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Authentic Nepali cuisine
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Kids activities and games
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Raffle prizes and giveaways
                  </li>
                </ul>
              </div>
              
              <div className="pt-6">
                <a 
                  href="https://forms.gle/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition duration-300 transform hover:scale-105"
                >
                  Register Now
                  <svg className="ml-3 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Countdown Section */}
      <div className="bg-gray-900 py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
      <span className="block">Countdown to New Year 2082</span>
    </h2>
    <CountdownTimer />
          <div className="mt-8 flex justify-center">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-red-600 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white" id="days">00</span>
                <span className="text-white text-sm">Days</span>
              </div>
              <div className="bg-red-600 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white" id="hours">00</span>
                <span className="text-white text-sm">Hours</span>
              </div>
              <div className="bg-red-600 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white" id="minutes">00</span>
                <span className="text-white text-sm">Minutes</span>
              </div>
              <div className="bg-red-600 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white" id="seconds">00</span>
                <span className="text-white text-sm">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gallery Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            <span className="block text-red-600">Memories from Past Events</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <Image 
                  src={`/event-gallery-${item}.jpg`} 
                  width={400} 
                  height={300} 
                  alt={`Past event photo ${item}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold">Long Island Nepalese Society</h3>
              <p className="mt-2">लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क</p>
              <p className="mt-2">longislandnepalese@gmail.com</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/" className="hover:text-red-400">Home</Link></li>
                  <li><Link href="/Events" className="hover:text-red-400">Events</Link></li>
                  <li><Link href="/MembershipForm" className="hover:text-red-400">Membership</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Connect</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="hover:text-red-400">Facebook</a></li>
                  <li><a href="#" className="hover:text-red-400">Instagram</a></li>
                  <li><a href="#" className="hover:text-red-400">YouTube</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} Long Island Nepalese Society. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          // Countdown timer
          function updateCountdown() {
            const eventDate = new Date("April 13, 2024 17:00:00").getTime();
            const now = new Date().getTime();
            const distance = eventDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById("days").textContent = days.toString().padStart(2, "0");
            document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
            document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
            document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
          }
          
          updateCountdown();
          setInterval(updateCountdown, 1000);
        `
      }} />
    </>
  );
};

export default EventPage;