import React from 'react';
import '../styles/Authenticate.css';

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <form className="auth-form">
          <input type="email" placeholder="Max@Mustermann.com" className="auth-input" />

          <div className="password-wrapper">
            <input type="password" placeholder="••••••••" className="auth-input forgot-link" />
            <a href="#" className="forgot-password-link">Forgot Password?</a>
          </div>

          <button type="submit" className="auth-button">Login</button>
        </form>

        <p className="auth-footer-text">
          Don’t have an account? <a href="#">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
