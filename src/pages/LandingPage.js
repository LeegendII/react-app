import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="decoration-circle decoration-circle-1"></div>
            <div className="decoration-circle decoration-circle-2"></div>
            
            <h1 className="text-center mb-4">Ticket Management System</h1>
            <p className="text-center mb-5" style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
              Streamline your workflow with our powerful ticket management solution. 
              Track, prioritize, and resolve issues efficiently to keep your team productive.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Link to="/auth/login" className="btn btn-light btn-lg">
                Login
              </Link>
              <Link to="/auth/signup" className="btn btn-primary btn-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="container my-5">
        <h2 className="text-center mb-5">Key Features</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div className="card" style={{ width: '300px' }}>
            <div className="card-body">
              <h3 className="card-title">Easy Ticket Creation</h3>
              <p className="card-text">
                Quickly create tickets with all the necessary details. 
                Assign priorities and track progress effortlessly.
              </p>
            </div>
          </div>
          
          <div className="card" style={{ width: '300px' }}>
            <div className="card-body">
              <h3 className="card-title">Real-time Updates</h3>
              <p className="card-text">
                Stay informed with real-time notifications and updates 
                on ticket status changes and comments.
              </p>
            </div>
          </div>
          
          <div className="card" style={{ width: '300px' }}>
            <div className="card-body">
              <h3 className="card-title">Insightful Analytics</h3>
              <p className="card-text">
                Gain valuable insights with comprehensive dashboards 
                and reports on ticket resolution times and team performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div className="footer-section" style={{ flex: '1', minWidth: '200px', marginBottom: '2rem' }}>
              <h3>Ticket Management System</h3>
              <p>A powerful solution for tracking and managing tickets efficiently.</p>
            </div>
            
            <div className="footer-section" style={{ flex: '1', minWidth: '200px', marginBottom: '2rem' }}>
              <h3>Quick Links</h3>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/">Home</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/auth/login">Login</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/auth/signup">Sign Up</Link></li>
              </ul>
            </div>
            
            <div className="footer-section" style={{ flex: '1', minWidth: '200px', marginBottom: '2rem' }}>
              <h3>Implementations</h3>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: '0.5rem' }}><a href="/react-app">React</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="/vue-app">Vue.js</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="/twig-app">Twig</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom" style={{ textAlign: 'center', paddingTop: '2rem', marginTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', color: '#9ca3af' }}>
            <p>&copy; {new Date().getFullYear()} Ticket Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;