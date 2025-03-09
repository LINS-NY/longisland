'use client';
import mammoth from "mammoth";
import { useState, useEffect } from "react";

const Bylaws = () => {
    const [htmlContent, setHtmlContent] = useState("");
    const [error, setError] = useState("");

    // Function to fetch and convert the .docx file
    useEffect(() => {
        const fetchAndConvertDocx = async () => {
            try {
                // Fetch the .docx file from the public folder
                const response = await fetch("/Bylaws/LINSNY-BYLAWS.pdf");
                if (!response.ok) {
                    throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
                }
                const file = await response.arrayBuffer();
                console.log("File fetched successfully:", file);

                // Convert the .docx file to HTML
                const result = await mammoth.convertToHtml({ arrayBuffer: file });
                setHtmlContent(result.value);
            } catch (error) {
                console.error("Error fetching or converting the document:", error);
                setError(" ");
            }
        };

        fetchAndConvertDocx();
    }, []);

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="flex justify-center font-bold font-serif text-3xl text-white py-1">Long Island Nepalese Society, New York - Bylaws</div>
                <div className="flex justify-center font-bold font-serif text-3xl text-white py-1">लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क - विधान</div>                
                <div>{error}</div>
                <iframe
                src="/Bylaws/LINSNY-BYLAWS.pdf"
                width="100%"
                height="600px"
                style={{ border: "none" }}
            />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="flex justify-center font-bold font-serif text-3xl text-white py-1">Long Island Nepalese Society, New York - Bylaws</div>
                <div className="flex justify-center font-bold font-serif text-3xl text-white py-1">लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क - विधान</div>
                </div>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
};

export default Bylaws;