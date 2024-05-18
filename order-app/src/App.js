import React, { useState } from 'react';
import BasketSection from './Basket';
import AppetizerSection from './AppetizerSection'; 
import MainCourseSection from './MainCourseSection'; 
import DrinkSection from './DrinkSection';
import DessertSection from './DessertSection';
import Homepage from './Homepage'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faBasketShopping, faCake, faGlassWater, faBars } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [basketItems, setBasketItems] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const addToBasket = (item) => {
    setBasketItems([...basketItems, item]);
  };

  const removeFromBasket = (index) => {
    const updatedBasket = [...basketItems];
    updatedBasket.splice(index, 1);
    setBasketItems(updatedBasket);
  };

  const reduceQuantity = (index, quantityToRemove) => {
    const updatedBasketItems = [...basketItems];
    const updatedItem = { ...updatedBasketItems[index] };
    updatedItem.quantity -= quantityToRemove;
  
    // If quantity becomes zero, remove the item from the basket
    if (updatedItem.quantity <= 0) {
      updatedBasketItems.splice(index, 1);
    } else {
      updatedBasketItems[index] = updatedItem;
    }
  
    setBasketItems(updatedBasketItems);
  };
   const addQuantity = (index, amount) => {
    const updatedBasket = [...basketItems];
    updatedBasket[index].quantity += amount; // Increase the quantity by the specified amount
    setBasketItems(updatedBasket);
  };
  

  const placeOrder = () => {
    console.log('Placing order:', basketItems);
    setBasketItems([]);
  };

  // Function to calculate the total price
const calculateTotalPrice = () => {
  let totalPrice = 0;
  basketItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return totalPrice;
};


  return (
    <div className="app">
      <button className="menu-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <nav className={`navbar ${sidebarOpen ? 'open' : ''}`}>
        <h2>Anre Foodshop</h2>
        <h3>best since 1996</h3>
        <div className="separator"></div>
        <h3>Menu</h3>
        <ul>
          <li>
            <button onClick={() => setActiveSection('appetizer')}>
              <FontAwesomeIcon icon={faUtensils} /> Appetizer
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection('main-course')}>
              <FontAwesomeIcon icon={faUtensils} /> Main Course
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection('Drink')}>
              <FontAwesomeIcon icon={faGlassWater} /> Drinks
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection('Dessert')}>
              <FontAwesomeIcon icon={faCake} /> Dessert
            </button>
          </li>
        </ul>
        <h3>Order</h3>
        <ul>
          <li>
            <button onClick={() => setActiveSection('Basket')}>
              <FontAwesomeIcon icon={faBasketShopping} /> Basket
            </button>
          </li>
        </ul>
      </nav>
      <div className="content">
        {activeSection === 'appetizer' && <AppetizerSection addToBasket={addToBasket} />}
        {activeSection === 'main-course' && <MainCourseSection addToBasket={addToBasket} />}
        {activeSection === 'Drink' && <DrinkSection addToBasket={addToBasket} />}
        {activeSection === 'Dessert' && <DessertSection addToBasket={addToBasket} />}
        {activeSection === 'Basket' && <BasketSection basketItems={basketItems} onPlaceOrder={placeOrder} onRemoveItem={removeFromBasket} onReduceQuantity={reduceQuantity} addQuantity={addQuantity} />}

        {!activeSection && <Homepage />}
        

        
      </div>
    </div>
  );
}

export default App;
