import React from 'react';

function HomePage() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to My Website</h1>
      </header>
      <main style={styles.main}>
        <p>This is a simple homepage built with React.</p>
        <button style={styles.button} onClick={() => alert('Button clicked!')}>
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