import React, { useState } from 'react';
import Basket from './Basket';
import AppetizerSection from './AppetizerSection'; 
import MainCourseSection from './MainCourseSection'; 
import DrinkSection from './DrinkSection';
import DessertSection from './DessertSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faBasketShopping, faCake, faGlassWater, faBars } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  // State to track which section is active
  const [activeSection, setActiveSection] = useState(null);
  // State to track the visibility of the sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State to manage the basket items
  const [basketItems, setBasketItems] = useState([]);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to add an item to the basket
  const addToBasket = (item) => {
    setBasketItems([...basketItems, item]);
  };

  // Function to place the order
  const placeOrder = () => {
    // Implement order placement logic here
    console.log('Placing order:', basketItems);
    // Clear the basket after placing the order
    setBasketItems([]);
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
        {activeSection === 'Basket' && <Basket basketItems={basketItems} onPlaceOrder={placeOrder} />}
      </div>
    </div>
  );
}

export default App;
