import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthUtils, ToastUtils } from '../../utils';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    AuthUtils.clearSession();
    ToastUtils.success('You have been logged out successfully.');
    navigate('/');
    setIsMobileMenuOpen(false);
  };
  
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <nav style={{ 
      backgroundColor: 'var(--white)', 
      boxShadow: 'var(--shadow-md)',
      padding: '1rem 0',
      position: 'sticky',
      top: '0',
      zIndex: '100'
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Ticket Management</div>
          
          {/* Desktop Navigation */}
          <ul style={{ 
            display: 'flex', 
            listStyle: 'none',
            margin: '0',
            padding: '0',
            alignItems: 'center'
          }} className="desktop-nav">
            <li style={{ marginRight: '1.5rem' }}>
              <Link 
                to="/dashboard" 
                style={{ 
                  color: isActiveRoute('/dashboard') ? 'var(--primary-color)' : 'var(--text-secondary)',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}
              >
                Dashboard
              </Link>
            </li>
            <li style={{ marginRight: '1.5rem' }}>
              <Link
                to="/tickets"
                style={{
                  color: isActiveRoute('/tickets') || location.pathname.startsWith('/tickets/') ? 'var(--primary-color)' : 'var(--text-secondary)',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}
              >
                Tickets
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout} 
                className="btn btn-danger btn-sm"
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
          </ul>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mobile-nav" style={{
            display: 'none',
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            backgroundColor: 'var(--white)',
            boxShadow: 'var(--shadow-md)',
            borderTop: '1px solid var(--border-color)',
            padding: '1rem 0'
          }}>
            <ul style={{ 
              listStyle: 'none',
              margin: '0',
              padding: '0'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  to="/dashboard" 
                  onClick={closeMobileMenu}
                  style={{ 
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: isActiveRoute('/dashboard') ? 'var(--primary-color)' : 'var(--text-primary)',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}
                >
                  Dashboard
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link
                  to="/tickets"
                  onClick={closeMobileMenu}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: isActiveRoute('/tickets') || location.pathname.startsWith('/tickets/') ? 'var(--primary-color)' : 'var(--text-primary)',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}
                >
                  Tickets
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => { handleLogout(); closeMobileMenu(); }} 
                  className="btn btn-danger btn-sm"
                  style={{ 
                    width: '100%',
                    margin: '0.5rem 1rem',
                    textAlign: 'center'
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: block !important;
          }
          
          .mobile-nav {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;