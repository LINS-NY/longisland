'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Image from 'next/image';

export default function GalleryView({ imagesByEvent = [] }) {
  const [popupImage, setPopupImage] = useState(null);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // keep activeImageIndex in range if event changes
    if (!imagesByEvent[activeEventIndex]) {
      setActiveEventIndex(0);
      setActiveImageIndex(0);
    } else {
      const len = imagesByEvent[activeEventIndex].images?.length || 0;
      if (activeImageIndex >= len) setActiveImageIndex(0);
    }
  }, [imagesByEvent, activeEventIndex, activeImageIndex]);

  const openPopup = (eventIndex, imageIndex) => {
    setActiveEventIndex(eventIndex);
    setActiveImageIndex(imageIndex);
    setPopupImage(imagesByEvent[eventIndex].images[imageIndex]);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  const showPrev = (e) => {
    e?.stopPropagation();
    const images = imagesByEvent[activeEventIndex]?.images || [];
    if (!images.length) return;
    const prevIndex = (activeImageIndex - 1 + images.length) % images.length;
    setActiveImageIndex(prevIndex);
    setPopupImage(images[prevIndex]);
  };

  const showNext = (e) => {
    e?.stopPropagation();
    const images = imagesByEvent[activeEventIndex]?.images || [];
    if (!images.length) return;
    const nextIndex = (activeImageIndex + 1) % images.length;
    setActiveImageIndex(nextIndex);
    setPopupImage(images[nextIndex]);
  };

  return (
    <>
      {(!imagesByEvent || imagesByEvent.length === 0) && (
        <p className="text-center text-gray-500">Please select a year to view events.</p>
      )}

      {imagesByEvent.map((event, eventIdx) => (
        <div key={eventIdx} className="mb-12">
          <h2 className="text-xl font-bold text-green-800 mb-2">{event.event}</h2>
          {event.description && <p className="mb-4 text-gray-600">{event.description}</p>}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {(event.images || []).map((src, imgIdx) => (
              <button
                key={imgIdx}
                type="button"
                onClick={() => openPopup(eventIdx, imgIdx)}
                className="block focus:outline-none"
                aria-label={`Open image ${imgIdx + 1} of ${event.event}`}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded">
                  <Image
                    src={src}
                    alt={event.event || `image-${imgIdx}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={imgIdx === 0}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Popup Viewer */}
      {popupImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closePopup}
        >
          <div
            className="relative w-full max-w-[90vw] max-h-[90vh] bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Constrain aspect and use Image fill */}
            <div className="relative w-full h-[70vh] md:h-[80vh] rounded-xl overflow-hidden">
              <Image
                src={popupImage}
                alt="popup"
                fill
                sizes="(max-width: 768px) 90vw, 80vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>

            {/* Controls */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev(e);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
              aria-label="Previous image"
            >
              <ArrowLeft />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext(e);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
              aria-label="Next image"
            >
              <ArrowRight />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                closePopup();
              }}
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2 shadow hover:bg-red-100"
              aria-label="Close"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
