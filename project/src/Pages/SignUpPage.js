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
          <i className="fa fa-user"></i>
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
          <i className="fa fa-envelope icon"></i>
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
          <i className="fa fa-lock"></i>
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
            </button>
          </label>
        </div>

        {/* Confirm Password */}
        <div className="input-container">
          <label htmlFor="confirmPassword">
          <i className="fa fa-lock"></i>
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
            </button>
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn">
          REGISTER
        </button>
      </form>

      <p className="register-text">
        <a href="/"><span style={{color:'#000000'}}>Already have an account?</span> Login</a>
      </p>

    </div>
  );
}

export default SignUpPage;
