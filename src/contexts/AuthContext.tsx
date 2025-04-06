
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '@/types';
import { supabase } from '@/integrations/supabase/client';
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
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get user profile data
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (userError) throw userError;
          
          if (userData) {
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
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user profile data
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (userError) {
            console.error('Error fetching user data:', userError);
            return;
          }

          if (userData) {
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
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
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
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
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

        if (userData) {
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
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
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
