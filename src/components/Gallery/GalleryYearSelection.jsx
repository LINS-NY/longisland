'use client'; // Mark this as a Client Component
import { useRouter } from 'next/navigation'; // Use Next.js's router
import React, { useState } from 'react';

export default function Home() {
  const [selectedYear, setSelectedYear] = useState('');
  const router = useRouter();

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedYear) {
      router.push(`Gallery${selectedYear}`); // Navigate to the selected year's page
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', minHeight: '100vh' }}>
      <h1 class="p-2 font-bold font-serif tracking-wide md:text-3xl text-xl text-green-800 ">Select Gallery Year</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          <option value="">Select a year</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
        <button
          class="block text-white dark:bg-slate-400 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 text-center  dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
          style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px' }}
        >
          Go
        </button>
      </form>
    </div>
  );
}