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
            <i className="fa fa-envelope icon"></i>
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
          <label htmlFor="password" className="input-label">
            <div className="icon-container">
              <i className="fa fa-lock"></i>
            </div>
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
              <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
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
        <a href="/signup"><span style={{color:'#000000'}}>Don't have an account?</span> Register</a>
      </p>
    </div>
  );
}

export default LoginPage;
