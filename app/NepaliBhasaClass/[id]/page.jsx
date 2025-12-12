'use client';

import Card from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { classDetails } from '@data/nepaliBhasa/nepaliBhasa';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function ClassDetailPage({ params }) {
  const cls = classDetails && params && classDetails[params.id];
  if (!cls) return notFound();

  // Safe defaults
  const teachers = Array.isArray(cls.teachers) ? cls.teachers : [];
  const students = Array.isArray(cls.students) ? cls.students : [];
  const zoomUrl = cls.zoom || (teachers[0] && teachers[0].zoom) || '#';
  const zoomDisabled = zoomUrl === '#';

  // Placeholder image for missing teacher photos (put a real placeholder in /public if desired)
  const placeholderImg = '/images/placeholder-avatar.png';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex flex-col">
      <Header />

      <main className="relative z-10 max-w-6xl mx-auto p-6 w-full flex-1">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-purple-700 mb-8">
          {cls.title}
        </h1>

        {/* Teachers block with consistent card heights and centered Join Zoom button */}
        <Card className="p-6 md:p-8 border-2 border-purple-200">
          <div className="flex flex-col gap-6">
            {/* teacher cards grid: responsive, equal-height cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {teachers.length === 0 ? (
                <div className="col-span-full text-center text-gray-600">No teachers listed for this class.</div>
              ) : (
                teachers.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-start gap-3 bg-white/90 p-4 rounded-xl shadow-sm min-h-[120px]"
                    aria-label={`Teacher ${t.name || idx}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-200 flex-shrink-0">
                        <Image
                          src={t.img || placeholderImg}
                          alt={t.name || 'Teacher'}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="font-bold text-purple-700 truncate">{t.name || 'Unnamed'}</div>
                        <div className="text-xs text-gray-500 mt-1">{t.role || 'Teacher'}</div>
                      </div>
                    </div>

                    {/* optional spacer to keep card heights consistent */}
                    <div className="mt-auto text-sm text-gray-500 hidden md:block">&nbsp;</div>
                  </div>
                ))
              )}
            </div>

            {/* Single centered Zoom button in its own row */}
            <div className="flex justify-center">
              <a
                href={zoomDisabled ? undefined : zoomUrl}
                target={zoomDisabled ? undefined : '_blank'}
                rel={zoomDisabled ? undefined : 'noreferrer'}
                className={`inline-flex items-center justify-center gap-3 ${
                  zoomDisabled ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'
                } font-semibold px-8 py-3 rounded-2xl shadow-lg text-lg transition`}
                aria-disabled={zoomDisabled}
                role="button"
                aria-label={zoomDisabled ? 'Zoom link not available' : 'Join Zoom meeting'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
                <span className="leading-none">Join Zoom</span>
              </a>
            </div>

            {/* Students */}
            <div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">👦👧 Students</h3>
              {students.length === 0 ? (
                <p className="text-gray-600">No students listed for this class yet.</p>
              ) : (
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {students.map((s, i) => (
                    <li key={i} className="bg-pink-100 p-3 rounded-xl text-center text-purple-800 font-medium shadow">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Card>

        <div className="mt-8 flex justify-center">
          <Link
            href="/NepaliBhasaClass"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow-md hover:opacity-90 transition"
          >
            ⬅️ Back to classes
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
