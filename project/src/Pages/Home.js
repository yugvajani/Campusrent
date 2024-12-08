import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isRatingsOpen, setIsRatingsOpen] = useState(true);

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="navbar-brand">Campus Rent</div>
        <div className="navbar-search">
          <input type="text" placeholder="Search for products, brands and more" />
          <button>🔍</button>
        </div>
        <div className="navbar-links">
          <a href="#">Login</a>
          <a href="#">More</a>
        </div>
      </header>

      <div className="content">
        <aside className="filters">
          <div className="filter-section">
            <div className="filter-header">
              <span>Filters</span>
              <button className="clear-button">CLEAR ALL</button>
            </div>

            <div className="filter-price">
              <span>PRICE</span>
              <div className="price-range">
                <input type="range" min="0" max="200000" />
                <div className="price-labels">
                  <span>₹0</span>
                  <span>₹200,000</span>
                </div>
              </div>
            </div>

            <div className="filter-category">
              <div
                className="dropdown-header"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <span>CATEGORY</span>
                <span>{isCategoryOpen ? "▲" : "▼"}</span>
              </div>
              {isCategoryOpen && (
                <ul>
                  <li><input type="radio" name="category" /> Electronics</li>
                  <li><input type="radio" name="category" /> Mobiles</li>
                  <li><input type="radio" name="category" /> Laptops</li>
                  <li><input type="radio" name="category" /> Fashion</li>
                  <li><input type="radio" name="category" /> Appliances</li>
                  <li><input type="radio" name="category" /> Home</li>
                </ul>
              )}
            </div>

            <div className="filter-ratings">
              <div
                className="dropdown-header"
                onClick={() => setIsRatingsOpen(!isRatingsOpen)}
              >
                <span>RATINGS</span>
                <span>{isRatingsOpen ? "▲" : "▼"}</span>
              </div>
              {isRatingsOpen && (
                <ul>
                  <li><input type="radio" name="rating" /> 4★ & above</li>
                  <li><input type="radio" name="rating" /> 3★ & above</li>
                  <li><input type="radio" name="rating" /> 2★ & above</li>
                  <li><input type="radio" name="rating" /> 1★ & above</li>
                </ul>
              )}
            </div>
          </div>
        </aside>

        <main className="product-view">
          {/* Product grid will go here */}
        </main>
      </div>
    </div>
  );
};

export default Home;