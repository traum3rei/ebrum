import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ImageGallery.css";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://cyb-be.vercel.app/api/images");
      setImages(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching images");
      setLoading(false);
      console.error("Error fetching images:", err);
    }
  };

  const handleImageClick = (image) => {
    setFullscreenImage(image);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="image-gallery">
      {/* Title Section */}
      <h1 className="gallery-title">Things that made me think of you</h1>

      {/* Gallery container */}
      <div className="gallery-container">
        {images.map((image, index) => (
          <div className="gallery-item" key={index}>
            <img
              src={image.url}
              alt={`Image ${index}`}
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </div>

      {/* Fullscreen overlay */}
      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={handleCloseFullscreen}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <img src={fullscreenImage.url} alt="Fullscreen" />
            <button onClick={handleCloseFullscreen}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
