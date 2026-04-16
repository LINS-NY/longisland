'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const monthOrder = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
};

const extractMonthFromFilename = (filename) => {
  const match = filename.match(/([A-Za-z]+)-\d{4}/);
  return match ? match[1] : '';
};

export default function FinancialReports() {
  const [reports, setReports] = useState({ bank: {}, events: {} });
  const [loading, setLoading] = useState(true);
  
  // --- New Filter States ---
  const [filterYear, setFilterYear] = useState('All');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch('/api/financial-reports');
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  // Get unique years for the dropdown
  const allYears = Array.from(new Set([
    ...Object.keys(reports.bank),
    ...Object.keys(reports.events)
  ])).sort((a, b) => b.localeCompare(a));

  const renderReportSection = (title, data, source) => {
    if (!data || Object.keys(data).length === 0) return null;
    if (filterType !== 'All' && filterType !== source) return null;

    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-green-800 mb-6 border-b border-gray-300 pb-2">
          {title}
        </h2>

        {Object.entries(data)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .filter(([year]) => filterYear === 'All' || filterYear === year)
          .map(([year, files]) => {
            // Deduplicate and clean "-copy" files
            const seenSlugs = new Set();
            const cleanFiles = files.filter(file => {
              const slug = file.slug || `${source}-${file.filename.replace('.xlsx', '')}`;
              if (seenSlugs.has(slug) || slug.toLowerCase().includes('copy')) return false;
              seenSlugs.add(slug);
              return true;
            });

            if (cleanFiles.length === 0) return null;

            return (
              <div key={year} className="mb-8">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-rose-950 mb-4">{year}</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {cleanFiles
                    .sort((a, b) => {
                      const aMonth = monthOrder[a.month || extractMonthFromFilename(a.filename)] || 0;
                      const bMonth = monthOrder[b.month || extractMonthFromFilename(b.filename)] || 0;
                      return bMonth - aMonth;
                    })
                    .map((file) => {
                      const slug = file.slug || `${source}-${file.filename.replace('.xlsx', '')}`;
                      return (
                        <Link key={slug} href={`/FinancialReport/${encodeURIComponent(slug)}`}>
                          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow hover:shadow-lg transition-shadow p-5 hover:scale-[1.02] cursor-pointer">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                              {file.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {file.month} {file.year}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </section>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-fuchsia-900 mb-8">
        Financial Reports
      </h1>

      {/* --- Filter UI --- */}
      <div className="flex flex-wrap gap-4 justify-center mb-12 bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-white-500 uppercase mb-1 ml-1">Year</label>
          <select 
            className="p-2 border rounded-lg bg-white dark:bg-white-800 text-gray-900 dark:text-gray-900 outline-none ring-blue-500 focus:ring-2"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="All">All Years</option>
            {allYears.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-white-500 uppercase mb-1 ml-1">Report Type</label>
          <select 
            className="p-2 border rounded-lg bg-white dark:bg-white-800 text-gray-900 dark:text-gray-900 outline-none ring-blue-500 focus:ring-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="bank">Bank Statements</option>
            <option value="events">Event Reports</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
      ) : (
        <>
          {renderReportSection('Bank Statements', reports.bank, 'bank')}
          {renderReportSection('Event Reports', reports.events, 'events')}

          {Object.keys(reports.bank).length === 0 &&
            Object.keys(reports.events).length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
                No financial reports found.
              </p>
            )}
        </>
      )}
    </div>
  );
}