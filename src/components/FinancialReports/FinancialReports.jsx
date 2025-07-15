'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const extractMonthFromFilename = (filename) => {
  const match = filename.match(/([A-Za-z]+)-\d{4}/);
  return match ? match[1] : '';
};

export default function FinancialReports() {
  const [reports, setReports] = useState({ bank: {}, events: {} });
  const [loading, setLoading] = useState(true);

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

  const renderReportSection = (title, data, source) => {
    if (!data || Object.keys(data).length === 0) return null;

    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-green-800 mb-6 border-b border-gray-300 pb-2">
          {title}
        </h2>

        {Object.entries(data)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .map(([year, files]) => (
            <div key={year} className="mb-8">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-rose-950 mb-4">{year}</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {files
                  .sort((a, b) => {
                    const aMonth = monthOrder[a.month || extractMonthFromFilename(a.filename)] || 0;
                    const bMonth = monthOrder[b.month || extractMonthFromFilename(b.filename)] || 0;
                    return bMonth - aMonth;
                  })
                  .map((file) => {
                    if (!file.filename && !file.slug) return null;

                    const slug = file.filename
                      ? `${source}-${file.filename.replace('.xlsx', '')}`
                      : file.slug;

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
          ))}
      </section>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-fuchsia-900 mb-12">
        Financial Reports
      </h1>

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
