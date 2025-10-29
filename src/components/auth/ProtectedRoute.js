import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthUtils } from '../../utils';

const ProtectedRoute = ({ children }) => {
  const auth = AuthUtils.isAuthenticated();
  
  if (!auth) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;