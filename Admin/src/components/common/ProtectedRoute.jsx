import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import { UnauthorizedPage } from '../../pages/auth/UnauthorizedPage';

export const ProtectedRoute = ({ children, moduleName }) => {
  const { isAuthenticated, authLoading, hasPermission } = useHR();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-saath-500"></div>
          <span className="text-sm font-medium">Verifying Session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (moduleName && !hasPermission(moduleName)) {
    return <UnauthorizedPage />;
  }

  return children;
};
