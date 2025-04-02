import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import User from "../assets/image/profile.jpg"; // Assuming this is your profile image

interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  selectedNav: string;
  setSelectedNav: (nav: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  selectedNav,
  setSelectedNav,
}) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navItems = [
    { icon: 'tachometer-alt', text: 'Dashboard', id: 'dashboard', path: '/dashboard' },
    { icon: 'briefcase', text: 'Jobs', id: 'jobs', path: '/jobs' },
    { icon: 'briefcase', text: 'posts', id: 'posts', path: '/posts' },
    { icon: 'briefcase', text: 'Applications', id: 'Applications', path: '/Applications' },
  ];

  const profileMenuItems = [
    { icon: 'user', text: 'Profile', path: '/profile' },
    { icon: 'cog', text: 'Settings', path: '/settings' },
    { icon: 'sign-out-alt', text: 'Logout', path: '/login', onClick: () => handleLogout() },
  ];

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page after logout
  };

  if (!isAuthenticated) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-gray-900 text-white transition-all duration-300 fixed h-full flex flex-col`}>
      {/* Navbar Section */}


      {/* Sidebar Content */}
      <div className="p-4 flex items-center justify-between bg-gray-900">
        <img
          src="/path/to/company-logo.jpg" // Replace with your local logo path
          alt="Company Logo"
          className={`${sidebarCollapsed ? 'hidden' : 'block'} h-8`}
        />
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="text-white hover:bg-gray-700 p-2 rounded-full cursor-pointer"
        >
          <i className={`fas fa-${sidebarCollapsed ? 'chevron-right' : 'chevron-left'}`}></i>
        </button>
      </div>
      <nav className="mt-8 flex-1">
        {navItems.map(item => (
          <a
            key={item.id}
            href={item.path}
            onClick={(e) => {
              e.preventDefault();
              setSelectedNav(item.id);
              navigate(item.path);
            }}
            className={`flex items-center px-4 py-3 cursor-pointer ${selectedNav === item.id ? 'bg-blue-600' : 'hover:bg-gray-800'} no-underline text-white`}
          >
            <i className={`fas fa-${item.icon} w-6`}></i>
            <span className={`${sidebarCollapsed ? 'hidden' : 'ml-3'}`}>{item.text}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;