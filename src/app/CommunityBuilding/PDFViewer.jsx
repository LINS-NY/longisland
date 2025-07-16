'use client';

import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set correct PDF.js worker from UNPKG matching installed version
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border shadow overflow-auto max-h-[80vh]">
      <Document
        file={fileUrl}
        onLoadSuccess={onLoadSuccess}
        loading="Loading PDF..."
        error="Failed to load PDF"
        className="flex flex-col gap-2 items-center"
      >
        {Array.from(new Array(numPages), (_, i) => (
          <Page
            key={`page_${i + 1}`}
            pageNumber={i + 1}
            width={800} // you can adjust
          />
        ))}
      </Document>
    </div>
  );
};

export default PDFViewer;
