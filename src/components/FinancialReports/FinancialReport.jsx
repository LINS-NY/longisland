'use client';
import React from 'react';
import * as XLSX from 'xlsx';

export default function FinancialReport({ content }) {
  const [table, setTable] = React.useState(null);

  React.useEffect(() => {
    if (!content || !content.buffer) return;

    const data = new Uint8Array(content.buffer.data);
    const workbook = XLSX.read(data, { type: 'array' });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    setTable(json);
  }, [content]);

  if (!table) return <p className="text-center text-gray-500">Loading report...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        {content.title}
      </h1>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
            {table.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-2 text-sm ${
                      rowIndex === 0
                        ? 'font-bold text-gray-800 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
