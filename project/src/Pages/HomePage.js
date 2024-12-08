import React, { useState } from "react";
import { useEffect } from "react"; 
import "../CSS/Home.css";

const Home = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isRatingsOpen, setIsRatingsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Rent");
  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("No authentication token found. Please log in.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setUserFullName(result.data.name);
        } else {
          alert(`Failed to fetch user info: ${result.msg}`);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        alert("An error occurred while fetching user info.");
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "./";
  };

  const products = [
    {
      id: 1,
      name: "Converse All Star",
      brand: "Converse",
      description: "Lorem Ipsum is simply dummy text of the printing...",
      price: "$40",
      rating: "4.1",
      image: "https://via.placeholder.com/150", // Replace with an actual image URL
    },
    {
      id: 2,
      name: "Nike running shoes",
      brand: "Nike",
      description: "Lorem ipsum dolor sit amet, graeco...",
      price: "$50",
      rating: "3.9",
      image: "https://via.placeholder.com/150", // Replace with an actual image URL
    },
    {
      id: 1,
      name: "Converse All Star",
      brand: "Converse",
      description: "Lorem Ipsum is simply dummy text of the printing...",
      price: "$40",
      rating: "4.1",
      image: "https://via.placeholder.com/150", // Replace with an actual image URL
    },
    {
      id: 2,
      name: "Nike running shoes",
      brand: "Nike",
      description: "Lorem ipsum dolor sit amet, graeco...",
      price: "$50",
      rating: "3.9",
      image: "https://via.placeholder.com/150", // Replace with an actual image URL
    },
    {
      id: 1,
      name: "Converse All Star",
      brand: "Converse",
      description: "Lorem Ipsum is simply dummy text of the printing...",
      price: "$40",
      rating: "4.1",
      image: "https://via.placeholder.com/150", // Replace with an actual image URL
    },
    {
      id: 2,
      name: "Nike running shoes",
      brand: "Nike",
      description: "Lorem ipsum dolor sit amet, graeco...",
      price: "$50",
      rating: "3.9",
      image: "https://via.placeholder.com/150", // Replace with an actual image URL
    },
    {
      id: 1,
      name: "Converse All Star",
      brand: "Converse",
      description: "Lorem Ipsum is simply dummy text of the printing...",
      price: "$40",
      rating: "4.1",
      image: "https://via.placeholder.com/150", // Replace with an actual image URL
    },
    {
      id: 2,
      name: "Nike running shoes",
      brand: "Nike",
      description: "Lorem ipsum dolor sit amet, graeco...",
      price: "$50",
      rating: "3.9",
      image: "https://via.placeholder.com/150", // Replace with an actual image URL
    },
    {
      id: 1,
      name: "Converse All Star",
      brand: "Converse",
      description: "Lorem Ipsum is simply dummy text of the printing...",
      price: "$40",
      rating: "4.1",
      image: "https://via.placeholder.com/150", // Replace with an actual image URL
    },
    {
      id: 2,
      name: "Nike running shoes",
      brand: "Nike",
      description: "Lorem ipsum dolor sit amet, graeco...",
      price: "$50",
      rating: "3.9",
      image: "https://via.placeholder.com/150", // Replace with an actual image URL
    },
    // Repeat as needed...
  ];

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="navbar-brand">Campus Rent</div>
        <div className="navbar-search">
          <input type="text" placeholder="Search for products, brands and more" />
          <button>🔍</button>
        </div>
        <div className="navbar-links">
          <a href="/profile">Profile</a>
          <a href="./" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>
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

        {/* Toggle Bar and Products */}
        <main className="main-content">
          <div className="toggle-bar">
            <button
              className={`toggle-option ${selectedOption === "Rent" ? "active" : ""}`}
              onClick={() => setSelectedOption("Rent")}
            >
              Rent
            </button>
            <button
              className={`toggle-option ${
                selectedOption === "Looking to Lend?" ? "active" : ""
              }`}
              onClick={() => setSelectedOption("Looking to Lend?")}
            >
              Looking to Lend?
            </button>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-brand">By {product.brand}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <span className="product-rating">
                      {product.rating} ★
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
