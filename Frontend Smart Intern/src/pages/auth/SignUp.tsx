// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserPlus, Briefcase, Mail, Lock, User, Phone, Building } from 'lucide-react';
// import axios from 'axios';

// const SignUp = () => {
//   const [userType, setUserType] = useState('jobseeker');
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     skills: '',
//     experience: '',
//     companyName: '',
//     industry: '',
//     companySize: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     if (userType === 'jobseeker') {
//       if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
//         setError('First name, last name, email, and password are required for job seekers.');
//         return false;
//       }
//     } else {
//       if (!formData.companyName || !formData.email || !formData.password) {
//         setError('Company name, email, and password are required for recruiters.');
//         return false;
//       }
//     }
//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       setError('Please enter a valid email address.');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long.');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const payload = {
//         userType,
//         ...(userType === 'jobseeker'
//           ? {
//               firstName: formData.firstName,
//               lastName: formData.lastName,
//               email: formData.email,
//               phone: formData.phone,
//               password: formData.password,
//               skills: formData.skills,
//               experience: parseInt(formData.experience) || 0,
//             }
//           : {
//               companyName: formData.companyName,
//               email: formData.email,
//               phone: formData.phone,
//               password: formData.password,
//               industry: formData.industry,
//               companySize: formData.companySize,
//             }),
//       };

