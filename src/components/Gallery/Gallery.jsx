'use client';
import React, { useState } from 'react';
import galleryData from '../../../data/gallery/gallery-data';
import GalleryView from './GalleryView';

export default function Gallery() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('All');

  const years = Object.keys(galleryData);
  const events = selectedYear ? ['All', ...galleryData[selectedYear].map((e) => e.event)] : [];

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedEvent('All');
  };

  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  const filteredImages = () => {
    if (!selectedYear) return [];

    const eventsInYear = galleryData[selectedYear];
    if (selectedEvent === 'All') {
      return eventsInYear.flatMap((event) => ({
        ...event,
      }));
    }
    return eventsInYear.filter((e) => e.event === selectedEvent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-serif font-bold text-center text-green-800 mb-6">Explore Our Gallery</h1>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <select
            onChange={handleYearChange}
            value={selectedYear}
            className="rounded-xl border px-4 py-3 text-lg shadow bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">📅 Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          {selectedYear && (
            <select
              onChange={handleEventChange}
              value={selectedEvent}
              className="rounded-xl border px-4 py-3 text-lg shadow bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {events.map((event, i) => (
                <option key={i} value={event}>{event}</option>
              ))}
            </select>
          )}
        </div>

        <GalleryView imagesByEvent={filteredImages()} />
      </div>
    </div>
  );
}
