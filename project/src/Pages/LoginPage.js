import React, { useState } from "react";
import '../CSS/LoginPage.css'

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in with Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="container">
      <h1>CampusRent</h1>
      <h2>Sign in</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label htmlFor="email">
            <span className="icon">📧</span>
            <input
              type="email"
              id="email"
              placeholder="abc@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="password">
            <span className="icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* {showPassword ? "🙈" : "👁"} */}
            </button>
          </label>
        </div>
        <a href="/forgot-password" className="forgot-password">
          Forgot Password?
        </a>
        <button type="submit" className="btn">
          LOGIN
        </button>
      </form>
      <p className="register-text">
        Don't have an account? <a href="/signup">Register</a>
      </p>
    </div>
  );
}

export default LoginPage;