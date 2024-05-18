import React, { useState } from 'react';
import './Basket.css';

const BasketSection = ({ basketItems, onPlaceOrder, onRemoveItem, onReduceQuantity, addQuantity }) => {
  const [showAddPopup, setShowAddPopup] = useState(false); // State to control add popup
  const [showRemovePopup, setShowRemovePopup] = useState(false); // State to control remove popup
  const [addQuantityInput, setAddQuantityInput] = useState(""); // State for add quantity input
  const [removeQuantityInput, setRemoveQuantityInput] = useState(""); // State for remove quantity input
  const [selectedItemIndex, setSelectedItemIndex] = useState(null); // State to track the index of the selected item
  const [requestInput, setRequestInput] = useState(""); // State for user requests

  // Function to handle adding quantity to an existing item
  const handleAddQuantity = (index) => {
    setSelectedItemIndex(index); // Set the selected item index
    setShowAddPopup(true); // Show the add popup
  };

  // Function to handle removing quantity from an existing item
  const handleRemoveQuantity = (index) => {
    setSelectedItemIndex(index); // Set the selected item index
    setShowRemovePopup(true); // Show the remove popup
  };

  // Function to confirm addition of item with specified quantity
  const confirmAdd = () => {
    const quantityToAdd = parseInt(addQuantityInput);
    if (quantityToAdd > 0) {
      addQuantity(selectedItemIndex, quantityToAdd);
    }
    setShowAddPopup(false); // Close the add popup
    setAddQuantityInput(""); // Reset add quantity input after handling
  };

  // Function to confirm removal of item with specified quantity
  const confirmRemove = () => {
    const quantityToRemove = parseInt(removeQuantityInput);
    if (quantityToRemove > 0) {
      onReduceQuantity(selectedItemIndex, quantityToRemove); // Reduce quantity if input is less than quantity
    }
    setShowRemovePopup(false); // Close the remove popup
    setRemoveQuantityInput(""); // Reset remove quantity input after handling
  };

  // Function to handle user requests
  const handleRequestChange = (e) => {
    setRequestInput(e.target.value);
  };

  // Function to handle placing the order
  const handlePlaceOrder = () => {
    // Place order logic goes here
    // Clear request input after placing order
    setRequestInput("");
    // Other logic for placing the order
    onPlaceOrder();
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    basketItems.forEach((item) => {
      const price = parseFloat(item.price.replace(' pesos', ''));
      totalPrice += price * item.quantity;
    });
    return totalPrice;
  };

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
      {/* User request input */}
      {basketItems.length > 0 && (
        <div className="request-input">
          <textarea
            value={requestInput}
            onChange={handleRequestChange} 
            placeholder="Any special requests? (e.g., No onions, extra sauce)"
          />
        </div>
      )}
      {/* Add popup */}
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
      {/* Remove popup */}
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
      {/* Total price */}
      <div className="total-price">
        Total Price: ₱{calculateTotalPrice().toFixed(2)}
      </div>
      {basketItems.length > 0 && (
        <button className="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
    </div>
  );
};

export default BasketSection;
