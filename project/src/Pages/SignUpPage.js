import React, { useState } from "react";
import "../CSS/SignUpPage.css";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // const { name, email, username, password } = req.body;
        body: JSON.stringify({ name: fullName, email: email, username: username, password: password })
      });

      const result = await response.json();

      if (response.ok) {
        // Save token in localStorage or cookie for subsequent requests
        localStorage.setItem("authToken", result.data);
        // Optionally redirect the user or update the UI state
        navigate("/home")
      } else {
        alert(`Register failed: ${result.msg}`);
      }
    } catch (error) {
      console.log(error)
      alert(error);
    }
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              required
            />
          </label>
        </div>

        {/* User Name */}
        <div className="input-container">
          <label htmlFor="username">
          <i className="fa fa-user"></i>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="User Name"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
