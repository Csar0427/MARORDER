import React from 'react';

const BasketSection = ({ basketItems, onPlaceOrder }) => {
  return (
    <div className="basket-section">
      <h2>Basket</h2>
      <div className="basket-items-container">
        {basketItems.map((item, index) => (
          <div key={index} className="basket-item">
            <img src={item.image} alt={item.name} />
            <p>{item.name} - Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
      {basketItems.length > 0 && (
        <button className="place-order-button" onClick={onPlaceOrder}>Place Order</button>
      )}
    </div>
  );
}

export default BasketSection;