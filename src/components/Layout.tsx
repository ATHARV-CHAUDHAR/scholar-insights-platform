
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Extract the page title from the location path
  const pageTitle = location.pathname.split('/').pop()?.charAt(0).toUpperCase() + 
                   location.pathname.split('/').pop()?.slice(1) || 'Dashboard';
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        handleLogout={handleLogout}
      />
      
      <div 
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        )}
      >
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          pageTitle={pageTitle}
        />
        
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
