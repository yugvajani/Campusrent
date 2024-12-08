import React, { useState, useEffect } from "react";
import "../CSS/HomePage.css";

const HomePage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isRatingsOpen, setIsRatingsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Rent");
  const [userFullName, setUserFullName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [priceRange, setPriceRange] = useState(2000);
  const [rentalProducts, setRentalProducts] = useState([]);
  const [lendProducts, setLendProducts] = useState([]);
  const [username, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        // alert("No authentication token found. Please log in.");
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
          setUserName(result.data.name);
        } else {
          // alert(`Failed to fetch user info: ${result.msg}`);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        // alert("An error occurred while fetching user info.");
      }
    };

    fetchUserInfo();
  }, []);

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

  const handleClearFilter = () => {
    setSelectedCategory(null);
    setSelectedRating(null);
    setPriceRange(2000);
  };

  useEffect(() => {
    const fetchRentalProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/api/items/available/items", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (response.ok) {
          setRentalProducts(result); // Set the rental products dynamically
        } else {
          // alert("Failed to fetch rental products.");
        }
      } catch (error) {
        console.error("Error fetching rental products:", error);
        // alert("An error occurred while fetching rental products.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchRentalProducts();
  }, []);

  useEffect(() => {
    const fetchLendProducts = async (username) => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("authToken"); // Get auth token

            const response = await fetch(`http://localhost:3000/api/items/lend`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include token for userMiddleware
                    username, // Add username to headers
                },
            });

            const result = await response.json();

            if (response.ok) {
                setLendProducts(result.data); // Set lend products
            } else {
                console.error(`Failed to fetch lent products: ${result.message}`);
            }
        } catch (error) {
            console.error("Error fetching lend products:", error);
        } finally {
            setIsLoading(false);
        }
    };
      fetchLendProducts(username);
  }, [username]);

  // Filter products based on the price range
  // const getFilteredProducts = () => {
  //   return products.filter((product) => {
  //     const productPrice = Number(product.price.replace("$", ""));
  //     return productPrice <= priceRange;
  //   });
  // };

  // const filteredProducts = getFilteredProducts();

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="navbar-brand">Campus Rent</div>
        <div className="navbar-search">
          <input type="text" placeholder="Search for products, brands and more" />
          <button>🔍</button>
        </div>
        <div className="navbar-links">
          <a href="/home">Home</a>
          <a href="/profile">Profile</a>
          <a
            href="./"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            Logout
          </a>
        </div>
      </header>

      <div className="content">
        <aside className="filters">
          <div className="filter-section">
            <div className="filter-header">
              <span>Filters</span>
              <button className="clear-button" onClick={handleClearFilter}>
                CLEAR ALL
              </button>
            </div>

            <div className="filter-price">
              <span>PRICE</span>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
                <div className="price-labels">
                  <span>$0</span>
                  <span>$2,000</span>
                </div>
                <div className="selected-price">
                  Selected Price: ₹{priceRange}
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
                  {["Electronics", "Mobiles", "Laptops", "Fashion", "Appliances", "Home"].map(
                    (category) => (
                      <li key={category}>
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                        />
                        {category}
                      </li>
                    )
                  )}
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
                  {["4★ & above", "3★ & above", "2★ & above", "1★ & above"].map(
                    (rating) => (
                      <li key={rating}>
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === rating}
                          onChange={() => setSelectedRating(rating)}
                        />
                        {rating}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="toggle-bar">
            <button
              className={`toggle-option ${
                selectedOption === "Rent" ? "active" : ""
              }`}
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
            {isLoading ? (
              <p>Loading products...</p>
            ) : (selectedOption === 'Rent' ? rentalProducts : lendProducts).map((product) => (
              <div key={product.id || product._id} className="product-card">
                <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-brand">By {product.brand || "You"}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">₹{product.price}</span>
                    <span className="product-rating">{product.rating || "N/A"} ★</span>
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

export default HomePage;