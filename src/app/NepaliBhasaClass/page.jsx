'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/card';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

// Shared data (single source of truth)
import {
  years,
  classCards,
  teachers as teachersData,
  volunteers,
  zoomSchedules,
  galleryByYear,
} from '../../../data/nepaliBhasa/nepaliBhasa';

export default function NepaliBhasaClassPage() {
  // Coordinator (static)
  const [coordinatorExpanded, setCoordinatorExpanded] = useState(false);
  const coordinator = {
    name: 'Sabitra Siwakoti',
    img: '/images/2025/NepaliBhasaClass/Teachers/Teacher - Sabitra Siwakoti.JPG',
    messageLines: [
      `On behalf of the Long Island Nepalese Society, I extend a warm and respectful greeting to all residents of Long Island and to Nepali families from other regions whose children are enrolled in our Nepali language classes. Our program is founded on the principles of cultural preservation, academic excellence, and community support. We are committed to providing a safe, inclusive, and nurturing learning environment where every child can develop language skills, cultural understanding, and confidence. We appreciate your trust and partnership, and we invite you to engage with our teachers, volunteers, and staff so we may continue to improve and expand our offerings for the benefit of our community.`,
      `With sincere gratitude and best wishes for a successful learning experience.`,
      `Sabitra Siwakoti,`,
      `Coordinator, Long Island Nepalese Society, New York.`,
    ],
  };

  const previewText = coordinator.messageLines && coordinator.messageLines.length
    ? (coordinator.messageLines[0].length > 180
        ? coordinator.messageLines[0].slice(0, 180).trim() + '...'
        : coordinator.messageLines[0])
    : '';

  // UI state
  const [selectedYear, setSelectedYear] = useState('All');

  // Gallery grouping state: which years are expanded
  const [expandedYears, setExpandedYears] = useState(() => ({})); // { '2025': true }

  const toggleYear = (y) => {
    setExpandedYears((prev) => ({ ...prev, [y]: !prev[y] }));
  };

  // Helper: find teacher image by exact name from shared teachers data
  const findTeacherImage = (name) => {
    if (!name || !Array.isArray(teachersData)) return null;
    const t = teachersData.find((x) => x.name && x.name.trim().toLowerCase() === name.trim().toLowerCase());
    return t ? t.img : null;
  };

  // Safe path encoder for image src (handles spaces)
  const safePath = (p) => (p ? encodeURI(p) : p);

  // Small placeholder path (add a placeholder image at this path in public/)
  const placeholder = '/images/placeholder-avatar.png';

  // Helper: flatten or group gallery images depending on selectedYear
  const groupedGallery = useMemo(() => {
    const data = galleryByYear || {};
    if (selectedYear && selectedYear !== 'All') {
      return { [selectedYear]: data[selectedYear] || [] };
    }
    // return all years sorted descending (newest first)
    const yearsList = Object.keys(data).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
    const out = {};
    for (const y of yearsList) out[y] = data[y] || [];
    return out;
  }, [selectedYear, galleryByYear]);

  // Order classes for display (static)
  const orderedFilteredCards = useMemo(() => {
    const desiredTitles = [
      'Advance Class - Section A',
      'Mid-Level Class',
      'Beginning Class (Saturday)',
      'Beginning Class (Sunday)',
    ];
    const findByTitle = (title) => classCards.find((c) => c.title === title);
    const ordered = desiredTitles.map(findByTitle).filter(Boolean);
    const remaining = classCards.filter((c) => !desiredTitles.includes(c.title));
    return [...ordered, ...remaining];
  }, [classCards]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-purple-50 flex flex-col">
      <Header />

      <main className="relative z-10 max-w-6xl mx-auto p-6 w-full flex-1">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-purple-700 mb-2">
          🌸 Nepali Bhasa Class
        </h1>
        <p className="text-center text-pink-700 font-medium mb-8">
          Learn Nepali with joy — classes, teachers, and Zoom links in one place.
        </p>

                {/* Coordinator card */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/95 border-2 border-red-200 rounded-2xl p-4 md:p-6 shadow-md flex flex-col md:flex-row items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-44 h-40 md:w-56 md:h-48 rounded-md overflow-hidden border-4 border-red-300 shadow-sm bg-gray-50">
                <Image
                  src={coordinator.img}
                  alt={`Coordinator ${coordinator.name}`}
                  width={224}
                  height={192}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-red-700">Coordinator Message</h3>
              <p className="text-base md:text-lg font-extrabold text-rose-700 mt-1">{coordinator.name}</p>

              <div id="coordinator-message" className="mt-4 text-gray-700 text-sm leading-relaxed">
                {!coordinatorExpanded ? (
                  <p className="mx-auto max-w-3xl">{previewText}</p>
                ) : (
                  <div className="mx-auto max-w-3xl space-y-3">
                    {coordinator.messageLines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setCoordinatorExpanded((s) => !s)}
                  className={`inline-flex items-center px-5 py-2 rounded-full font-semibold text-sm transition ${
                    coordinatorExpanded ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                  aria-expanded={coordinatorExpanded}
                  aria-controls="coordinator-message"
                >
                  {coordinatorExpanded ? 'Less' : 'More'}
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* Explore Classes (static) */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6 text-center">🎒 Explore Classes</h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {orderedFilteredCards.map((cls) => {
                // two teacher avatars logic
                const teacherNames = Array.isArray(cls.teachers) ? cls.teachers : [];
                const img1 = teacherNames[0] ? findTeacherImage(teacherNames[0]) : null;
                const img2 = teacherNames[1] ? findTeacherImage(teacherNames[1]) : null;
                const firstSrc = img1 || cls.img || placeholder;
                const secondSrc = img2 || img1 || cls.img || placeholder;

                return (
                  <Link key={cls.id} href={`/NepaliBhasaClass/${cls.id}`} className="block">
                    <Card className="cursor-pointer group border-2 border-pink-300 bg-white/95 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                      <div className="flex flex-col justify-between h-40 md:h-44 p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <div className="absolute left-0 top-0 w-12 h-12 rounded-full overflow-hidden border-4 border-yellow-300 bg-gray-100">
                              <Image
                                src={safePath(firstSrc)}
                                alt={teacherNames[0] || cls.title}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="absolute left-8 top-4 w-12 h-12 rounded-full overflow-hidden border-4 border-yellow-300 bg-gray-100">
                              <Image
                                src={safePath(secondSrc)}
                                alt={teacherNames[1] || teacherNames[0] || cls.title}
                                width={80}
                                height={80  }
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-pink-600 mb-1">{cls.tag}</div>
                            <h3 className="text-lg md:text-xl font-extrabold text-purple-700 leading-tight truncate">{cls.title}</h3>
                            <p className="text-sm text-gray-600 mt-1 truncate">
                              Teachers:{' '}
                              <span className="font-medium text-gray-700">
                                {teacherNames.join(', ')}
                              </span>
                            </p>
                            <p className="text-sm text-gray-500 mt-1">📅 {cls.year}</p>
                          </div>
                        </div>

                        <div className="px-2 pt-2 text-center">
                          <span className="inline-block text-xs text-white bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 rounded-full shadow-sm group-hover:scale-105 transition">
                            Tap to see students, teacher & Zoom
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Teachers & Volunteers (static) */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6 text-center">🙋‍♀️ Teachers & Volunteers</h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {teachersData.map((t) => (
                <div key={t.name} className="flex flex-col justify-between bg-white/90 p-4 rounded-xl border-2 border-purple-200 shadow-sm">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-300 shadow-md">
                      <Image
                        src={t.img}
                        alt={t.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-purple-700 leading-tight">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-xs text-gray-500">Teacher</span>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-pink-700 mt-8 mb-4 text-center">Volunteers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {volunteers.map((v) => (
                <div key={v.name} className="flex flex-col justify-between bg-white/90 p-4 rounded-xl border-2 border-pink-200 shadow-sm">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-300 shadow-md">
                      <Image
                        src={v.img}
                        alt={v.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-pink-700">{v.name}</p>
                      <p className="text-xs text-gray-500">{v.role}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-xs text-gray-500">Volunteer</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

         {/*Enable this once Registration is open*/}     
        {/* Registration cards (before Gallery) */}
        {/* ... (kept commented out) */}

{/*Disable this once Registration is open*/}     
{/* Registration cards (before Gallery) */}
<section className="mb-10">
  <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6 text-center">📝 Registration</h2>

  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-4">
      <p className="text-sm text-gray-600">
        <strong className="text-pink-700">Note:</strong> Registration is not open yet. The registration buttons are visible but disabled until we open registration.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 bg-white/95 border-2 border-pink-200 rounded-xl shadow-md">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-extrabold text-purple-700">Student Registration</h3>
            <p className="text-sm text-gray-600 mt-1">
              Register your child for Nepali Bhasa classes. The form will open when registration starts.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex items-center gap-2 bg-gray-300 text-gray-600 px-4 py-2 rounded-full shadow cursor-not-allowed"
                title="Registration not open yet"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 14h-2v-2h2v2zm0-4h-2V6h2v6z" />
                </svg>
                Registration coming soon
              </button>

              <span className="text-xs text-gray-500">Will open soon. Check back later.</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/95 border-2 border-yellow-200 rounded-xl shadow-md">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl">
              T
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-extrabold text-purple-700">Teacher / Volunteer Registration</h3>
            <p className="text-sm text-gray-600 mt-1">
              Interested in teaching or volunteering? The registration form will be available once we open registrations.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex items-center gap-2 bg-gray-300 text-gray-600 px-4 py-2 rounded-full shadow cursor-not-allowed"
                title="Registration not open yet"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 14h-2v-2h2v2zm0-4h-2V6h2v6z" />
                </svg>
                Registration coming soon
              </button>

              <span className="text-xs text-gray-500">Will open soon. Check back later.</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</section>

        {/* Gallery filter (select year affects only gallery) */}
        <section className="mb-6">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
            <label className="text-purple-700 font-semibold">Select year (Gallery only):</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 rounded-2xl border-2 border-pink-300 bg-white text-pink-700 font-semibold shadow-sm"
            >
              <option value="All">All</option>
              {Object.keys(galleryByYear || {}).sort((a,b)=>b.localeCompare(a, undefined, {numeric:true})).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Gallery (grouped by year, 4-preview + show more) */}
<section className="mb-6">
  <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-4 text-center">🖼️ Picture Gallery</h2>
  <p className="text-center text-gray-600 mb-6">
    Showing {selectedYear === 'All' ? 'All years' : selectedYear}
  </p>

  <div className="max-w-6xl mx-auto space-y-6">
    {Object.keys(groupedGallery).length === 0 && (
      <Card className="text-center border-2 border-gray-200 p-6">
        <p className="text-gray-600">No images available. Add images to the gallery to display them here.</p>
      </Card>
    )}

    {(() => {
      // sort years descending (numeric-aware)
      const sortedYears = Object.keys(groupedGallery).sort((a, b) =>
        b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' })
      );

      return sortedYears.map((year) => {
        const images = groupedGallery[year] || [];
        const isExpanded = !!expandedYears[year];
        const preview = images.slice(0, 4);
        const remainingCount = Math.max(0, images.length - preview.length);

        return (
          <div key={year} className="bg-white/95 border-2 border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-purple-700">{year}</h3>
                <p className="text-sm text-gray-500">{images.length} photo{images.length !== 1 ? 's' : ''}</p>
              </div>

              <div className="flex items-center gap-3">
                {remainingCount > 0 && (
                  <button
                    onClick={() => toggleYear(year)}
                    className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm hover:opacity-95 transition"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? 'Show less' : `Show ${Math.min(4, images.length)} +${remainingCount}`}
                  </button>
                )}
                {remainingCount === 0 && (
                  <span className="text-xs text-gray-500 px-3 py-1">All photos shown</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {(isExpanded ? images : preview).map((src) => (
                <Card key={src} className="p-0 overflow-hidden border-2 border-pink-50">
                  <Image
                    src={src}
                    width={600}
                    height={600}
                    alt={`Gallery ${year}`}
                    className="w-full h-36 sm:h-40 md:h-48 object-cover hover:scale-105 transition"
                  />
                </Card>
              ))}
            </div>

            {!isExpanded && remainingCount > 0 && (
              <div className="mt-3 text-right">
                <button
                  onClick={() => toggleYear(year)}
                  className="text-sm text-purple-700 underline font-medium"
                >
                  View all {images.length} photos from {year}
                </button>
              </div>
            )}
          </div>
        );
      });
    })()}
  </div>
</section>

        {/* More images / external gallery links */}
        <section className="mt-6 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/95 border-2 border-gray-200 rounded-2xl p-6 md:p-8 shadow-md text-center">
              <h3 className="text-lg md:text-xl font-bold text-purple-700 mb-2">Want to see more photos?</h3>
              <p className="text-sm md:text-base text-gray-700 mb-4">
                We share additional event photos and albums on our Facebook page and in the official gallery. Visit either place to explore more memories from our classes and events.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                <a
                  href="https://www.facebook.com/LongIslandNepaleseSociety"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.1 5.66 21.2 10.44 22v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.39-3.61 3.52-3.61 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.9h-2.18V22C18.34 21.2 22 17.1 22 12.07z" />
                  </svg>
                  Visit our Facebook page
                </a>

                <a
                  href="https://www.linsny.org/Gallery"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-full shadow-md transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M21 19V5a2 2 0 0 0-2-2H5C3.9 3 3 3.9 3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 11.5l2.5 3.01L13.5 12l4.5 6H6l2.5-6.5z" />
                  </svg>
                  View our Gallery
                </a>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Both links open in a new tab. If you have photos to share, please contact the coordinator.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
