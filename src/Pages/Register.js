import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    idNumber: "",
    plateNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => !field)) {
      alert("Please fill out all fields");
      return;
    }
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Sign Up</h1>

        <label>
          <i className="fas fa-user"></i> Username
        </label>
        <input
          type="text"
          name="userName"
          placeholder="Enter username"
          value={formData.userName}
          onChange={handleChange}
          required
        />

        <label>
          <i className="fas fa-user"></i> Full Name
        </label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>
          <i className="fas fa-envelope"></i> Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>
          <i className="fas fa-lock"></i> Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>
          <i className="fas fa-id-card"></i> ID Number
        </label>
        <input
          type="text"
          name="idNumber"
          placeholder="Enter ID number"
          value={formData.idNumber}
          onChange={handleChange}
          required
        />

        <label>
          <i className="fas fa-car"></i> Plate Number
        </label>
        <input
          type="text"
          name="plateNumber"
          placeholder="Enter plate number"
          value={formData.plateNumber}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        <p>Already registered?</p>
        <Link to="/login" className="login-link">
          Go to Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
