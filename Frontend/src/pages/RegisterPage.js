import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="input-group">
          <input 
            name="name" 
            type="text" 
            placeholder=" "
            value={form.name} 
            onChange={handleChange} 
            required 
          />
          <label>Full Name</label>
        </div>
        
        <div className="input-group">
          <input 
            name="email" 
            type="email" 
            placeholder=" "
            value={form.email} 
            onChange={handleChange} 
            required 
          />
          <label>Email</label>
        </div>
        
        <div className="input-group">
          <input 
            name="password" 
            type="password" 
            placeholder=" "
            value={form.password} 
            onChange={handleChange} 
            required 
          />
          <label>Password</label>
        </div>
        
        <button type="submit" className="register-btn">Register</button>
        
        <div className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;