import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Bell,
  Settings,
  AlignJustify
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const getNavigationItems = () => {
    if (user?.role === 'admin') {
      return [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Teachers', path: '/admin/teachers', icon: Users },
        { name: 'Students', path: '/admin/students', icon: Users },
        { name: 'Classes', path: '/admin/classes', icon: BookOpen },
        { name: 'Calendar', path: '/admin/calendar', icon: Calendar },
      ];
    } else if (user?.role === 'teacher') {
      return [
        { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
        { name: 'Attendance', path: '/teacher/attendance', icon: Users },
        { name: 'Performance', path: '/teacher/performance', icon: BookOpen },
        { name: 'Calendar', path: '/teacher/calendar', icon: Calendar },
      ];
    } else if (user?.role === 'parent') {
      return [
        { name: 'Dashboard', path: '/parent/dashboard', icon: LayoutDashboard },
        { name: 'Attendance', path: '/parent/attendance', icon: Users },
        { name: 'Performance', path: '/parent/performance', icon: BookOpen },
        { name: 'Calendar', path: '/parent/calendar', icon: Calendar },
      ];
    }
    return [];
  };
  
  const navigationItems = getNavigationItems();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link to="/" className="flex items-center">
            {sidebarOpen ? (
              <div className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/ava-ed-tech-logo.png" 
                  alt="AVA Ed. Tech Logo" 
                  className="h-8 w-8 object-contain"
                />
                <span className="font-semibold text-lg">AVA Ed. Tech.</span>
              </div>
            ) : (
              <img 
                src="/lovable-uploads/ava-ed-tech-logo.png" 
                alt="AVA Ed. Tech Logo" 
                className="h-8 w-8 mx-auto object-contain"
              />
            )}
          </Link>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 md:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 hidden md:block"
          >
            <ChevronRight 
              size={20} 
              className={cn(
                "transition-transform duration-300",
                !sidebarOpen && "rotate-180"
              )}
            />
          </button>
        </div>
        
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md transition-colors hover:bg-gray-100",
                    location.pathname === item.path
                      ? "bg-gray-100 text-scholar-primary font-medium"
                      : "text-gray-700"
                  )}
                >
                  <item.icon size={20} className="min-w-5" />
                  {sidebarOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
          {sidebarOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut size={18} />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div 
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        )}
      >
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 mr-2 md:hidden"
              >
                <AlignJustify size={20} />
              </button>
              <h1 className="text-xl font-semibold truncate">
                {location.pathname.split('/').pop()?.charAt(0).toUpperCase() + 
                 location.pathname.split('/').pop()?.slice(1) || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="py-2 px-3 text-sm text-gray-500">
                    No new notifications
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2" size="sm">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        <main className="p-4 md:p-6 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
