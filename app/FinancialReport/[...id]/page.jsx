import { getFinancialDocs } from '@/lib/financialReader';
import Image from 'next/image';

export default async function FinancialReportPage(props) {
  const { id } = await props.params; // ✅ this avoids the runtime error
  const slug = decodeURIComponent(id);
  const data = await getFinancialDocs(slug);

  if (!data) {
    return <div>Report not found.</div>;
  }

  function toTitleCase(str) {
    return str
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <Image
          src="/LINS.png"
          width={100}
          height={100}
          alt="LINS Logo"
          className="rounded-full"
        />
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-sm">
          {toTitleCase(data.title)}
        </h1>
      </div>

      {data.sheets.map((sheet) => {
        const rows = sheet.data;
        if (!rows || rows.length === 0) return null;

        // Detect and remove rows that only contain empty headers
        const meaningfulRows = rows.filter(
          (row) =>
            Object.keys(row).some((key) => !key.startsWith("__EMPTY")) &&
            Object.values(row).some((value) => value !== "")
        );

        return (
          <div key={sheet.name} className="mb-16 border border-gray-300 rounded-md shadow-sm overflow-auto">
            <h2 className="text-xl font-semibold bg-blue-50 text-blue-800 px-4 py-2 border-b border-gray-300">
              {sheet.name}
            </h2>

            <table className="min-w-full table-auto text-sm text-left text-gray-900 dark:text-white">
              <tbody>
                {meaningfulRows.map((row, rowIndex) => {
                  const values = Object.values(row);

                  const isHeaderMergeRow =
                    values.length > 1 &&
                    values.slice(1).every((v) => v === "") &&
                    values[0] &&
                    values[0].toString().trim() !== "";

                  const isTableHeader =
                    values.length >= 3 &&
                    values.includes("Description") &&
                    values.includes("Deposit");

                  return (
                    <tr
                      key={rowIndex}
                      className={
                        isTableHeader
                          ? "bg-blue-100 dark:bg-blue-900 font-bold text-blue-800 dark:text-blue-200 text-center uppercase tracking-wide"
                          : rowIndex % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                      }
                    >
                      {isHeaderMergeRow ? (
                        <td colSpan={values.length} className="text-center font-bold text-lg py-3 text-gray-800">
                          {values[0]}
                        </td>
                      ) : (
                        values.map((cell, i) => (
                          <td
                            key={i}
                            className={`border border-gray-300 px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 ${isTableHeader ? 'text-center font-bold text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-900 uppercase' :
                                typeof cell === 'number' ? 'text-right' : 'text-left'
                              }`}
                          >
                            {cell}
                          </td>
                        ))
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
      {/* ✅ Footer here */}
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 border-t pt-6">
        © {new Date().getFullYear()} Long Island Nepalese Society, New York. All rights reserved.
        <br />
        Unauthorized sharing or use of the content of these documents is strictly prohibited.
      </footer>
    </div>

  );
}
