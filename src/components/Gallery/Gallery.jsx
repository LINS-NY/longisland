'use client';
import { useState } from "react";

// Nepali Dashin Program 2081 Images
const images = [
  { src: "/images/2024/Nepali Dashin Program 2081/1.jpg", alt: "Image 1" },
  { src: "/images/2024/Nepali Dashin Program 2081/20.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/19.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/2.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/3.jpg", alt: "Image 1" },
  { src: "/images/2024/Nepali Dashin Program 2081/4.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/5.jpg", alt: "Image 1" },
  { src: "/images/2024/Nepali Dashin Program 2081/6.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/7.jpg", alt: "Image 1" },
  { src: "/images/2024/Nepali Dashin Program 2081/8.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/9.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/10.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/11.jpg", alt: "Image 1" },
  { src: "/images/2024/Nepali Dashin Program 2081/12.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/12.jpg", alt: "Image 1" },
  { src: "/images/2024/Nepali Dashin Program 2081/14.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/15.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/16.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/17.jpg", alt: "Image 2" },
  { src: "/images/2024/Nepali Dashin Program 2081/18.jpg", alt: "Image 2" },

];


                    

export default function ImageGallery() {
    
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openPopup = (image) => {
    setSelectedImage(image);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null);
  };

  const goToNextImage = () => {
    const currentIndex = images.findIndex((img) => img.src === selectedImage.src);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const goToPreviousImage = () => {
    const currentIndex = images.findIndex((img) => img.src === selectedImage.src);
    const nextIndex = (currentIndex - 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const saveImage = () => {
    const a = document.createElement("a");
    a.href = selectedImage.src;
    a.download = selectedImage.alt;
    a.click();
  };

  return (
    <div>
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="text-center">
        <div className="flex justify-center font-bold font-serif text-2xl text-white py-1">
          Nepali Dashain Program 2081
        </div>
        <div className="flex justify-center font-bold font-serif text-2xl text-white py-1">
          (नेपाली दशैं कार्यक्रम २०८१)
        </div>
      </div>
    </div>
      {/* Thumbnail images */}
      <div className="gallery">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="thumbnail"
            onClick={() => openPopup(image)}
            style={{ width: "300px", height: "300px", margin: "30px", cursor: "pointer" }}
          />
        ))}
      </div>

      {/* Pop-up Image Viewer */}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={closePopup} style={overlayStyle}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()} style={popupStyle}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={{ maxWidth: "80vw", maxHeight: "80vh", marginBottom: "20px" }}
            />
            <div>
              <button onClick={saveImage}>Download</button>
              <button onClick={goToPreviousImage}>Previous</button>
              <button onClick={goToNextImage}>Next</button>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery {
          display: flex;
          flex-wrap: wrap;
        }
        .thumbnail {
          cursor: pointer;
        }
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-content {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        button {
          margin: 10px;
          padding: 10px;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #555;
        }
      `}</style>
    </div>
  );
}

// Inline styles
const overlayStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1000",
};

const popupStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};