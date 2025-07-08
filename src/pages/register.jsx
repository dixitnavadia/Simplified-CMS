import React from 'react';
import '../styles/Authenticate.css';

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>

        <form className="auth-form">
          <input type="text" placeholder="Max Mustermann" className="auth-input" />
          <input type="email" placeholder="Max@Mustermann.com" className="auth-input" />
          <input type="password" placeholder="••••••••" className="auth-input" />

          <button type="submit" className="auth-button">Register</button>
        </form>

        <p className="auth-footer-text">
          Already have an account? <a href="#">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
