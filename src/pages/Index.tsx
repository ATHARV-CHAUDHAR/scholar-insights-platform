
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    document.title = 'Scholar Insights Platform';
  }, []);
  
  // If authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    } else if (user.role === 'parent') {
      return <Navigate to="/parent/dashboard" replace />;
    }
  }
  
  // If not authenticated, redirect to login
  return <Navigate to="/login" replace />;
};

export default Index;
