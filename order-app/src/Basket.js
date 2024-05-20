// Basket.js
import React, { useState } from 'react';
import './Basket.css';
import OrderSummary from './OrderSummary'; // Import the OrderSummary component

const BasketSection = ({ basketItems, onPlaceOrder, onRemoveItem, onReduceQuantity, addQuantity }) => {
  const [showAddPopup, setShowAddPopup] = useState(false); 
  const [showRemovePopup, setShowRemovePopup] = useState(false); 
  const [addQuantityInput, setAddQuantityInput] = useState(""); 
  const [removeQuantityInput, setRemoveQuantityInput] = useState(""); 
  const [selectedItemIndex, setSelectedItemIndex] = useState(null); 
  const [requestInput, setRequestInput] = useState(""); 
  const [ticketNumber, setTicketNumber] = useState(null); // State to store the generated ticket number
  const [showOrderSummary, setShowOrderSummary] = useState(false); // State to control order summary visibility

  const handleAddQuantity = (index) => {
    setSelectedItemIndex(index); 
    setShowAddPopup(true); 
  };

  const handleRemoveQuantity = (index) => {
    setSelectedItemIndex(index); 
    setShowRemovePopup(true); 
  };

  const confirmAdd = () => {
    const quantityToAdd = parseInt(addQuantityInput);
    if (quantityToAdd > 0) {
      addQuantity(selectedItemIndex, quantityToAdd);
    }
    setShowAddPopup(false); 
    setAddQuantityInput(""); 
  };

  const confirmRemove = () => {
    const quantityToRemove = parseInt(removeQuantityInput);
    if (quantityToRemove > 0) {
      onReduceQuantity(selectedItemIndex, quantityToRemove); 
    }
    setShowRemovePopup(false); 
    setRemoveQuantityInput(""); 
  };

  const handleRequestChange = (e) => {
    setRequestInput(e.target.value);
  };

  const handlePlaceOrder = () => {
    // Generate a random ticket number
    const generatedTicketNumber = Math.floor(Math.random() * 1000000);
    setTicketNumber(generatedTicketNumber);
    setShowOrderSummary(true); // Show the order summary
    // Clear request input after placing order
    setRequestInput("");
    onPlaceOrder(); // Call the onPlaceOrder callback
  };
  

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    basketItems.forEach((item) => {
      const price = parseFloat(item.price.replace(' pesos', ''));
      totalPrice += price * item.quantity;
    });
    return totalPrice;
  };

 // Inside BasketSection component, just before rendering OrderSummary
console.log("Basket Items:", basketItems);


  return (
    <div className="basket-section">
      <h2>Basket</h2>
      <div className="basket-items-container">
        {basketItems.map((item, index) => (
          <div key={index} className="basket-item">
            <img src={item.image} alt={item.name} />
            <p>{item.name} - <span className="item-price">Price: ${item.price}</span><br/>Quantity: {item.quantity}</p>
            <button className="remove-button" onClick={() => handleRemoveQuantity(index)}>-</button>
            <button className="add-quantity-button" onClick={() => handleAddQuantity(index)}>+</button>
          </div>
        ))}
      </div>
      {basketItems.length > 0 && (
        <div className="request-input">
          <textarea
            value={requestInput}
            onChange={handleRequestChange} 
            placeholder="Any special requests? (e.g., No onions, extra sauce)"
          />
        </div>
      )}
      {showAddPopup && (
        <div className="popup">
          <h3>Add Item</h3>
          <p>How many would you like to add?</p>
          <input
            type="number"
            value={addQuantityInput}
            onChange={(e) => setAddQuantityInput(e.target.value)}
            placeholder="Enter quantity"
          />
          <button className="confirm-button" onClick={confirmAdd}>Confirm</button>
        </div>
      )}
      {showRemovePopup && (
        <div className="popup">
          <h3>Remove Item</h3>
          <p>How many would you like to remove?</p>
          <input
            type="number"
            value={removeQuantityInput}
            onChange={(e) => setRemoveQuantityInput(e.target.value)}
            placeholder="Enter quantity"
          />
          <button className="confirm-button" onClick={confirmRemove}>Confirm</button>
        </div>
      )}
      <div className="total-price">
        Total Price: ₱{calculateTotalPrice().toFixed(2)}
      </div>
      {basketItems.length > 0 && (
        <button className="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
      {/* Order summary */}
      {showOrderSummary && (
        <OrderSummary basketItems={basketItems} ticketNumber={ticketNumber} />
      )}
    </div>
  );
};

export default BasketSection;
