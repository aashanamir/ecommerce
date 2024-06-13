import React, { useState, useEffect } from 'react';
import './style.css';

const Carousel = () => {
  const images = [
    {
      src: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/1f25201ced5d720d.jpg?q=20',
      alt: 'Slide 1',
    },
    {
      src: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/0e4fae4d5fcab33b.jpg?q=20',
      alt: 'Slide 2',
    },
    {
      src: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/f888f8f443a8a927.jpg?q=20',
      alt: 'Slide 3',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-button left" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="carousel-slide" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={index === currentIndex ? 'active' : 'inactive'}
          />
        ))}
      </div>
      <button className="carousel-button right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
