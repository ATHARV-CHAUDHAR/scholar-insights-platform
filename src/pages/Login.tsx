
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [loginStep, setLoginStep] = useState('email'); // 'email' or 'password'
  const { login, isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Ensure the title is set correctly
    document.title = 'AVA Ed. Tech. - Login';
    
    // Set animation as loaded after a slight delay to ensure smooth transition
    const timer = setTimeout(() => setAnimationLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    // Animate to password step
    setLoginStep('password');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to email step
  const handleBackToEmail = () => {
    setLoginStep('email');
    setError('');
  };

  // If already authenticated, redirect to the appropriate dashboard
  if (isAuthenticated && user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    } else if (user.role === 'parent') {
      return <Navigate to="/parent/dashboard" replace />;
    }
    // Default fallback
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 relative overflow-hidden">
      {/* Static background gradient instead of LoginAnimation */}
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
              For demo purposes, you can use:
            </p>
            <div className="text-xs text-gray-300 mt-1 space-y-1">
              <p>Admin: johndoe@example.com</p>
              <p>Teacher: janesmith@example.com</p>
              <p>Parent: robertjohnson@example.com</p>
              <p>(Any password will work)</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
