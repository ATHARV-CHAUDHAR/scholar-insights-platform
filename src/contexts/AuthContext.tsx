
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Check if Supabase is configured before attempting to use it
        if (!isSupabaseConfigured()) {
          console.warn('Supabase is not configured. Using demo mode.');
          setIsLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get user profile data
          const { data: userData, error: userError } = await supabase
            .from('Users')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (userError) throw userError;

          setUser({
            id: userData.user_id,
            username: userData.username,
            email: userData.email,
            is_active: userData.is_active,
            role: userData.role_name as UserRole,
            avatar: userData.avatar,
            created_at: userData.created_at,
            updated_at: userData.updated_at,
            // For backward compatibility
            name: userData.username
          });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Only set up auth listener if Supabase is configured
    if (isSupabaseConfigured()) {
      // Subscribe to auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            // Get user profile data
            const { data: userData, error: userError } = await supabase
              .from('Users')
              .select('*')
              .eq('user_id', session.user.id)
              .single();

            if (userError) {
              console.error('Error fetching user data:', userError);
              return;
            }

            setUser({
              id: userData.user_id,
              username: userData.username,
              email: userData.email,
              is_active: userData.is_active,
              role: userData.role_name as UserRole,
              avatar: userData.avatar,
              created_at: userData.created_at,
              updated_at: userData.updated_at,
              // For backward compatibility
              name: userData.username
            });
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // If Supabase is not configured, use demo mode login
      if (!isSupabaseConfigured()) {
        // Demo mode: Create a mock user based on email
        let mockRole: UserRole = 'Student';
        if (email.includes('teacher')) mockRole = 'Teacher';
        else if (email.includes('admin')) mockRole = 'Admin';
        else if (email.includes('parent')) mockRole = 'Parent';
        
        const mockUser: User = {
          id: '123',
          username: email.split('@')[0],
          email: email,
          is_active: true,
          role: mockRole,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          name: email.split('@')[0]
        };
        
        setUser(mockUser);
        
        toast({
          title: 'Demo mode login',
          description: `Welcome ${mockUser.username}! You're using the demo mode.`,
        });
        
        setIsLoading(false);
        return;
      }
      
      // Real Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Login failed',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      // Get user profile data
      const { data: userData, error: userError } = await supabase
        .from('Users')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (userError) {
        toast({
          title: 'Error retrieving user profile',
          description: userError.message,
          variant: 'destructive',
        });
        throw userError;
      }

      setUser({
        id: userData.user_id,
        username: userData.username,
        email: userData.email,
        is_active: userData.is_active,
        role: userData.role_name as UserRole,
        avatar: userData.avatar,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
        // For backward compatibility
        name: userData.username
      });

      toast({
        title: 'Login successful',
        description: `Welcome back, ${userData.username}!`,
      });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // If using demo mode, just clear the user state
      if (!isSupabaseConfigured()) {
        setUser(null);
        toast({
          title: 'Logout successful',
          description: 'You have been logged out from demo mode.',
        });
        setIsLoading(false);
        return;
      }
      
      // Real Supabase logout
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      toast({
        title: 'Logout successful',
        description: 'You have been logged out.',
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout failed',
        description: 'An error occurred during logout.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
