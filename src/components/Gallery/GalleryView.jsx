import React, { useState } from 'react';

export default function GalleryView({ imagesByEvent }) {
  const [popupImg, setPopupImg] = useState(null);

  return (
    <>
      {imagesByEvent.length === 0 && (
        <p className="text-center text-gray-500">Please select a year to view events.</p>
      )}

      {imagesByEvent.map((event, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-xl font-bold text-green-800 mb-2">{event.event}</h2>
          <p className="mb-4 text-gray-600">{event.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {event.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={event.event}
                className="rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition cursor-pointer"
                onClick={() => setPopupImg(src)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Popup Image */}
      {popupImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPopupImg(null)}
        >
          <img src={popupImg} alt="popup" className="max-w-[90%] max-h-[80%] rounded-xl shadow-2xl" />
        </div>
      )}
    </>
  );
}
