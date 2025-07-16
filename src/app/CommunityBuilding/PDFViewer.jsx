'use client';

import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Required for react-pdf to load PDFs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  return (
    <div className="bg-white p-4 rounded-xl border shadow overflow-auto max-h-[80vh]">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading="Loading PDF..."
        error="Failed to load PDF"
        className="flex flex-col gap-2 items-center"
      >
        {Array.from(new Array(numPages), (_, i) => (
          <Page key={`page_${i + 1}`} pageNumber={i + 1} />
        ))}
      </Document>
    </div>
  );
};

export default PDFViewer;
