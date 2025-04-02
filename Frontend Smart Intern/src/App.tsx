// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import JobListings from './pages/JobListings';
// import JobApplication from './pages/JobApplication';
import UserDashboard from './pages/UserDashboard';
import Mainpage from './pages/Mainpage';
// import EmployerDashboard from './pages/EmployerDashboard';
import Networking from './pages/Networking';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import Courses from './pages/Courses';
import CareersPage from './pages/CareersPage';
// import Message from '../src/pages/Message';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/profile" element={<UserDashboard />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/Mainpage" element={<Mainpage />} />
          <Route path="/Courses" element={<Courses/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Careers" element={<CareersPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;