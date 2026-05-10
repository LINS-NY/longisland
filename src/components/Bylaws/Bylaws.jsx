'use client';
import { useState } from "react";

const Bylaws = () => {
  const [error, setError] = useState("");

  const pdfUrl = "/Bylaws/LINSNY-BYLAWS_With 2nd Amendment_2024.pdf";

  const handleDownloadPdf = () => {
    try {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'LINSNY-BYLAWS.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError("Failed to download the PDF. Please try again later.");
    }
  };

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-center px-4">
        <div className="font-bold font-serif text-3xl text-white py-1">
          Long Island Nepalese Society, New York - Bylaws
        </div>
        <div className="font-bold font-serif text-3xl text-white py-1">
          लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क - विधान
        </div>
        <div className="text-red-200 font-bold text-xl mt-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 py-4 text-center px-4">
        <div className="font-bold font-serif text-2xl md:text-3xl text-white py-1">
          Long Island Nepalese Society, New York - Bylaws
        </div>
        <div className="font-bold font-serif text-2xl md:text-3xl text-white py-1">
          लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क - विधान
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-3 justify-center items-center my-5">
        <button
          onClick={handleDownloadPdf}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Download PDF
        </button>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
        >
          Open Bylaws
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 w-full">
        <iframe
          src={pdfUrl}
          className="w-full h-[80vh] md:h-screen"
          style={{ border: "none" }}
          title="LINSNY Bylaws PDF"
        />
      </div>

    </div>
  );
};

export default Bylaws;