import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Ticket Management System</h3>
            <p>A powerful solution for tracking and managing tickets efficiently.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/auth/login">Login</Link></li>
              <li><Link to="/auth/signup">Sign Up</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Implementations</h3>
            <ul>
              <li><a href="/react-app">React</a></li>
              <li><a href="/vue-app">Vue.js</a></li>
              <li><a href="/twig-app">Twig</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ticket Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;