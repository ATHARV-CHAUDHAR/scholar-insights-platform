
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    document.title = 'AVA Ed. Tech. Platform';
  }, []);
  
  // If authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    if (user.role === 'Admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'Teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    } else if (user.role === 'Parent') {
      return <Navigate to="/parent/dashboard" replace />;
    } else if (user.role === 'Student') {
      // Handle Student role if needed
      return <Navigate to="/student/dashboard" replace />;
    }
  }
  
  // If not authenticated, redirect to login
  return <Navigate to="/login" replace />;
};

export default Index;
