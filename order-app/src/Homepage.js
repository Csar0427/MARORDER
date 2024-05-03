import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import BestSellers from './BestSellers'; // Import the component for best sellers

const Homepage = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === totalItems - 1 ? 0 : prevIndex + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [totalItems]);

  const [basketItems, setBasketItems] = useState([]); // State for basket items

  const addToBasket = (product) => {
    // Add the selected product to the basket
    setBasketItems((prevItems) => [...prevItems, product]);
  };

  const bestSellers = [
    { name: 'Product 1', imageSrc: 'https://via.placeholder.com/150x150', price: '$10.00' },
    { name: 'Product 2', imageSrc: 'https://via.placeholder.com/150x150', price: '$15.00' },
    { name: 'Product 3', imageSrc: 'https://via.placeholder.com/150x150', price: '$20.00' },
    { name: 'Product 4', imageSrc: 'https://via.placeholder.com/150x150', price: '$10.00' },
    // Add more best-selling products here
  ];

  return (
    <div className="homepage">
      <div className="carousel-wrapper">
        <div className="carousel" ref={carouselRef}>
          <div className="carousel-item">
            <img src={`https://via.placeholder.com/800x400/FF5733/FFFFFF?text=Image+${currentIndex + 1}`} alt={`Carousel Image ${currentIndex + 1}`} />
          </div>
        </div>
      </div>
      {/* Other homepage content can go here */}
      <h1><i className="fas fa-coffee"></i> BEST SELLERS</h1>
      <div className="separator"></div>
      <BestSellers bestSellers={bestSellers} addToBasket={addToBasket} />
    </div>
  );
}

export default Homepage;

