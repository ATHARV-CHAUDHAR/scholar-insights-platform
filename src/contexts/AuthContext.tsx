
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { users } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

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
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This is just a mock authentication - in a real app, you'd verify credentials on the server
      // For demo purposes, we'll just check the email against our mock data
      // and accept any password (since we're not storing real passwords)
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
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('si-user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
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
