'use client';
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Image from "next/image";


export default function GalleryView({ imagesByEvent }) {
  const [popupImage, setPopupImage] = useState(null);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openPopup = (eventIndex, imageIndex) => {
    setActiveEventIndex(eventIndex);
    setActiveImageIndex(imageIndex);
    setPopupImage(imagesByEvent[eventIndex].images[imageIndex]);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  const showPrev = () => {
    const images = imagesByEvent[activeEventIndex].images;
    const prevIndex = (activeImageIndex - 1 + images.length) % images.length;
    setActiveImageIndex(prevIndex);
    setPopupImage(images[prevIndex]);
  };

  const showNext = () => {
    const images = imagesByEvent[activeEventIndex].images;
    const nextIndex = (activeImageIndex + 1) % images.length;
    setActiveImageIndex(nextIndex);
    setPopupImage(images[nextIndex]);
  };

  return (
    <>
      {imagesByEvent.length === 0 && (
        <p className="text-center text-gray-500">Please select a year to view events.</p>
      )}

      {imagesByEvent.map((event, eventIdx) => (
        <div key={eventIdx} className="mb-12">
          <h2 className="text-xl font-bold text-green-800 mb-2">{event.event}</h2>
          <p className="mb-4 text-gray-600">{event.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {event.images.map((src, imgIdx) => (
              <Image
                key={imgIdx}
                src={src}
                alt={event.event}
                className="rounded-xl shadow-md object-cover w-[300px] h-[300px] cursor-pointer hover:scale-105 transition duration-300"
                onClick={() => openPopup(eventIdx, imgIdx)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Popup Viewer */}
      {popupImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={closePopup}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex justify-center items-center">
            <Image
              src={popupImage}
              alt="popup"
              className="rounded-xl max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
            >
              <ArrowRight />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closePopup();
              }}
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2 shadow hover:bg-red-100"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
