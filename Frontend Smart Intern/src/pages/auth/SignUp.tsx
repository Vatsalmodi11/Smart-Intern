// src/SignUp.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Briefcase, Mail, Lock, User, Phone, Building } from 'lucide-react';
import axios from 'axios';

const SignUp = () => {
  const [userType, setUserType] = useState('jobseeker');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '',
    skills: '', experience: '', companyName: '', industry: '', companySize: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        userType,
        ...(userType === 'jobseeker' ? {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          skills: formData.skills,
          experience: parseInt(formData.experience) || 0,
        } : {
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          industry: formData.industry,
          companySize: formData.companySize,
        }),
      };

      const response = await axios.post('http://localhost:5000/api/auth/signup', payload);
      localStorage.setItem('userId', response.data.userId); // Ensure userId is stored
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <br/><br/><br/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-10">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Sign Up</h2>
            <div className="flex gap-4 mb-8">
              <button
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                  userType === 'jobseeker' ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-md' : 'border-gray-300 hover:border-gray-400 text-gray-600'
                }`}
                onClick={() => setUserType('jobseeker')}
              >
                <UserPlus className="h-5 w-5" />
                <span className="font-medium">Job Seeker</span>
              </button>
              <button
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                  userType === 'recruiter' ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-md' : 'border-gray-300 hover:border-gray-400 text-gray-600'
                }`}
                onClick={() => setUserType('recruiter')}
              >
                <Briefcase className="h-5 w-5" />
                <span className="font-medium">Recruiter</span>
              </button>
            </div>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {userType === 'jobseeker' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="John" required />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="Doe" required />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="john.doe@example.com" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-400" /></div>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="+1 123-456-7890" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                      <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="••••••••" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                    <input type="text" id="skills" name="skills" value={formData.skills} onChange={handleChange} className="w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g., JavaScript, React, Node.js" />
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <input type="number" id="experience" name="experience" value={formData.experience} onChange={handleChange} min="0" className="w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g., 3" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Building className="h-5 w-5 text-gray-400" /></div>
                      <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g., TechCorp" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="you@company.com" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Company Phone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-400" /></div>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="+1 123-456-7890" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                      <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="••••••••" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <select id="industry" name="industry" value={formData.industry} onChange={handleChange} className="w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                      <option value="">Select Industry</option>
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Education</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                    <select id="companySize" name="companySize" value={formData.companySize} onChange={handleChange} className="w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                      <option value="">Select Size</option>
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>51-200 employees</option>
                      <option>201+ employees</option>
                    </select>
                  </div>
                </>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;