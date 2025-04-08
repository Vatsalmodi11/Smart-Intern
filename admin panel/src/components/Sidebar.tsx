import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../assets/image/profile.jpg';
import logo from "../assets/image/logo/logo.webp";

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
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navItems = [
    { icon: 'tachometer-alt', text: 'Dashboard', id: 'dashboard', path: '/dashboard' },
    { icon: 'briefcase', text: 'Jobs', id: 'jobs', path: '/jobs' },
    { icon: 'file-alt', text: 'Posts', id: 'posts', path: '/posts' },
    { icon: 'users', text: 'Applications', id: 'Applications', path: '/Applications' },
  ];

  const profileMenuItems = [
    // { icon: 'user', text: 'Profile', path: '/profile' },
    // { icon: 'cog', text: 'Settings', path: '/settings' },
    { icon: 'sign-out-alt', text: 'Logout', path: '/login', onClick: () => handleLogout() },
  ];

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className={`${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } bg-gray-100 text-gray-800 transition-all duration-300 fixed h-full flex flex-col border-r border-gray-200 shadow-sm`}
    >
      {/* Header Section */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div
          className={`${
            sidebarCollapsed ? 'hidden' : 'flex'
          } flex-1 justify-center items-center`}
        >
          <img src={logo} alt="Company Logo" className="h-16 w-24" />
        </div>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-transform duration-300 transform hover:scale-105"
        >
          <i
            className={`fas fa-${sidebarCollapsed ? 'chevron-right' : 'chevron-left'} text-gray-600`}
          ></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.path}
            onClick={(e) => {
              e.preventDefault();
              setSelectedNav(item.id);
              navigate(item.path);
            }}
            className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
              selectedNav === item.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
              <i
                className={`fas fa-${item.icon} text-lg ${
                  selectedNav === item.id ? 'text-blue-700' : 'text-gray-600'
                }`}
              ></i>
            </div>
            <span className={`${sidebarCollapsed ? 'hidden' : 'ml-4'} text-base font-medium`}>
              {item.text}
            </span>
          </a>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center w-full p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <img src={User} alt="Profile" className="w-10 h-10 rounded-full" />
            <span
              className={`${sidebarCollapsed ? 'hidden' : 'ml-3'} text-sm font-medium text-gray-800`}
            >
              User Name
            </span>
            {!sidebarCollapsed && <i className="fas fa-chevron-down ml-auto text-gray-500"></i>}
          </button>
          {showProfileMenu && !sidebarCollapsed && (
            <div className="absolute bottom-full left-0 w-full bg-white rounded-lg shadow-lg z-50 mb-2 border border-gray-200">
              {profileMenuItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) item.onClick();
                    else navigate(item.path);
                  }}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  <i className={`fas fa-${item.icon} w-6`}></i>
                  <span className="ml-3">{item.text}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;