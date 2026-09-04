import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import { UnauthorizedPage } from '../../pages/auth/UnauthorizedPage';

export const ProtectedRoute = ({ children, moduleName }) => {
  const { isAuthenticated, hasPermission } = useHR();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (moduleName && !hasPermission(moduleName)) {
    return <UnauthorizedPage />;
  }

  return children;
};
