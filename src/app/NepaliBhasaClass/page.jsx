'use client';

import { useMemo, useState } from 'react';
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
  galleryByYear,
} from '../../../data/nepaliBhasa/nepaliBhasa';

export default function NepaliBhasaClassPage() {
  // Safe fallbacks
  const volunteers = Array.isArray(volunteersFromData) ? volunteersFromData : [];
  const classes = Array.isArray(classCards) ? classCards : [];
  const zooms = Array.isArray(zoomSchedules) ? zoomSchedules : [];
  const teacherList = Array.isArray(teachers) ? teachers : [];

  const [selectedYear, setSelectedYear] = useState('All');

  // Filter class cards by year
  const filteredCards = useMemo(() => {
    if (selectedYear === 'All') return classes;
    return classes.filter((c) => c.year === selectedYear);
  }, [classes, selectedYear]);

  // Gallery images for selected year
  const galleryImages = useMemo(() => {
    if (!galleryByYear) return [];
    if (selectedYear === 'All') {
      return [...(galleryByYear['2024'] || []), ...(galleryByYear['2025'] || [])];
    }
    return galleryByYear[selectedYear] || [];
  }, [galleryByYear, selectedYear]);

  // Derive zoom schedule entries relevant to the selected year.
  // This assumes zoomSchedules items have an `id` that matches classCards `id`.
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

        {/* Year filter */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <label className="text-purple-700 font-semibold">Select year:</label>
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
          </select>
        </div>

        {/* Explore Classes: responsive 2 columns on small+ screens */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6 text-center">🎒 Explore Classes</h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredCards.map((cls) => (
                <Link key={cls.id} href={`/NepaliBhasaClass/${cls.id}`} className="block">
                  <Card className="cursor-pointer group border-2 border-pink-300 bg-white/95 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                    <div className="flex items-center gap-4 p-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-4 border-yellow-300">
                        <Image
                          src={cls.img}
                          alt={cls.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="text-xs text-pink-600 mb-1">{cls.tag}</div>
                        <h3 className="text-lg md:text-xl font-extrabold text-purple-700 leading-tight">{cls.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Teachers:{' '}
                          <span className="font-medium text-gray-700">
                            {Array.isArray(cls.teachers) ? cls.teachers.join(', ') : cls.teacher || ''}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">📅 {cls.year}</p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 text-center">
                      <span className="inline-block text-xs text-white bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 rounded-full shadow-sm group-hover:scale-105 transition">
                        Tap to see students, teacher & Zoom
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
              {filteredCards.length === 0 && (
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
            {/* Teachers grid: 1 col mobile, 2 sm, 4 md+ */}
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

            {/* Volunteers grid: same 4-per-row layout */}
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

        {/* Class schedule - only show when there are zooms for the selected year */}
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
                    className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 transition"
                  >
                    🔗 Join Zoom
                  </a>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6 text-center">🖼️ Picture Gallery</h2>
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
