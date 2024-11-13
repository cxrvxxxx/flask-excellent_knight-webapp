import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleBack = () => {
    navigate("/"); // Navigate directly to the landing page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Please fill out both fields");
      return;
    }
    console.log("Form Submitted:", formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="login-container">
      {/* Back Button */}
      <button onClick={handleBack} className="back-button">← Back</button>

      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>

        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <icon
            type="button"
            className="show-password-button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </icon>
        </div>

        <button type="submit">Login</button>
        
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>

        <p>Don't have an account?</p>
        <Link to="/register" className="create-account-button">
          Create Account
        </Link>
      </form>
    </div>
  );
};

export default Login;
