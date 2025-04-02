import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Jobdetails from './components/Jobdetails';
import Newjobcreation from './components/Newjobcreation';
import Profile from './components/Admin/Profile';
import Sidebar from './components/Sidebar';
import AdminLogin from './components/Admin/Login';
import PostUpload from './components/Postupload';
import AcceptApplication from './components/AcceptApplication';

// Optional: Add a simple 404 component
const NotFound = () => (
  <div className="flex h-screen items-center justify-center bg-gray-100">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600">The page you're looking for doesn't exist.</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route to Dashboard */}
        {/* <Route path="/" element={<Navigate to="/sidebar" replace />} /> */}


        <Route path='/' element={<AdminLogin/> } />
        <Route path='/logout' element={<AdminLogin/> } />
        <Route path='/' element={<Sidebar/> } />
        {/* Main routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobdetails />} />
        <Route path="/posts" element={<PostUpload />} />
        <Route path="/jobs/new-job" element={<Newjobcreation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Applications" element={<AcceptApplication />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;