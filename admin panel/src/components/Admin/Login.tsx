import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Dummy login credentials for demo (replace with actual authentication logic)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple validation (replace with API call in production)
    if (username === 'admin' && password === 'admin123') {
      // Simulate successful login
      localStorage.setItem('isAuthenticated', 'true'); // Optional: for persistence
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-teal-500 rounded-md flex items-center justify-center">
            <i className="fas fa-briefcase text-white text-2xl"></i>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Admin Login</h2>
        <p className="text-center text-gray-500 mb-8">Welcome to WorkFlow</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
                placeholder="Enter username"
              />
              <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
                placeholder="Enter password"
              />
              <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition-colors flex items-center justify-center"
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Forgot password? <a href="#" className="text-teal-500 hover:underline">Reset here</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;