'use client';
import { useState } from "react";

const Bylaws = () => {
    const [error, setError] = useState("");

    // Function to handle the download of the PDF file
    const handleDownloadPdf = () => {
        const pdfUrl = "/Bylaws/LINSNY-BYLAWS.pdf"; // Path to the PDF file
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'LINSNY-BYLAWS.pdf'; // Name of the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="flex justify-center font-bold font-serif text-3xl text-white py-1">Long Island Nepalese Society, New York - Bylaws</div>
                <div className="flex justify-center font-bold font-serif text-3xl text-white py-1">लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क - विधान</div>
                <div>{error}</div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="flex justify-center font-bold font-serif text-3xl text-white py-1">Long Island Nepalese Society, New York - Bylaws</div>
                <div className="flex justify-center font-bold font-serif text-3xl text-white py-1">लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क - विधान</div>
            </div>
            <div className="flex justify-center my-4">
                <button
                    onClick={handleDownloadPdf}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Download PDF
                </button>
            </div>
            <iframe
                src="/Bylaws/LINSNY-BYLAWS.pdf"
                width="100%"
                height="600px"
                style={{ border: "none" }}
            />
        </div>
    );
};

export default Bylaws;