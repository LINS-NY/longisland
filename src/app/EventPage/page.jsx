'use client';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import CountdownTimer from '/src/components/Countdown/Countdown';
import { useWindowSize } from 'react-use';

const EventPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [isConfettiActive, setConfettiActive] = useState(true);
  const [currentFlyer, setCurrentFlyer] = useState(0);
  const { width, height } = useWindowSize();

  const flyers = [
    '/NewYear2082Flyer.jpg',
    '/images/2024/Nepali New Year 2081/1.jpg',
    '/images/2024/Nepali New Year 2081/13.jpg',
    '/images/2024/Nepali New Year 2081/11.jpg',
    '/images/2024/Nepali New Year 2081/3.jpg',
  ];

  const sponsors = [
    { 
      name: "Community Partner", 
      logo: "/images/Sponsors/Sareepasal.png",
      sponsorName: "Saree Pasal",
      phone:"347-771-2375",
      tier: "partner",
      url: "www.sareepasal.com"
    },
    { 
      name: "Travel Partner", 
      logo: "/images/Sponsors/zentravels.png",
      sponsorName: "Zen Travels NY",
      phone:"347-305-8700",
      tier: "bronze",
      url: "#"
    },    
 /*    { 
      name: "Media Sponsor", 
      logo: "/sponsors/media-partner.png",
      sponsorName: "Saree Pasal",
      phone:"",
      tier: "media",
      url: "#"
    }, */
  ];

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

    const flyerInterval = setInterval(() => {
      setCurrentFlyer((prev) => (prev + 1) % flyers.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(flyerInterval);
    };
  }, []);

  return (
    <>
      {isConfettiActive && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          onConfettiComplete={() => setConfettiActive(false)}
        />
      )}

      <Header />

      {/* Sponsors Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-10 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-10"></div>
        </div>
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -left-20 -top-20 w-64 h-64 opacity-10"
        >
          <Image src="/mandala.png" width={256} height={256} alt="Mandala" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-3xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"
          >
            Our Generous Sponsors
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center text-gray-300 mb-12 text-lg"
          >
            This event is made possible by our wonderful sponsors
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: sponsor.tier === "gold" ? "0 0 20px rgba(255, 215, 0, 0.7)" :
                               sponsor.tier === "silver" ? "0 0 20px rgba(192, 192, 192, 0.7)" :
                               sponsor.tier === "bronze" ? "0 0 20px rgba(205, 127, 50, 0.7)" :
                               "0 0 20px rgba(255, 255, 255, 0.5)"
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-xl bg-gray-800 bg-opacity-60 backdrop-blur-sm border-2 ${
                  sponsor.tier === "gold" ? "border-yellow-500" :
                  sponsor.tier === "silver" ? "border-gray-300" :
                  sponsor.tier === "bronze" ? "border-amber-700" :
                  "border-blue-400"
                } transition-all duration-300`}
              >
                <Link href={sponsor.url} target="_blank" rel="noopener noreferrer">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 overflow-hidden rounded-full border-2 border-white">
                    <Image 
                      src={sponsor.logo} 
                      alt1={sponsor.sponsorName}
                      alt2={sponsor.phone}
                      alt={sponsor.name}
                      fill
                      className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <motion.h3 
                    className={`text-center font-semibold ${
                      sponsor.tier === "gold" ? "text-yellow-400" :
                      sponsor.tier === "silver" ? "text-gray-300" :
                      sponsor.tier === "bronze" ? "text-amber-600" :
                      "text-blue-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    >
                    {sponsor.sponsorName}
                    <p className="text-center text-xs text-gray-300 mt-1">
                    {sponsor.phone}
                  </p>
                  </motion.h3>
                  <p className="text-center text-large text-gray-300 mt-1 text-red-400">
                    {sponsor.name}
                  </p>
                  
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-300 mb-4">Interested in becoming a sponsor?</p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/Contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
            >
              Contact Us
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-red-600 to-yellow-500 py-16 md:py-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/NewYear2082Flyer.jpg')] bg-repeat opacity-30"></div>
        </div>

        {/* Floating decorations */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 w-16 h-16 opacity-40"
        >
          <Image src="/NewYear2082Flyer.jpg" width={64} height={64} alt="NewYear2082Flyer.jpg" />
        </motion.div>

        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-10 w-16 h-16 opacity-40"
        >
          <Image src="/NewYear2082Flyer.jpg" width={64} height={64} alt="NewYear2082Flyer.jpg" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
            >
              <span className="block">Nepali New Year</span>
              <span className="block text-5xl md:text-7xl text-yellow-300 flash-animation">2082 B.S.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-6 max-w-lg mx-auto text-xl text-white font-semibold"
            >
              लङ्ग आईल्याण्ड नेपाली समाज, न्यूयोर्कद्वारा नेपाली नयाँ वर्ष २०८२ को भव्य आयोजना
            </motion.p>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="mt-8"
            >
              <a
                href="https://www.evite.com/event/0034CHBF65YBFUNS6EPQBHI5UOCC4I?utm_campaign=send_sharable_link&utm_source=evitelink&utm_medium=sharable_invite"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-red-700 hover:bg-red-800 transition duration-300 transform hover:scale-105"
              >
                Join the Celebration
                <svg className="ml-3 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Event Details Section */}
      <div className="bg-white py-12 relative">
        {/* Decorative border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            {/* Rotating Flyer Gallery */}
            <div className="mb-12 lg:mb-0">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentFlyer}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400"
                >
                  <Image
                    src={flyers[currentFlyer]}
                    width={800}
                    height={1000}
                    alt="Nepali New Year 2082 Event Flyer"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <h3 className="text-xl font-bold text-white">Celebration Highlights</h3>
                    <p className="text-yellow-200">Swipe to see more</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Flyer navigation dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {flyers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFlyer(index)}
                    className={`w-3 h-3 rounded-full ${currentFlyer === index ? 'bg-red-600' : 'bg-gray-300'}`}
                    aria-label={`Go to flyer ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Event Info with enhanced animations */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-extrabold text-gray-900">
                <span className="block text-red-600">Celebrate With Us!</span>
                <span className="block mt-2 text-4xl text-yellow-600">नयाँ वर्ष २०८२ को शुभकामना</span>
              </h2>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start bg-red-50 p-4 rounded-lg"
                >
                  <div className="flex-shrink-0 bg-red-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">Saturday, April 12, 2024</p>
                    <p className="text-gray-600">From 5:00 PM till 10:45 PM</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start bg-yellow-50 p-4 rounded-lg"
                >
                  <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">Hicksville Community Center</p>
                    <p className="text-gray-600">201 Levittown Pkwy, Hicksville, NY 11801</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start bg-red-50 p-4 rounded-lg"
                >
                  <div className="flex-shrink-0 bg-red-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">For more information contact</p>
                    <p className="text-gray-600">Deepak Adhikari (Coordinator/ Secretary  LINS): <strong> (856)776-8105</strong> </p>
                    <p className="text-gray-600">Kul P Gouli (Rajan) (President - LINS): <strong>(718)974-7251 </strong> </p>
                    <p className="text-gray-600">Rajendra Karki (General Secretary - LINS): <strong>(516)234-1642 </strong> </p>
                  </div>
                </motion.div>
              </div>

              <div className="pt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white p-2 rounded-full mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </span>
                  Event Highlights:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "Traditional Nepali cultural performances",
                    "Live music and DJ entertainment",
                    "Authentic Nepali cuisine",
                    "Raffle Prizes"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <span className="bg-green-100 p-1 rounded-full mr-3">
                        <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.evite.com/event/0034CHBF65YBFUNS6EPQBHI5UOCC4I?utm_campaign=send_sharable_link&utm_source=evitelink&utm_medium=sharable_invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-full shadow-lg text-white bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 transition duration-300"
                >
                  Register Now on Evite
                  <svg className="ml-3 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Countdown Section */}
      <div className="bg-gradient-to-br from-red-800 via-red-600 to-yellow-600 py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-20"></div>
        </div>

        {/* Floating decorations */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -left-20 -top-20 w-64 h-64 opacity-10"
        >
          <Image src="/mandala.png" width={256} height={256} alt="Mandala" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -right-20 -bottom-20 w-64 h-64 opacity-10"
        >
          <Image src="/mandala.png" width={256} height={256} alt="Mandala" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CountdownTimer />

          {/* Additional festive message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white text-lg italic">
              "Join us for a vibrant celebration of Nepali culture, tradition, and the dawn of New Year 2082!"
            </p>
            <p className="text-yellow-200 mt-2">
              "नेपाली संस्कृति, परम्परा, र नयाँ वर्ष २०८२ को उज्यालो उत्सवमा सहभागी हुनुहोस्!"
            </p>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Gallery Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-gray-900 text-center mb-12"
          >
            <span className="block text-red-600">Memories from Past Events</span>
            <span className="block text-lg text-gray-600 mt-2">अघिल्ला वर्षको सम्झनाहरू</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 12, 15, 17, 16].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >
                <Image
                  src={`/images/2024/Nepali New Year 2081/${item}.jpg`}
                  width={400}
                  height={300}
                  alt={`Past event photo ${item}`}
                  className="w-full h-48 md:h-56 object-cover hover:brightness-110 transition duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold flex items-center">
                <Image
                  src="/LINS.png"
                  width={50}
                  height={50}
                  alt="Nepal Flag"
                  className="mr-2"
                />
                Long Island Nepalese Society, New York
              </h3>
              <p className="mt-2 text-gray-300">लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क</p>
              <p className="mt-4 text-gray-400">longislandnepalese@gmail.com</p>

            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  {[
                    { name: "Home", path: "/" },
                    { name: "Events", path: "/EventPage" },
                    { name: "Membership", path: "/MembershipForm" }
                  ].map((link) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 5 }}
                    >
                      <Link href={link.path} className="text-gray-300 hover:text-red-400 transition duration-300">
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Long Island Nepalese Society. All rights reserved.</p>
            <p className="mt-2">शुभ नयाँ वर्ष २०८२ को हार्दिक शुभकामना!</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes flash {
          0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); }
          50% { opacity: 0.8; text-shadow: 0 0 20px rgba(255, 215, 0, 0.8); color: #fde047; }
        }
        .flash-animation {
          animation: flash 2s infinite;
        }
        @keyframes flashSlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }
        .flash-animation-slow {
          animation: flashSlow 3s infinite;
        }
      `}</style>
    </>
  );
};

export default EventPage;