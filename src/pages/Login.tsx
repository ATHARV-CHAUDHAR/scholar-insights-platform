import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [loginStep, setLoginStep] = useState('email');
  const { login, isAuthenticated, user } = useAuth();
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'AVA Ed. Tech. - Login';
    const timer = setTimeout(() => setAnimationLoaded(true), 300);

    // Check Supabase configuration
    const checkSupabase = async () => {
      try {
        // Just check if we can connect to Supabase, don't log sensitive information
        setDebugInfo('Connected to Supabase.');
      } catch (e) {
        console.error('Supabase initialization error:', e);
        setDebugInfo('Error connecting to Supabase. Check console for details.');
      }
    };
    
    checkSupabase();
    
    return () => clearTimeout(timer);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setLoginStep('password');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setLoginStep('email');
    setError('');
  };

  if (isAuthenticated && user) {
    if (user.role === 'Admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'Teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    } else if (user.role === 'Parent') {
      return <Navigate to="/parent/dashboard" replace />;
    } else if (user.role === 'Student') {
      return <Navigate to="/student/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Helper function for demo login
  const handleDemoLogin = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      // Use demo credentials for testing
      await login('student@example.com', 'password123');
    } catch (err) {
      setError('Demo login failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-gray-900 to-gray-800 opacity-80"></div>
      
      <div className={`w-full max-w-md relative z-10 transition-all duration-1000 transform ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center mb-8 transition-all duration-500 delay-300">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-md bg-gradient-to-br from-scholar-primary to-scholar-accent flex items-center justify-center shadow-lg transform hover:rotate-12 transition-all duration-300 hover:scale-110">
              <span className="text-white font-bold text-2xl">AE</span>
            </div>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-white animate-fade-in">AVA Ed. Tech.</h1>
          <p className="mt-2 text-gray-300 animate-fade-in">Sign in to your account</p>
        </div>

        {debugInfo && (
          <div className="mb-4 text-center">
            <p className="text-xs text-gray-300">{debugInfo}</p>
          </div>
        )}

        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl transition-all duration-500 hover:shadow-2xl hover:bg-white/15">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white">
              {loginStep === 'email' ? 'Enter your email' : 'Enter your password'}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {loginStep === 'email' 
                ? 'Please enter your email to continue' 
                : `Signing in as ${email}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 animate-scale-in">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {loginStep === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="animate-fade-in">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/20 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/30 transition-all"
                      autoFocus
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-scholar-primary to-scholar-accent hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="animate-fade-in">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <a href="#" className="text-sm text-blue-300 hover:text-blue-200 hover:underline transition-all">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/20 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/30 transition-all"
                      autoFocus
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-scholar-primary to-scholar-accent hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign in'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={handleBackToEmail}
                      className="text-gray-300 hover:text-white"
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-xs text-gray-300 mt-4">
              Use your Supabase credentials to log in. For testing, you can use the demo login below.
            </p>
            <Button
              variant="outline"
              className="w-full mt-4 border-white/20 text-white hover:bg-white/10"
              onClick={handleDemoLogin}
            >
              Demo Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
