import React from 'react';
import './homepage.css';

const Homepage = ({ onOpenNavbar }) => {
  return (
    <div className="homepage">
      {/* Anre Foodshop Title */}
      <h1 className="title">Anre Foodshop</h1>

      {/* Separator Line */}
      <div className="homeseparator"></div>

      {/* Header with Photo */}
      <div className="header">
        <img src="https://via.placeholder.com/1200x300" alt="Restaurant Header" />
      </div>
      
      {/* Restaurant Information */}
      <div className="restaurant-info">
        <p>Welcome to Anre Foodshop, serving delicious meals since 1996. Our menu offers a variety of appetizers, main courses, drinks, and desserts to satisfy your cravings. Visit us and experience the taste of excellence!</p>
        <p>Location: 123 Main Street, Valenzuela City</p>
        <p>Contact: +63 9608423879</p>
        {/* Button to open navbar */}
        <button onClick={onOpenNavbar}>Start Ordering</button>
      </div>
    </div>
  );
}

export default Homepage;


