import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthUtils } from '../../utils';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = AuthUtils.isAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;