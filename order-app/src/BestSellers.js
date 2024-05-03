import React from 'react';

const BestSellers = ({ bestSellers, addToBasket }) => {
  return (
    <div className="best-sellers">
      {bestSellers.map((product, index) => (
        <div key={index} className="product-container">
          <img src={product.imageSrc} alt={product.name} className="product-image" />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button className="order-button" onClick={() => addToBasket(product)}>Order</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BestSellers;
