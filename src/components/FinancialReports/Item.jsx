'use client';
import React from 'react';

export default function FinancialReportItem({ content }) {
  if (!content) return <div className="text-center text-gray-500">No data available</div>;

  const {
    title,
    location,
    rowHeading,
    content: rows,
    balanceHeading,
    month,
    year,
    sheetId,
    date,
  } = content;

  const isBankStatement = title.toLowerCase().includes('statement');

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-pale-yellow mb-1">
          {title}
        </h2>
        {(month || year) && (
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            {month && `${month} `}{year && `${year}`}
          </p>
        )}
        {date && (
          <p className="text-sm text-gray-400 dark:text-gray-500">Retrieved on: {date}</p>
        )}
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow rounded-xl">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              {(isBankStatement ? balanceHeading : rowHeading).map((heading, index) => (
                <th key={index} className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows && rows.length > 0 ? (
              rows.map((row, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}`}
                >
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={(isBankStatement ? balanceHeading : rowHeading).length} className="px-4 py-6 text-center text-gray-400">
                  No rows found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
