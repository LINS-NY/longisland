'use client';
import { useState } from "react";

const Bylaws = () => {
    const [error, setError] = useState("");

    // Function to handle the download of the PDF file
    const handleDownloadPdf = () => {
        try {
            const pdfUrl = "/Bylaws/LINSNY-BYLAWS_With 2nd Amendment_2024.pdf"; // Path to the PDF file in the public folder
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'LINSNY-BYLAWS.pdf'; // Name of the downloaded file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            setError("Failed to download the PDF. Please try again later.");
        }
    };

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="flex justify-center font-bold font-serif text-3xl text-white py-1">Long Island Nepalese Society, New York - Bylaws</div>
                <div className="flex justify-center font-bold font-serif text-3xl text-white py-1">लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क - विधान</div>
                <div className="text-red-500 font-bold text-xl mt-4">{error}</div>
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
                src="/Bylaws/LINSNY-BYLAWS_With 2nd Amendment_2024.pdf"
                width="100%"
                height="600px"
                style={{ border: "none" }}
                title="LINSNY Bylaws PDF"
                aria-label="LINSNY Bylaws PDF Viewer"
            >
                <p>Your browser does not support PDFs. Please download the PDF to view it: <a href="/Bylaws/LINSNY-BYLAWS.pdf">Download PDF</a>.</p>
            </iframe>
        </div>
    );
};

export default Bylaws;