'use client';
import { useState } from "react";

const Slider = ({imageList}) => {
    
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openPopup = (imageList) => {
    setSelectedImage(imageList);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null);
  };

  const goToNextImage = () => {
    const currentIndex = imageList.findIndex((img) => img.src === selectedImage.src);
    const nextIndex = (currentIndex + 1) % imageList.length;
    setSelectedImage(imageList[nextIndex]);
  };

  const goToPreviousImage = () => {
    // Check if selectedImage and imageList are defined and not empty
    if (!selectedImage || !imageList || imageList.length === 0) {
        console.error("No selected image or image list is empty.");
        return;
    }

    // Find the index of the selected image
    const currentIndex = imageList.findIndex((img) => img.src === selectedImage.src);

     // Handle case where the selected image is not found in the list
     if (currentIndex === -1) {
        console.error("Selected image not found in the image list.");
        return;
    }

    // Calculate the previous index (wrap around if necessary)
    const previousIndex = (currentIndex - 1 + imageList.length) % imageList.length;

    // Update the selected image
    setSelectedImage(imageList[previousIndex]);
  };

  const saveImage = () => {
    const a = document.createElement("a");
    a.href = selectedImage.src;
    a.download = selectedImage.alt;
    a.click();
  };

  return (
    <div>
      {/* Thumbnail images */}
      <div className="gallery">
        {imageList && imageList.map((imageList, index) => (
          <img
            key={index}
            src={imageList.src}
            alt={imageList.alt}
            className="thumbnail"
            onClick={() => openPopup(imageList)}
            style={{ width: "225px", height: "225px", margin: "30px", cursor: "pointer" }}
          />
        ))}
      </div>
      
      {/* Pop-up Image Viewer */}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={closePopup} style={overlayStyle}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()} style={popupStyle}>
            <img
               src={selectedImage?.src || imageList[0].src} // Fallback to the first image
               alt={selectedImage?.alt || imageList[0].alt} // Fallback to the first image's alt text
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

export default Slider