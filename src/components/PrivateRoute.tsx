import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { isAuthenticated, user } = useAuth();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is specified, check if user has an allowed role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to a default dashboard based on user role
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    } else if (user.role === 'parent') {
      return <Navigate to="/parent/dashboard" replace />;
    }
    
    // Fallback to home if role doesn't match any specific dashboard
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected component
  return <>{children}</>;
};

export default PrivateRoute;
