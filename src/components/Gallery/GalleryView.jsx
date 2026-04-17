'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Image from "next/image";

// --- SUB-COMPONENT FOR EACH EVENT SECTION ---
function EventSection({ event, onImageClick }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (event.driveFolderId) {
      setLoading(true);
      fetch(`/api/gallery?folderId=${event.driveFolderId}`)
        .then((res) => res.json())
        .then((data) => {
          setImages(data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [event.driveFolderId]);

  if (loading) return <p className="text-gray-400 animate-pulse py-4">Loading {event.event}...</p>;
  if (images.length === 0) return null;

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-green-800 mb-2">{event.event}</h2>
      <p className="mb-6 text-gray-600 italic border-l-4 border-green-500 pl-4">{event.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, imgIdx) => (
          <div key={imgIdx} className="relative h-64 w-full overflow-hidden rounded-xl shadow-lg cursor-pointer bg-gray-100" onClick={() => onImageClick(images, imgIdx)}>
            <Image src={src} alt={event.event} fill unoptimized className="object-cover hover:scale-105 transition duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN GALLERY VIEW COMPONENT ---
export default function GalleryView({ imagesByEvent }) {
  const [popupImage, setPopupImage] = useState(null);
  const [currentAlbum, setCurrentAlbum] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures portal only renders on client
  }, []);

  const closePopup = useCallback(() => {
    setPopupImage(null);
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') closePopup(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closePopup]);

  const openPopup = (album, index) => {
    setCurrentAlbum(album);
    setActiveImageIndex(index);
    setPopupImage(album[index]);
    document.body.style.overflow = 'hidden';
  };

  const showNext = (e) => {
    e.stopPropagation();
    const next = (activeImageIndex + 1) % currentAlbum.length;
    setActiveImageIndex(next);
    setPopupImage(currentAlbum[next]);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    const prev = (activeImageIndex - 1 + currentAlbum.length) % currentAlbum.length;
    setActiveImageIndex(prev);
    setPopupImage(currentAlbum[prev]);
  };

  // The actual Modal UI
  const Modal = () => (
    <div 
      className="fixed inset-0 bg-black flex items-center justify-center p-0 m-0"
      style={{ zIndex: 999999, width: '100vw', height: '100vh', top: 0, left: 0 }}
      onClick={closePopup}
    >
      {/* Navigation Buttons */}
      <button onClick={closePopup} className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-3 rounded-full z-[1000001]">
        <X size={32} />
      </button>

      <button onClick={showPrev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 z-[1000001]">
        <ArrowLeft size={40} />
      </button>

      {/* Image: No gaps, forced center */}
      <div className="w-full h-full flex items-center justify-center pointer-events-none p-4">
        <img 
          src={popupImage} 
          alt="Preview" 
          className="max-h-full max-w-full object-contain pointer-events-auto"
          onClick={(e) => e.stopPropagation()} 
        />
      </div>

      <button onClick={showNext} className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 z-[1000001]">
        <ArrowRight size={40} />
      </button>

      <div className="absolute bottom-6 text-white/40 font-mono text-sm pointer-events-none">
        {activeImageIndex + 1} / {currentAlbum.length}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {imagesByEvent.map((event, idx) => (
          <EventSection key={idx} event={event} onImageClick={openPopup} />
        ))}
      </div>

      {/* Portal renders the modal at the body level to avoid layout shifts */}
      {mounted && popupImage && createPortal(<Modal />, document.body)}
    </div>
  );
}