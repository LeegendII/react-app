import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthUtils, ToastUtils, ValidationUtils } from '../../utils';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (AuthUtils.isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!ValidationUtils.isRequired(name)) {
      newErrors.name = 'Name is required';
    }
    
    if (!ValidationUtils.isRequired(email)) {
      newErrors.email = 'Email is required';
    } else if (!ValidationUtils.isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!ValidationUtils.isRequired(password)) {
      newErrors.password = 'Password is required';
    } else if (!ValidationUtils.minLength(password, 6)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!ValidationUtils.isRequired(confirmPassword)) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const result = AuthUtils.signup(name, email, password);
      
      if (result.success) {
        ToastUtils.success('Account created successfully!');
        navigate('/dashboard', { replace: true });
      } else {
        ToastUtils.error(result.message);
      }
    } catch (error) {
      ToastUtils.error('An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
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
          <h2 className="card-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Sign Up</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            
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
            
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                value={confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span style={{ display: 'inline-block', width: '1rem', height: '1rem', marginRight: '0.5rem', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50%', borderTopColor: 'white', animation: 'spin 1s linear infinite' }}></span> Creating Account...
                </>
              ) : 'Sign Up'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p>Already have an account? <Link to="/auth/login">Login</Link></p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;