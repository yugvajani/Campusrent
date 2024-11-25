import React, { useState } from "react";
import "../CSS/SignUpPage.css";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration successful!");
  };

  return (
    <div className="signup-container">
      <h1>CampusRent</h1>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="input-container">
          <label htmlFor="fullName">
            <span className="icon">👤</span>
            <input
              type="text"
              id="fullName"
              placeholder="Full name"
              required
            />
          </label>
        </div>

        {/* Email */}
        <div className="input-container">
          <label htmlFor="email">
            <span className="icon">📧</span>
            <input
              type="email"
              id="email"
              placeholder="abc@email.com"
              required
            />
          </label>
        </div>

        {/* Password */}
        <div className="input-container">
          <label htmlFor="password">
            <span className="icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Your password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* <img
                src={showPassword ? "/images/hide.svg" : "/images/show.svg"}
                alt={showPassword ? "Hide Password" : "Show Password"}
                className="toggle-icon"
              /> */}
            </button>
          </label>
        </div>

        {/* Confirm Password */}
        <div className="input-container">
          <label htmlFor="confirmPassword">
            <span className="icon">🔒</span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Re-enter your password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {/* <img
                src={showConfirmPassword ? "/images/hide.svg" : "/images/show.svg"}
                alt={showConfirmPassword ? "Hide Password" : "Show Password"}
                className="toggle-icon"
              /> */}
            </button>
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn">
          REGISTER
        </button>
      </form>

      {/* Redirect to Login */}
      <p className="redirect-text">
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default SignUpPage;