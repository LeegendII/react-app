import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthUtils, ToastUtils, ValidationUtils } from '../../utils';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (AuthUtils.isAuthenticated()) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!ValidationUtils.isRequired(email)) {
      newErrors.email = 'Email is required';
    } else if (!ValidationUtils.isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!ValidationUtils.isRequired(password)) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = AuthUtils.authenticate(email, password);
      
      if (result.success) {
        ToastUtils.success('Login successful!');
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        ToastUtils.error(result.message);
      }
    } catch (error) {
      ToastUtils.error('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  return (
    <div className="container" style={{ margin: '3rem auto', maxWidth: '500px' }}>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span> Logging in...
                </>
              ) : 'Login'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p>Don't have an account? <Link to="/auth/signup">Sign up</Link></p>
          </div>
          
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
            <h6 style={{ textAlign: 'center' }}>Demo Credentials</h6>
            <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> admin@example.com</p>
            <p style={{ marginBottom: '0' }}><strong>Password:</strong> password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;