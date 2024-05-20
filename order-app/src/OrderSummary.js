import React from 'react';

const OrderSummary = ({ basketItems, ticketNumber }) => {
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <ul>
        {basketItems.map((item, index) => (
          <li key={index}>{item.name} - {item.quantity} x {item.price}</li>
        ))}
      </ul>
      <p>Ticket Number: {ticketNumber}</p>
    </div>
  );
};

export default OrderSummary;
