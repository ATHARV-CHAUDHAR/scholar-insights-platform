import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChevronRight,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { NavigationItem, getNavigationItems } from '@/utils/navigationUtils';
import { useLocation } from 'react-router-dom';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  handleLogout,
}) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigationItems = getNavigationItems(user?.role);

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
      )}
    >
      <SidebarHeader 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <SidebarNavigation 
        navigationItems={navigationItems} 
        sidebarOpen={sidebarOpen} 
        currentPath={location.pathname}
      />
      
      <SidebarFooter 
        user={user} 
        sidebarOpen={sidebarOpen} 
        handleLogout={handleLogout} 
      />
    </div>
  );
};

interface SidebarHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  return (
    <div className="flex items-center justify-between h-16 px-4 border-b">
      <Link to="/" className="flex items-center">
        {sidebarOpen ? (
          <div className="flex items-center gap-2">
            <img 
              src="/ava-ed-tech-logo.png" 
              alt="AVA Ed. Tech Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="font-semibold text-lg">AVA Ed. Tech.</span>
          </div>
        ) : (
          <img 
            src="/ava-ed-tech-logo.png" 
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
  );
};

interface SidebarNavigationProps {
  navigationItems: NavigationItem[];
  sidebarOpen: boolean;
  currentPath: string;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  navigationItems, 
  sidebarOpen,
  currentPath
}) => {
  return (
    <nav className="px-2 py-4">
      <ul className="space-y-1">
        {navigationItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors hover:bg-gray-100",
                currentPath === item.path
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
  );
};

interface SidebarFooterProps {
  user: any;
  sidebarOpen: boolean;
  handleLogout: () => void;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ 
  user, 
  sidebarOpen, 
  handleLogout 
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
      {sidebarOpen ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
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
            <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};
