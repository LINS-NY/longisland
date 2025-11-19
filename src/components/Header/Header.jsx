'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const [moreOpen, setMoreOpen] = React.useState(false);
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
    { href: '/Gallery', label: 'Events' },
    { href: '/FinancialReports', label: 'Finance' },
    { href: '/News', label: 'News' },
    { href: '/Forums', label: 'Forum' },
    { href: '/Resource', label: 'Resource' },
    { href: '/Bylaws', label: 'Bylaws' },
    { href: '/Contact', label: 'Contact' },
  ];

  return (
    <header className="w-full border-b bg-white/90 backdrop-blur z-40 sticky top-0">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/LINS.png" width={64} height={64} alt="Lins logo" className="rounded-full" />
          <div className="hidden sm:block">
            <div className="text-lg font-extrabold text-blue-900">Long Island Nepalese Society</div>
            <div className="text-xs text-gray-600">लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क</div>
          </div>
        </Link>

        {/* Navigation - compact inline */}
        <nav className="flex items-center gap-4">
          {navPrimary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-800 hover:text-blue-700 px-2 py-1"
            >
              {item.label}
            </Link>
          ))}

          {/* Inline More button (same row, does not expand layout) */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              className="inline-flex items-center gap-2 px-2 py-1 text-sm bg-white border rounded text-gray-800 hover:shadow-sm"
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
