import { Link } from 'react-router-dom';
import {  UserCircle, LogIn } from 'lucide-react';
import logo from "../images/logo.webp";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Smart Interns Logo" className="h-18 w-24 text-xl " />
              {/* <span className="ml-2 text-xl font-bold text-gray-900">Smart Intern</span> */}
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8"> 
              <Link to="/jobs" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Find Jobs
              </Link>
              {/* <Link to="/Mainpage" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Job Preferences
              </Link> */}
              <Link to="/Courses" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Courses
              </Link>
              <Link to="/Careers" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Careers
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="flex items-center text-gray-900 hover:text-blue-600">
              <LogIn className="h-5 w-5" />
              <span className="ml-2 text-sm font-medium">Sign In</span>
            </Link>
            <Link to="/profile" className="flex items-center text-gray-900 hover:text-blue-600">
              <UserCircle className="h-6 w-6" />
              <span className="ml-2 text-sm font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;