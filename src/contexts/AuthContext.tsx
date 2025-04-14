
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/utils/api';
import { users } from '@/utils/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Check for saved authentication on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('si-user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('si-user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Try using the backend API first
      try {
        await authApi.login(email, password);
        const userData = JSON.parse(localStorage.getItem('si-user') || '{}');
        setUser(userData);
        setIsAuthenticated(true);
        toast({
          title: "Login successful",
          description: `Welcome back, ${userData.name}!`,
        });
        return true;
      } catch (apiError) {
        console.log("API login failed, falling back to mock data:", apiError);
        
        // Fallback to mock data if API fails
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (foundUser) {
          setUser(foundUser);
          setIsAuthenticated(true);
          localStorage.setItem('si-user', JSON.stringify(foundUser));
          toast({
            title: "Login successful",
            description: `Welcome back, ${foundUser.name}!`,
          });
          return true;
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
          });
          return false;
        }
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    try {
      // Try to call the API logout
      authApi.logout().catch(err => console.log("API logout failed:", err));
    } finally {
      // Always clear local state
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('si-user');
      localStorage.removeItem('si-token');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
