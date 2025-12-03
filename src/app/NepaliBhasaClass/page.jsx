'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/card';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

// Data file at project root: adjust if your project differs
import {
  years,
  classCards,
  teachers,
  volunteers as volunteersFromData,
  zoomSchedules,
} from '../../../data/nepaliBhasa/nepaliBhasa';

export default function NepaliBhasaClassPage() {
  // --- Coordinator state and data ---
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

  // --- Data fallbacks ---
  const volunteers = Array.isArray(volunteersFromData) ? volunteersFromData : [];
  const classes = Array.isArray(classCards) ? classCards : [];
  const zooms = Array.isArray(zoomSchedules) ? zoomSchedules : [];
  const teacherList = Array.isArray(teachers) ? teachers : [];

  // --- UI state ---
  const [selectedYear, setSelectedYear] = useState('All');

  // --- Gallery: dynamic fetch from server API (Option A) ---
  const [galleryImages, setGalleryImages] = useState([]);
  useEffect(() => {
    let mounted = true;

    async function loadGallery(year) {
      try {
        if (!year || year === 'All') {
          // derive years to fetch from `years` if available, otherwise fallback
          const yearsToFetch = Array.isArray(years) && years.length ? years : ['2024', '2025'];
          const all = [];
          for (const y of yearsToFetch) {
            try {
              const res = await fetch(`/api/gallery?year=${encodeURIComponent(y)}`);
              if (!res.ok) continue;
              const json = await res.json();
              if (Array.isArray(json.images)) all.push(...json.images);
            } catch {
              // ignore single-year failures
            }
          }
          if (mounted) setGalleryImages(all);
          return;
        }

        const res = await fetch(`/api/gallery?year=${encodeURIComponent(year)}`);
        if (!res.ok) {
          if (mounted) setGalleryImages([]);
          return;
        }
        const json = await res.json();
        if (mounted) setGalleryImages(Array.isArray(json.images) ? json.images : []);
      } catch {
        if (mounted) setGalleryImages([]);
      }
    }

    loadGallery(selectedYear);

    return () => {
      mounted = false;
    };
  }, [selectedYear]);

  // --- Order classes in requested sequence and apply image overrides ---
  const orderedFilteredCards = useMemo(() => {
    const filteredRaw = selectedYear === 'All' ? classes : classes.filter((c) => c.year === selectedYear);

    const desiredTitles = [
      'Advance Class - Section A',
      'Mid-Level Class',
      'Beginning Class (Saturday)',
      'Beginning Class (Sunday)',
    ];

    const findByTitle = (title) => filteredRaw.find((c) => c.title === title);
    const ordered = desiredTitles.map(findByTitle).filter(Boolean);
    const remaining = filteredRaw.filter((c) => !desiredTitles.includes(c.title));
    return [...ordered, ...remaining].map((card) => {
      const copy = { ...card };
      if (copy.title === 'Advance Class - Section A') {
        copy.img = '/images/2025/NepaliBhasaClass/Teachers/Teacher - Sabitra Siwakoti.JPG';
      }
      if (copy.title === 'Beginning Class (Sunday)') {
        copy.img = '/images/2025/NepaliBhasaClass/Teachers/Teacher - Susmita Bhandari.JPG';
      }
      return copy;
    });
  }, [classes, selectedYear]);

  // --- Zooms filtered by selected year (if zooms reference class ids) ---
  const filteredZooms = useMemo(() => {
    if (!Array.isArray(zooms) || !Array.isArray(classes)) return [];
    const classIdsForYear =
      selectedYear === 'All' ? classes.map((c) => c.id) : classes.filter((c) => c.year === selectedYear).map((c) => c.id);
    return zooms.filter((z) => classIdsForYear.includes(z.id));
  }, [zooms, classes, selectedYear]);

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

            <div className="flex-1 text-center md:text-center">
              <h3 className="text-lg md:text-xl font-bold text-red-700">Coordinator Message</h3>
              <p className="text-base md:text-lg font-extrabold text-green-700 mt-1">{coordinator.name}</p>

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


        {/* Year filter */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <label className="text-green-700 text-3xl font-extrabold">Select year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 rounded-2xl border-2 border-pink-300 bg-white text-pink-700 font-semibold shadow-sm"
          >
            {(years || ['All']).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
            <option value="All">All</option>
          </select>
        </div>

        {/* Explore Classes */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6 text-center">🎒 Explore Classes</h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {orderedFilteredCards.map((cls) => (
                <Link key={cls.id} href={`/NepaliBhasaClass/${cls.id}`} className="block">
                  <Card className="cursor-pointer group border-2 border-pink-300 bg-white/95 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                    {/* Fixed-height card content for consistent sizing */}
                    <div className="flex flex-col justify-between h-40 md:h-44 p-4">
                      <div className="flex items-center gap-4">
                        {/* Circular image */}
                        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-4 border-yellow-300">
                          <Image
                            src={cls.img}
                            alt={cls.title}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-pink-600 mb-1">{cls.tag}</div>
                          <h3 className="text-lg md:text-xl font-extrabold text-purple-700 leading-tight truncate">{cls.title}</h3>
                          <p className="text-sm text-gray-600 mt-1 truncate">
                            Teachers:{' '}
                            <span className="font-medium text-gray-700">
                              {Array.isArray(cls.teachers) ? cls.teachers.join(', ') : cls.teacher || ''}
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
              ))}
              {orderedFilteredCards.length === 0 && (
                <Card className="text-center border-2 border-gray-200 p-6">
                  <p className="text-gray-600">No classes found for {selectedYear}. Try another year.</p>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Teachers & Volunteers */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6 text-center">🙋‍♀️ Teachers & Volunteers</h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {teacherList.map((t) => (
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
              {volunteers.length === 0 && (
                <Card className="text-center border-2 border-gray-200 p-6">
                  <p className="text-gray-600">No volunteers listed.</p>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Class schedule */}
        {filteredZooms.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-pink-700 mb-6 text-center">📚 Class Schedule</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredZooms.map((zs) => (
                <Card key={zs.id || zs.level} className="border-2 border-yellow-300 text-center p-4">
                  <h3 className="text-xl font-bold text-purple-700">{zs.level}</h3>
                  <p className="text-pink-600 mt-1">📆 {zs.day} • ⏰ {zs.time}</p>
                  <a
                    href={zs.zoom}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 transition text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
                    </svg>
                    🔗 Join Zoom
                  </a>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6 text-center">🖼️ Graduation Picture Gallery</h2>
          <p className="text-center text-gray-600 mb-4">
            Showing {selectedYear === 'All' ? 'All years' : selectedYear}
          </p>
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryImages.map((src) => (
              <Card key={src} className="p-0 overflow-hidden border-2 border-pink-200">
                <Image
                  src={src}
                  width={600}
                  height={600}
                  alt="Gallery image"
                  className="w-full h-36 sm:h-40 md:h-48 object-cover hover:scale-105 transition"
                />
              </Card>
            ))}
            {galleryImages.length === 0 && (
              <Card className="text-center border-2 border-gray-200 p-6">
                <p className="text-gray-600">No images for {selectedYear}. Try another year.</p>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
