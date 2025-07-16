'use client';

import { useState } from "react";
import PDFViewer from '../Shared/PDFViewer'; // adjust path if needed

const Bylaws = () => {
  const [error, setError] = useState("");
  const pdfUrl = "/Bylaws/LINSNY-BYLAWS-Proposed.pdf";

  const handleDownloadPdf = () => {
    try {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'LINSNY-BYLAWS-Proposed.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError("Failed to download the PDF. Please try again later.");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4">
        <h1 className="font-bold font-serif text-3xl">Long Island Nepalese Society, New York - Bylaws</h1>
        <h2 className="font-bold font-serif text-3xl mt-1">लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क - विधान</h2>
        {error && <p className="text-red-300 mt-2">{error}</p>}
      </div>

      <div className="flex justify-center my-4">
        <button
          onClick={handleDownloadPdf}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ⬇️ Download PDF
        </button>
      </div>

      <div className="px-4 pb-8">
        <PDFViewer fileUrl={pdfUrl} />
      </div>
    </div>
  );
};

export default Bylaws;