//       console.log('Sending payload:', payload); // Debug payload
//       const response = await axios.post('http://localhost:5000/api/auth/signup', payload);
//       localStorage.setItem('userId', response.data.userId);
//       // Reset form
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         password: '',
//         skills: '',
//         experience: '',
//         companyName: '',
//         industry: '',
//         companySize: '',
//       });
//       navigate('/profile');
//     } catch (err) {
//       console.error('Signup error:', err.response || err); // Debug full error
//       if (err.response) {
//         setError(err.response.data?.message || 'Server error occurred.');
//       } else if (err.request) {
//         setError('No response from server. Is the backend running?');
//       } else {
//         setError('Failed to send request. Check your network.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <br />
//       <br />
//       <br />
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="px-8 py-10">
//             <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Sign Up</h2>
//             <div className="flex gap-4 mb-8">
//               <button
//                 className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
//                   userType === 'jobseeker'
//                     ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-md'
//                     : 'border-gray-300 hover:border-gray-400 text-gray-600'
//                 }`}
//                 onClick={() => setUserType('jobseeker')}
//               >
//                 <UserPlus className="h-5 w-5" />
//                 <span className="font-medium">Job Seeker</span>
//               </button>
//               <button
//                 className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
//                   userType === 'recruiter'
//                     ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-md'
//                     : 'border-gray-300 hover:border-gray-400 text-gray-600'
//                 }`}
//                 onClick={() => setUserType('recruiter')}
//               >
//                 <Briefcase className="h-5 w-5" />
//                 <span className="font-medium">Recruiter</span>
//               </button>
//             </div>
//             {error && <p className="text-red-600 text-center mb-4">{error}</p>}
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {userType === 'jobseeker' ? (
//                 <>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
//                         First Name
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <User className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                           type="text"
//                           id="firstName"
//                           name="firstName"
//                           value={formData.firstName}
//                           onChange={handleChange}
//                           className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                           placeholder="John"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
//                         Last Name
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <User className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                           type="text"
//                           id="lastName"
//                           name="lastName"
//                           value={formData.lastName}
//                           onChange={handleChange}
//                           className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                           placeholder="Doe"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                       Email
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Mail className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                         placeholder="john.doe@example.com"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                       Phone Number
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Phone className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                         placeholder="+1 123-456-7890"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                       Password
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Lock className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                         placeholder="••••••••"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
//                       Skills
//                     </label>
//                     <input
//                       type="text"
//                       id="skills"
//                       name="skills"
//                       value={formData.skills}
//                       onChange={handleChange}
//                       className="w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                       placeholder="e.g., JavaScript, React, Node.js"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
//                       Years of Experience
//                     </label>
//                     <input
//                       type="number"
//                       id="experience"
//                       name="experience"
//                       value={formData.experience}
//                       onChange={handleChange}
//                       min="0"
//                       className="w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                       placeholder="e.g., 3"
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div>
//                     <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
//                       Company Name
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Building className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="text"
//                         id="companyName"
//                         name="companyName"
//                         value={formData.companyName}
//                         onChange={handleChange}
//                         className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                         placeholder="e.g., TechCorp"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                       Work Email
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Mail className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                         placeholder="you@company.com"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                       Company Phone
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Phone className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                         placeholder="+1 123-456-7890"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                       Password
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Lock className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                         placeholder="••••••••"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
//                       Industry
//                     </label>
//                     <select
//                       id="industry"
//                       name="industry"
//                       value={formData.industry}
//                       onChange={handleChange}
//                       className="w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                     >
//                       <option value="">Select Industry</option>
//                       <option>Technology</option>
//                       <option>Healthcare</option>
//                       <option>Finance</option>
//                       <option>Education</option>
//                       <option>Other</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
//                       Company Size
//                     </label>
//                     <select
//                       id="companySize"
//                       name="companySize"
//                       value={formData.companySize}
//                       onChange={handleChange}
//                       className="w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                     >
//                       <option value="">Select Size</option>
//                       <option>1-10 employees</option>
//                       <option>11-50 employees</option>
//                       <option>51-200 employees</option>
//                       <option>201+ employees</option>
//                     </select>
//                   </div>
//                 </>
//               )}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 flex items-center justify-center ${
//                   loading ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8v8h-8z"
//                       />
//                     </svg>
//                     Signing Up...
//                   </>
//                 ) : (
//                   'Sign Up'
//                 )}
//               </button>
//             </form>
//             <div className="mt-6 text-center text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//                 Sign in
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;


















import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Briefcase, Mail, Lock, User, Phone, Building } from 'lucide-react';
import axios from 'axios';

const SignUp = () => {
  const [userType, setUserType] = useState('jobseeker');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    skills: '',
    experience: '',
    companyName: '',
    industry: '',
    companySize: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (userType === 'jobseeker') {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setError('First name, last name, email, and password are required for job seekers.');
        return false;
      }
    } else {
      if (!formData.companyName || !formData.email || !formData.password) {
        setError('Company name, email, and password are required for recruiters.');
        return false;
      }
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        userType,
        ...(userType === 'jobseeker'
          ? {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              password: formData.password,
              skills: formData.skills,
              experience: parseInt(formData.experience) || 0,
            }
          : {
              companyName: formData.companyName,
              email: formData.email,
              phone: formData.phone,
              password: formData.password,
              industry: formData.industry,
              companySize: formData.companySize,
            }),
      };

      console.log('Sending payload:', payload);
      const response = await axios.post('http://localhost:5000/api/auth/signup', payload);
      localStorage.setItem('userId', response.data.userId);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        skills: '',
        experience: '',
        companyName: '',
        industry: '',
        companySize: '',
      });
      navigate('/profile');
    } catch (err) {
      console.error('Signup error:', err.response || err);
      if (err.response) {
        setError(err.response.data?.message || 'Server error occurred.');
      } else if (err.request) {
        setError('No response from server. Is the backend running?');
      } else {
        setError('Failed to send request. Check your network.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden pt-[80px]">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-[-1]"></div>
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 z-[-1]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 z-[-1]"></div>

      <div className="relative z-0 w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sign Up</h2>
          <div className="flex gap-4 mb-6">
            <button
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 ${
                userType === 'jobseeker'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setUserType('jobseeker')}
            >
              <UserPlus className="h-5 w-5" />
              <span className="font-medium">Job Seeker</span>
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 ${
                userType === 'recruiter'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setUserType('recruiter')}
            >
              <Briefcase className="h-5 w-5" />
              <span className="font-medium">Recruiter</span>
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded-md">{error}</p>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {userType === 'jobseeker' ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+1 123-456-7890"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                    Skills
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    className="w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 3"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., TechCorp"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Work Email
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Company Phone
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+1 123-456-7890"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Industry</option>
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Education</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
                    Company Size
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
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
              className={`w-full py-2 px-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 flex items-center justify-center ${
                loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h-8z"
                    />
                  </svg>
                  Signing Up...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-400 p-8 text-white flex flex-col justify-center items-center relative">
          <div className="absolute top-4 right-4 bg-white/20 rounded-full p-2">
            <span className="text-sm font-semibold">176.18</span>
          </div>
          <div className="absolute top-1/3 right-8 bg-white/20 rounded-lg p-4 w-40 text-sm">
            <Lock className="h-6 w-6 text-blue-200 mb-2" />
            <p>Your data, your rules</p>
          </div>
          <div className="absolute bottom-8 left-8 bg-white/20 rounded-lg p-4 w-40 text-sm flex items-center">
            <svg
              className="h-6 w-6 text-blue-200 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2c-2.209 0-4 1.791-4 4v1h8v-1c0-2.209-1.791-4-4-4z"
              />
            </svg>
            <p>Secure authentication</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;