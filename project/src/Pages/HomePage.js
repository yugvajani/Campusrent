import React from 'react';
import { useState, useEffect } from 'react';

function HomePage() {
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

  const handleClick = () => {
    alert("Welcome: " + userFullName)
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to My Website</h1>
      </header>
      <main style={styles.main}>
        <p>This is a simple homepage built with React.</p>
        <button style={styles.button} onClick={handleClick}>
          Click Me
        </button>
      </main>
      <footer style={styles.footer}>
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    textAlign: 'center',
    margin: 0,
    padding: 0,
    color: '#333',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: '20px',
    color: 'white',
  },
  main: {
    padding: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  footer: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f1f1f1',
  },
};

export default HomePage;