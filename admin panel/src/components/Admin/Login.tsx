import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: `url('')`,
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.4)' // Adds a dark overlay for better text readability
      }}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200/50">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <i className="fas fa-briefcase text-white text-2xl"></i>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Admin Portal</h2>
        <p className="text-center text-gray-600 mb-8">Secure access to WorkFlow</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800 transition-all duration-200 hover:border-gray-300"
                placeholder="Enter username"
              />
              <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800 transition-all duration-200 hover:border-gray-300"
                placeholder="Enter password"
              />
              <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Forgot password?{' '}
          <a href="#" className="text-teal-500 hover:text-teal-600 transition-colors">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;