import React, { useState } from 'react';
import './App.css';
import drinks from './database/drinksDb'

const DrinkSection = () => {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [quantity, setQuantity] = useState(1); // State for quantity

  const handleItemClick = (index) => {
    setSelectedDrink(drinks[index]);
    setDescriptionVisible(true);
  };

  const handleCloseDescription = () => {
    setSelectedDrink(null);
    setDescriptionVisible(false);
  };

  const handleOrder = () => {
    // Handle order logic here, you can use selectedDrink and quantity state
    console.log(`Ordered ${quantity} of ${selectedDrink.name}`);
  };

  return (
    <div className="drink-section">
      <h2>Drinks</h2>
      <p>Quench your thirst with our refreshing drinks.</p>
      <div className="drink-menu">
        {drinks.map((drink, index) => (
          <div key={index} className="drink-item" onClick={() => handleItemClick(index)}>
            <div className="column-left">
              <h3>{drink.name}</h3>
              <p>{drink.price}</p>
              <button>View</button>
              <button onClick={() => { setSelectedDrink(drink); setDescriptionVisible(true); }}>Order</button>
            </div>
            <div className="column-right">
              <img src={drink.image} alt={drink.name} />
            </div>
          </div>
        ))}
      </div>
      {selectedDrink && descriptionVisible && (
        <div className="drink-description">
          <div className="description-content">
            <h3>{selectedDrink.name}</h3>
            <p>{selectedDrink.description}</p>
            <div className="quantity-counter">
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} style={{ width: '50px', fontSize: '14px' }} />
            </div>
            <div className="button-group">
              <button onClick={handleCloseDescription}>Close</button>
              <button onClick={handleOrder}>Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DrinkSection;
