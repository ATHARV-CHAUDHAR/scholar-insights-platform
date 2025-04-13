
import apiClient from './api';
import { User, UserRole } from '@/types';

// Mock data for demo purposes - replace with actual API calls in production
const MOCK_USERS = [
  {
    id: '1',
    email: 'johndoe@example.com',
    name: 'John Doe',
    role: 'admin' as UserRole,
    avatar: '/avatars/john-doe.jpg',
  },
  {
    id: '2',
    email: 'janesmith@example.com',
    name: 'Jane Smith',
    role: 'teacher' as UserRole,
    avatar: '/avatars/jane-smith.jpg',
  },
  {
    id: '3',
    email: 'robertjohnson@example.com',
    name: 'Robert Johnson',
    role: 'parent' as UserRole,
    avatar: '/avatars/robert-johnson.jpg',
  },
];

interface LoginResponse {
  user: User;
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const authService = {
  /**
   * Login a user
   */
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      // In production, this would be a real API call:
      // const response = await apiClient.post<LoginResponse>('/auth/login', { email, password });
      
      // For demo purposes, using mock data:
      const mockUser = MOCK_USERS.find(user => user.email.toLowerCase() === email.toLowerCase());
      
      if (mockUser) {
        const mockToken = `mock-token-${mockUser.id}-${Date.now()}`;
        
        // Store token in localStorage
        localStorage.setItem('auth_token', mockToken);
        
        // Return the user object
        return mockUser;
      }
      
      return null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },
  
  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    try {
      // In production, you might want to invalidate the token on the server:
      // await apiClient.post('/auth/logout');
      
      // Remove token from localStorage
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
  
  /**
   * Check if the current session is authenticated
   */
  checkAuth: async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        return null;
      }
      
      // In production, validate token with the server:
      // const response = await apiClient.get<User>('/auth/me');
      // return response.data;
      
      // For demo, extract user ID from mock token and return mock user
      const tokenParts = token.split('-');
      if (tokenParts.length >= 3) {
        const userId = tokenParts[2];
        const mockUser = MOCK_USERS.find(user => user.id === userId);
        return mockUser || null;
      }
      
      return null;
    } catch (error) {
      console.error('Auth check error:', error);
      return null;
    }
  },
  
  /**
   * Register a new user (for production implementation)
   */
  register: async (userData: Partial<User> & { password: string }): Promise<User | null> => {
    try {
      // In production, this would be a real API call:
      // const response = await apiClient.post<LoginResponse>('/auth/register', userData);
      // localStorage.setItem('auth_token', response.data.token);
      // return response.data.user;
      
      // For demo, just return null (registration not implemented in demo)
      return null;
    } catch (error) {
      console.error('Registration error:', error);
      return null;
    }
  }
};
