'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const moreRef = React.useRef(null);

  React.useEffect(() => {
    const onDocClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const navPrimary = [
    { href: '/', label: 'Home' },
    { href: '/Donations', label: 'Donation' },
    { href: '/MembershipForm', label: 'Membership' },
    { href: '/Calendar', label: 'Calendar' },
  ];

  const moreLinks = [
    { href: '/About', label: 'About LINS' },
    { href: '/CommunityBuilding', label: 'Community Building' },
    { href: '/NepaliBhasaClass', label: 'Nepali Bhasa Class' },
    { href: '/FinancialReports', label: 'Financial Reports' },
    { href: '/Gallery', label: 'Events/Gallery' },
    { href: '/Forums', label: 'Forum/Rent/Job' },
    { href: '/News', label: 'News' },
    { href: '/resources', label: 'Resources' },
    { href: '/Bylaws', label: 'Bylaws' },
    { href: '/Contact', label: 'Contact US' },
  ];

  return (
    <header className="w-full border-b bg-white/95 backdrop-blur z-50 sticky top-0">
      {/* Use flex-col on small screens so nav stacks below logo; switch to flex-row on md and up */}
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
        {/* Left area: logo + title */}
        <div className="flex items-center gap-3 w-full md:w-auto">
  <Link href="/" className="flex items-center gap-3">
    <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
      <Image
        src="/LINS.png"
        alt="LINS"
        fill
        sizes="56px"
        className="rounded-full object-cover"
      />
    </div>

    {/* Make the text one line */}
    <div className="flex flex-wrap items-center gap-1 leading-snug">
      <span className="text-sm sm:text-lg font-extrabold text-blue-900 whitespace-nowrap">
        Long Island Nepalese Society
      </span>

      <span className="text-[10px] font-bold sm:text-xs text-gray-600 whitespace-nowrap">
        लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
      </span>
    </div>
  </Link>
</div>


        {/* Middle/Bottom area: primary nav - on small screens this appears below logo (stacked) */}
        <nav className="w-full">
          {/* Desktop: inline row (md and up) */}
          <div className="hidden md:flex items-center gap-3">
            {navPrimary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base text-gray-800 hover:text-blue-700 px-3 py-1"
              >
                {item.label}
              </Link>
            ))}

            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                className="inline-flex items-center gap-2 px-3 py-1 text-base bg-white border rounded text-gray-800 hover:shadow-sm"
              >
                More <FaChevronDown className={`${moreOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
              </button>

              <div
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all ${
                  moreOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                }`}
              >
                <div className="py-1">
                  {moreLinks.map((m) => (
                    <Link
                      key={m.href}
                      href={m.href}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: stacked row centered under the logo */}
          <div className="md:hidden mt-2 w-full">
            <div className="flex flex-wrap gap-2 justify-start">
              {navPrimary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-800 hover:text-blue-700 px-3 py-2 rounded bg-gray-50"
                >
                  {item.label}
                </Link>
              ))}

              {/* More toggle button shown with primary on mobile */}
              <button
                className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-white border rounded text-gray-800"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle more menu"
              >
                More {mobileOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Mobile more links panel (collapsible) */}
            <div className={`mt-2 transition-max-h duration-200 ease-in-out ${mobileOpen ? 'max-h-screen visible' : 'max-h-0 invisible'} overflow-hidden`}>
              <div className="grid grid-cols-2 gap-2">
                {moreLinks.map((m) => (
                  <Link
                    key={m.href}
                    href={m.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm text-gray-700 px-3 py-2 rounded bg-gray-50 hover:bg-gray-100"
                  >
                    {m.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Right area on desktop: keep empty or add controls (e.g., auth/create) */}
        <div className="w-full md:w-auto flex justify-end md:justify-end items-center">
          {/* Placeholder: add buttons like login/create post if needed */}
        </div>
      </div>
    </header>
  );
};

export default Header;
