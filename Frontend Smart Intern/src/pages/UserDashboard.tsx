// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface Experience {
//   role: string;
//   company: string;
//   period: string;
// }

// interface UserData {
//   userType: 'jobseeker' | 'recruiter';
//   email: string;
//   phone: string;
//   firstName?: string;
//   lastName?: string;
//   companyName?: string;
//   title?: string;
//   department?: string;
//   location?: string;
//   bio?: string;
//   skills?: string[];
//   experience?: Experience[];
//   companyImage?: string | null;
//   industry?: string;
//   companySize?: string;
//   collegeName?: string; // Added collegeName for jobseekers
// }

// const UserDashboard = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [companyImage, setCompanyImage] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState('personal');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (!userId) {
//           throw new Error('User ID not found. Please sign in again.');
//         }

//         const response = await fetch('http://localhost:5000/api/auth/user', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'User-Id': userId,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }

//         const data = await response.json();
//         setUserData({
//           userType: data.userType || 'recruiter',
//           email: data.email || '',
//           phone: data.phone || '',
//           firstName: data.firstName || '',
//           lastName: data.lastName || '',
//           companyName: data.companyName || '',
//           title: data.title || '',
//           department: data.department || '',
//           location: data.location || '',
//           bio: data.bio || '',
//           skills: data.skills ? (Array.isArray(data.skills) ? data.skills : [data.skills]) : [],
//           experience: data.experience || [],
//           companyImage: data.companyImage || null,
//           industry: data.industry || '',
//           companySize: data.companySize || '',
//           collegeName: data.collegeName || '', // Added collegeName
//         });
//         setCompanyImage(data.companyImage || null);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setUserData((prev) => (prev ? { ...prev, [name]: value } : null));
//   };

//   const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     if (!userData) return;
//     const newSkills = [...userData.skills];
//     newSkills[index] = e.target.value;
//     setUserData({ ...userData, skills: newSkills });
//   };

//   const handleExperienceChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number,
//     field: keyof Experience
//   ) => {
//     if (!userData) return;
//     const newExperience = [...userData.experience];
//     newExperience[index] = { ...newExperience[index], [field]: e.target.value };
//     setUserData({ ...userData, experience: newExperience });
//   };

//   const addSkill = () => {
//     if (!userData) return;
//     setUserData({ ...userData, skills: [...userData.skills, ''] });
//   };

//   const addExperience = () => {
//     if (!userData) return;
//     setUserData({
//       ...userData,
//       experience: [...userData.experience, { role: '', company: '', period: '' }],
//     });
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCompanyImage(reader.result as string);
//         if (userData) {
//           setUserData({ ...userData, companyImage: reader.result as string });
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSave = async () => {
//     setIsEditing(false);
//     console.log('Profile data saved:', { ...userData, companyImage });
//     if (!userData) return;
//     try {
//       const userId = localStorage.getItem('userId');
//       const response = await fetch('http://localhost:5000/api/auth/user', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'User-Id': userId || '',
//         },
//         body: JSON.stringify({ ...userData, companyImage }),
//       });
//       if (!response.ok) throw new Error('Failed to save profile data');
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to save data');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('userId');
//     navigate('/login');
//   };

//   if (loading) return <div className="pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><p className="text-center">Loading...</p></div></div>;
//   if (error) return <div className="pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><p className="text-center text-red-500">{error}</p></div></div>;
//   if (!userData) return null;

//   return (
//     <div className="pt-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
//       <div 
//   className="bg-white rounded-lg shadow-sm mb-6"
//   style={{
//     backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`, // Education-themed image from Unsplash
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat'
//   }}
// >
//   <div className="px-6 pb-6 bg-white/50 backdrop-blur-sm rounded-lg">
//     <div className="flex justify-between items-end -mt-16">
//       <div className="flex items-end">
//         <div className="relative">
//           {isEditing ? (
//             <div className="flex flex-col items-center">
//               <img
//                 src={companyImage || "/path/to/profile-pic-large.jpg"}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
//               />
//               <label
//                 htmlFor="company-image-upload"
//                 className="mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
//               >
//                 <i className="fas fa-upload mr-2"></i>
//                 Upload Image
//               </label>
//               <input
//                 id="company-image-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//             </div>
//           ) : (
//             <img
//               src={companyImage || "/path/to/profile-pic-large.jpg"}
//               alt="Profile"
//               className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
//             />
//           )}
//         </div>
//         <div className="ml-6 mb-2">
//           <h2 className="text-3xl font-bold text-gray-900">
//             {userData.userType === 'jobseeker'
//               ? `${userData.firstName || 'Add Your Name'} ${userData.lastName || ''}`
//               : userData.companyName || 'Add Your Name'}
//           </h2>
//           <p className="text-gray-700">{userData.title || 'Add Your Title'}</p>
//         </div>
//       </div>
//       <div className="flex gap-4">
//         <button
//           onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
//           className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
//         >
//           <i className="fas fa-edit mr-2"></i>
//           {isEditing ? 'Save Changes' : 'Edit Profile'}
//         </button>
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="border-b">
//             <div className="flex">
//               {['personal'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 py-4 text-sm font-medium cursor-pointer whitespace-nowrap ${
//                     activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="p-6">
//             {activeTab === 'personal' && (
//               <div className="grid grid-cols-2 gap-6">
//                 {/* Personal Information */}
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
//                   <div className="space-y-4">
//                     {[
//                       { label: userData.userType === 'jobseeker' ? 'Full Name' : 'Company Name', name: userData.userType === 'jobseeker' ? 'firstName' : 'companyName', type: 'text' },
//                       { label: userData.userType === 'jobseeker' ? 'Email' : 'Company Email', name: 'email', type: 'email' },
//                       { label: userData.userType === 'jobseeker' ? 'Phone' : 'Company Phone', name: 'phone', type: 'tel' },
//                       ...(userData.userType === 'jobseeker'
//                         ? [{ label: 'College Name', name: 'collegeName', type: 'text' }]
//                         : []),
//                       { label: userData.userType === 'jobseeker' ? 'Department' : 'Company Department', name: 'department', type: 'text' },
//                       { label: userData.userType === 'jobseeker' ? 'Location' : 'Company Location', name: 'location', type: 'text' },
//                     ].map((field) => (
//                       <div key={field.name} className="flex items-center">
//                         <i
//                           className={`fas fa-${
//                             field.name === 'firstName' || field.name === 'companyName'
//                               ? 'user'
//                               : field.name === 'email'
//                               ? 'envelope'
//                               : field.name === 'phone'
//                               ? 'phone'
//                               : field.name === 'collegeName'
//                               ? 'university'
//                               : field.name === 'department'
//                               ? 'building'
//                               : 'map-marker-alt'
//                           } w-6 text-gray-400`}
//                         ></i>
//                         {isEditing ? (
//                           <div className="ml-3 w-full">
//                             <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
//                               {field.label}
//                             </label>
//                             <input
//                               id={field.name}
//                               type={field.type}
//                               name={field.name}
//                               value={userData[field.name as keyof UserData] || ''}
//                               onChange={handleInputChange}
//                               className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                         ) : (
//                           <div className="ml-3">
//                             <p className="text-sm text-gray-500">{field.label}</p>
//                             <p className="font-medium">{userData[field.name as keyof UserData] || 'Not added'}</p>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Professional Information */}
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
//                   <div className="mb-6">
//                     <h4 className="text-sm font-medium text-gray-500 mb-2">Bio</h4>
//                     {isEditing ? (
//                       <div>
//                         <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
//                           {userData.userType === 'jobseeker' ? 'Bio' : 'Company Bio'}
//                         </label>
//                         <textarea
//                           id="bio"
//                           name="bio"
//                           value={userData.bio || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           rows={4}
//                         />
//                       </div>
//                     ) : (
//                       <p className="text-gray-700">{userData.bio || 'Add your bio here'}</p>
//                     )}
//                   </div>

//                   <div className="mb-6">
//                     <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
//                     {isEditing ? (
//                       <div className="space-y-2">
//                         {userData.skills?.map((skill, index) => (
//                           <div key={index} className="flex items-center">
//                             <div className="w-full">
//                               <label htmlFor={`skill-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                                 Skill {index + 1}
//                               </label>
//                               <input
//                                 id={`skill-${index}`}
//                                 type="text"
//                                 value={skill}
//                                 onChange={(e) => handleSkillChange(e, index)}
//                                 className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           onClick={addSkill}
//                           className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                         >
//                           Add Skill
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex flex-wrap gap-2">
//                         {userData.skills && userData.skills.length > 0 ? (
//                           userData.skills.map((skill, index) => (
//                             <span key={index} className="bg-blue-100 text-blue-800 IEPX-3 py-1 rounded-full text-sm">
//                               {skill}
//                             </span>
//                           ))
//                         ) : (
//                           <p className="text-gray-500">No skills added</p>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500 mb-2">Experience</h4>
//                     {isEditing ? (
//                       <div className="space-y-4">
//                         {userData.experience?.map((exp, index) => (
//                           <div key={index} className="space-y-2">
//                             <div>
//                               <label htmlFor={`role-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                                 Role {index + 1}
//                               </label>
//                               <input
//                                 id={`role-${index}`}
//                                 type="text"
//                                 placeholder="Role"
//                                 value={exp.role}
//                                 onChange={(e) => handleExperienceChange(e, index, 'role')}
//                                 className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                                 Company {index + 1}
//                               </label>
//                               <input
//                                 id={`company-${index}`}
//                                 type="text"
//                                 placeholder="Company"
//                                 value={exp.company}
//                                 onChange={(e) => handleExperienceChange(e, index, 'company')}
//                                 className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label htmlFor={`period-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                                 Period {index + 1} (e.g., 2022 - Present)
//                               </label>
//                               <input
//                                 id={`period-${index}`}
//                                 type="text"
//                                 placeholder="Period (e.g., 2022 - Present)"
//                                 value={exp.period}
//                                 onChange={(e) => handleExperienceChange(e, index, 'period')}
//                                 className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           onClick={addExperience}
//                           className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                         >
//                           Add Experience
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         {userData.experience && userData.experience.length > 0 ? (
//                           userData.experience.map((exp, index) => (
//                             <div key={index} className="flex items-start">
//                               <i className="fas fa-briefcase w-6 text-gray-400 mt-1"></i>
//                               <div className="ml-3">
//                                 <p className="font-medium">{exp.role}</p>
//                                 <p className="text-gray-600">{exp.company}</p>
//                                 <p className="text-sm text-gray-500">{exp.period}</p>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <p className="text-gray-500">No experience added</p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;



import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Experience {
  role: string;
  company: string;
  period: string;
}

interface UserData {
  userType: 'jobseeker' | 'recruiter';
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  title?: string;
  department?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: Experience[];
  companyImage?: string | null;
  industry?: string;
  companySize?: string;
  collegeName?: string;
}

const UserDashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [companyImage, setCompanyImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found. Please sign in again.');
        }

        const response = await fetch('http://localhost:5000/api/auth/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-Id': userId,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData({
          userType: data.userType || 'recruiter',
          email: data.email || '',
          phone: data.phone || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          companyName: data.companyName || '',
          title: data.title || '',
          department: data.department || '',
          location: data.location || '',
          bio: data.bio || '',
          skills: data.skills ? (Array.isArray(data.skills) ? data.skills : [data.skills]) : [],
          experience: data.experience || [],
          companyImage: data.companyImage || null,
          industry: data.industry || '',
          companySize: data.companySize || '',
          collegeName: data.collegeName || '',
        });
        setCompanyImage(data.companyImage || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!userData) return;
    const newSkills = [...userData.skills];
    newSkills[index] = e.target.value;
    setUserData({ ...userData, skills: newSkills });
  };

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Experience
  ) => {
    if (!userData) return;
    const newExperience = [...userData.experience];
    newExperience[index] = { ...newExperience[index], [field]: e.target.value };
    setUserData({ ...userData, experience: newExperience });
  };

  const addSkill = () => {
    if (!userData) return;
    setUserData({ ...userData, skills: [...userData.skills, ''] });
  };

  const addExperience = () => {
    if (!userData) return;
    setUserData({
      ...userData,
      experience: [...userData.experience, { role: '', company: '', period: '' }],
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyImage(reader.result as string);
        if (userData) {
          setUserData({ ...userData, companyImage: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!userData) return;
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:5000/api/auth/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'User-Id': userId || '',
        },
        body: JSON.stringify({ ...userData, companyImage }),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile data');
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  if (loading) return <div className="pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><p className="text-center">Loading...</p></div></div>;
  if (error) return <div className="pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><p className="text-center text-red-500">{error}</p></div></div>;
  if (!userData) return null;

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        <div 
          className="bg-white rounded-lg shadow-sm mb-6"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="px-6 pb-6 bg-white/50 backdrop-blur-sm rounded-lg">
            <div className="flex justify-between items-end -mt-16">
              <div className="flex items-end">
                <div className="relative">
                  {isEditing ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={companyImage || "/path/to/profile-pic-large.jpg"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                      <label
                        htmlFor="company-image-upload"
                        className="mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                      >
                        <i className="fas fa-upload mr-2"></i>
                        Upload Image
                      </label>
                      <input
                        id="company-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <img
                      src={companyImage || "/path/to/profile-pic-large.jpg"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  )}
                </div>
                <div className="ml-6 mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {userData.userType === 'jobseeker'
                      ? `${userData.firstName || 'Add Your Name'} ${userData.lastName || ''}`
                      : userData.companyName || 'Add Your Name'}
                  </h2>
                  <p className="text-gray-700">{userData.title || 'Add Your Title'}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                  <i className="fas fa-edit mr-2"></i>
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <div className="flex">
              {['personal'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium cursor-pointer whitespace-nowrap ${
                    activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'personal' && (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    {[
                      { label: userData.userType === 'jobseeker' ? 'Full Name' : 'Company Name', name: userData.userType === 'jobseeker' ? 'firstName' : 'companyName', type: 'text' },
                      { label: userData.userType === 'jobseeker' ? 'Email' : 'Company Email', name: 'email', type: 'email' },
                      { label: userData.userType === 'jobseeker' ? 'Phone' : 'Company Phone', name: 'phone', type: 'tel' },
                      ...(userData.userType === 'jobseeker'
                        ? [{ label: 'College Name', name: 'collegeName', type: 'text' }]
                        : []),
                      { label: userData.userType === 'jobseeker' ? 'Department' : 'Company Department', name: 'department', type: 'text' },
                      { label: userData.userType === 'jobseeker' ? 'Location' : 'Company Location', name: 'location', type: 'text' },
                    ].map((field) => (
                      <div key={field.name} className="flex items-center">
                        <i
                          className={`fas fa-${
                            field.name === 'firstName' || field.name === 'companyName'
                              ? 'user'
                              : field.name === 'email'
                              ? 'envelope'
                              : field.name === 'phone'
                              ? 'phone'
                              : field.name === 'collegeName'
                              ? 'university'
                              : field.name === 'department'
                              ? 'building'
                              : 'map-marker-alt'
                          } w-6 text-gray-400`}
                        ></i>
                        {isEditing ? (
                          <div className="ml-3 w-full">
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                              {field.label}
                            </label>
                            <input
                              id={field.name}
                              type={field.type}
                              name={field.name}
                              value={userData[field.name as keyof UserData] || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        ) : (
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">{field.label}</p>
                            <p className="font-medium">{userData[field.name as keyof UserData] || 'Not added'}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Bio</h4>
                    {isEditing ? (
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                          {userData.userType === 'jobseeker' ? 'Bio' : 'Company Bio'}
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={userData.bio || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                        />
                      </div>
                    ) : (
                      <p className="text-gray-700">{userData.bio || 'Add your bio here'}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
                    {isEditing ? (
                      <div className="space-y-2">
                        {userData.skills?.map((skill, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-full">
                              <label htmlFor={`skill-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Skill {index + 1}
                              </label>
                              <input
                                id={`skill-${index}`}
                                type="text"
                                value={skill}
                                onChange={(e) => handleSkillChange(e, index)}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={addSkill}
                          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Add Skill
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {userData.skills && userData.skills.length > 0 ? (
                          userData.skills.map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 IEPX-3 py-1 rounded-full text-sm">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500">No skills added</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Experience</h4>
                    {isEditing ? (
                      <div className="space-y-4">
                        {userData.experience?.map((exp, index) => (
                          <div key={index} className="space-y-2">
                            <div>
                              <label htmlFor={`role-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Role {index + 1}
                              </label>
                              <input
                                id={`role-${index}`}
                                type="text"
                                placeholder="Role"
                                value={exp.role}
                                onChange={(e) => handleExperienceChange(e, index, 'role')}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Company {index + 1}
                              </label>
                              <input
                                id={`company-${index}`}
                                type="text"
                                placeholder="Company"
                                value={exp.company}
                                onChange={(e) => handleExperienceChange(e, index, 'company')}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label htmlFor={`period-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Period {index + 1} (e.g., 2022 - Present)
                              </label>
                              <input
                                id={`period-${index}`}
                                type="text"
                                placeholder="Period (e.g., 2022 - Present)"
                                value={exp.period}
                                onChange={(e) => handleExperienceChange(e, index, 'period')}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={addExperience}
                          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Add Experience
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userData.experience && userData.experience.length > 0 ? (
                          userData.experience.map((exp, index) => (
                            <div key={index} className="flex items-start">
                              <i className="fas fa-briefcase w-6 text-gray-400 mt-1"></i>
                              <div className="ml-3">
                                <p className="font-medium">{exp.role}</p>
                                <p className="text-gray-600">{exp.company}</p>
                                <p className="text-sm text-gray-500">{exp.period}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No experience added</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

















// this is static code

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface Experience {
//   role: string;
//   company: string;
//   period: string;
// }

// interface PersistentUserData {
//   userType: 'jobseeker' | 'recruiter';
//   email: string;
//   phone: string;
//   firstName?: string;
//   lastName?: string;
//   companyName?: string;
//   skills?: string[];
// }

// interface TemporaryUserData {
//   title?: string;
//   department?: string;
//   location?: string;
//   bio?: string;
//   experience?: Experience[];
//   companyImage?: string | null;
//   industry?: string;
//   companySize?: string;
//   collegeName?: string;
// }

// const UserDashboard = () => {
//   const [persistentData, setPersistentData] = useState<PersistentUserData | null>(null);
//   const [temporaryData, setTemporaryData] = useState<TemporaryUserData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [companyImage, setCompanyImage] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState('personal');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Load persistent data from localStorage or set defaults
//     const storedData = localStorage.getItem('persistentUserData');
//     const defaultPersistentData: PersistentUserData = {
//       userType: 'jobseeker', // Added userType
//       email: 'john.doe@example.com', // Added email
//       phone: '123-456-7890', // Added phone
//       firstName: 'John', // Added firstName
//       lastName: 'Doe', // Added lastName
//       companyName: '',
//       skills: ['JavaScript', 'React', 'Node.js'],
//     };

//     const initialPersistentData = storedData ? JSON.parse(storedData) : defaultPersistentData;
//     setPersistentData(initialPersistentData);

//     // Set temporary data
//     const initialTemporaryData: TemporaryUserData = {
//       title: 'Software Engineer',
//       department: 'Engineering',
//       location: 'New York, NY',
//       bio: 'Experienced developer with a passion for coding.',
//       experience: [
//         { role: 'Developer', company: 'Tech Corp', period: '2020 - Present' },
//         { role: 'Junior Dev', company: 'StartUp Inc', period: '2018 - 2020' },
//       ],
//       companyImage: null,
//       industry: '',
//       companySize: '',
//       collegeName: 'Example University',
//     };
//     setTemporaryData(initialTemporaryData);
//     setCompanyImage(initialTemporaryData.companyImage);

//     setLoading(false);

//     // Reset temporary data after 10 minutes (600,000 ms)
//     const timeout = setTimeout(() => {
//       setTemporaryData(null);
//       setCompanyImage(null);
//       setError('Temporary data has expired after 10 minutes.');
//     }, 600000);

//     // Cleanup timeout on unmount
//     return () => clearTimeout(timeout);
//   }, []);

//   const handlePersistentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPersistentData((prev) => {
//       if (!prev) return prev;
//       const updated = { ...prev, [name]: value };
//       localStorage.setItem('persistentUserData', JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const handleTemporaryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setTemporaryData((prev) => (prev ? { ...prev, [name]: value } : null));
//   };

//   const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     if (!persistentData) return;
//     const newSkills = [...persistentData.skills!];
//     newSkills[index] = e.target.value;
//     setPersistentData((prev) => {
//       const updated = { ...prev!, skills: newSkills };
//       localStorage.setItem('persistentUserData', JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const handleExperienceChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number,
//     field: keyof Experience
//   ) => {
//     if (!temporaryData) return;
//     const newExperience = [...temporaryData.experience!];
//     newExperience[index] = { ...newExperience[index], [field]: e.target.value };
//     setTemporaryData({ ...temporaryData, experience: newExperience });
//   };

//   const addSkill = () => {
//     if (!persistentData) return;
//     const updated = { ...persistentData, skills: [...persistentData.skills!, ''] };
//     setPersistentData(updated);
//     localStorage.setItem('persistentUserData', JSON.stringify(updated));
//   };

//   const addExperience = () => {
//     if (!temporaryData) return;
//     setTemporaryData({
//       ...temporaryData,
//       experience: [...temporaryData.experience!, { role: '', company: '', period: '' }],
//     });
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCompanyImage(reader.result as string);
//         if (temporaryData) {
//           setTemporaryData({ ...temporaryData, companyImage: reader.result as string });
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     console.log('Persistent data saved:', persistentData);
//     console.log('Temporary data saved:', { ...temporaryData, companyImage });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('userId');
//     navigate('/login');
//   };

//   if (loading) return <div className="pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><p className="text-center">Loading...</p></div></div>;
//   if (error) return <div className="pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><p className="text-center text-red-500">{error}</p></div></div>;
//   if (!persistentData) return <div className="pt-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><p className="text-center">No persistent data available</p></div></div>;

//   return (
//     <div className="pt-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-lg shadow-sm mb-6">
//           <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg"></div>
//           <div className="px-6 pb-6">
//             <div className="flex justify-between items-end -mt-16">
//               <div className="flex items-end">
//                 <div className="relative">
//                   {isEditing ? (
//                     <div className="flex flex-col items-center">
//                       <img
//                         src={companyImage || "/path/to/profile-pic-large.jpg"}
//                         alt="Profile"
//                         className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
//                       />
//                       <label
//                         htmlFor="company-image-upload"
//                         className="mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
//                       >
//                         <i className="fas fa-upload mr-2"></i>
//                         Upload Image
//                       </label>
//                       <input
//                         id="company-image-upload"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="hidden"
//                       />
//                     </div>
//                   ) : (
//                     <img
//                       src={companyImage || "/path/to/profile-pic-large.jpg"}
//                       alt="Profile"
//                       className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
//                     />
//                   )}
//                 </div>
//                 <div className="ml-6 mb-2">
//                   <h2 className="text-3xl font-bold">
//                     {persistentData.userType === 'jobseeker'
//                       ? `${persistentData.firstName || 'Add Your Name'} ${persistentData.lastName || ''}`
//                       : persistentData.companyName || 'Add Your Name'}
//                   </h2>
//                   <p className="text-gray-600">{temporaryData?.title || 'Add Your Title'}</p>
//                 </div>
//               </div>
//               <div className="flex gap-4">
//                 <button
//                   onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
//                   className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
//                 >
//                   <i className="fas fa-edit mr-2"></i>
//                   {isEditing ? 'Save Changes' : 'Edit Profile'}
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="border-b">
//             <div className="flex">
//               {['personal'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 py-4 text-sm font-medium cursor-pointer whitespace-nowrap ${
//                     activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="p-6">
//             {activeTab === 'personal' && (
//               <div className="grid grid-cols-2 gap-6">
//                 {/* Personal Information */}
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
//                   <div className="space-y-4">
//                     {[
//                       { label: persistentData.userType === 'jobseeker' ? 'Full Name' : 'Company Name', name: persistentData.userType === 'jobseeker' ? 'firstName' : 'companyName', type: 'text', isPersistent: true },
//                       { label: persistentData.userType === 'jobseeker' ? 'Email' : 'Company Email', name: 'email', type: 'email', isPersistent: true },
//                       { label: persistentData.userType === 'jobseeker' ? 'Phone' : 'Company Phone', name: 'phone', type: 'tel', isPersistent: true },
//                       ...(persistentData.userType === 'jobseeker'
//                         ? [{ label: 'College Name', name: 'collegeName', type: 'text', isPersistent: false }]
//                         : []),
//                       { label: persistentData.userType === 'jobseeker' ? 'Department' : 'Company Department', name: 'department', type: 'text', isPersistent: false },
//                       { label: persistentData.userType === 'jobseeker' ? 'Location' : 'Company Location', name: 'location', type: 'text', isPersistent: false },
//                     ].map((field) => (
//                       <div key={field.name} className="flex items-center">
//                         <i
//                           className={`fas fa-${
//                             field.name === 'firstName' || field.name === 'companyName'
//                               ? 'user'
//                               : field.name === 'email'
//                               ? 'envelope'
//                               : field.name === 'phone'
//                               ? 'phone'
//                               : field.name === 'collegeName'
//                               ? 'university'
//                               : field.name === 'department'
//                               ? 'building'
//                               : 'map-marker-alt'
//                           } w-6 text-gray-400`}
//                         ></i>
//                         {isEditing ? (
//                           <div className="ml-3 w-full">
//                             <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
//                               {field.label}
//                             </label>
//                             <input
//                               id={field.name}
//                               type={field.type}
//                               name={field.name}
//                               value={
//                                 field.isPersistent
//                                   ? persistentData[field.name as keyof PersistentUserData] || ''
//                                   : temporaryData?.[field.name as keyof TemporaryUserData] || ''
//                               }
//                               onChange={field.isPersistent ? handlePersistentInputChange : handleTemporaryInputChange}
//                               className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                         ) : (
//                           <div className="ml-3">
//                             <p className="text-sm text-gray-500">{field.label}</p>
//                             <p className="font-medium">
//                               {field.isPersistent
//                                 ? persistentData[field.name as keyof PersistentUserData] || 'Not added'
//                                 : temporaryData?.[field.name as keyof TemporaryUserData] || 'Not added'}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Professional Information */}
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
//                   <div className="mb-6">
//                     <h4 className="text-sm font-medium text-gray-500 mb-2">Bio</h4>
//                     {isEditing ? (
//                       <div>
//                         <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
//                           {persistentData.userType === 'jobseeker' ? 'Bio' : 'Company Bio'}
//                         </label>
//                         <textarea
//                           id="bio"
//                           name="bio"
//                           value={temporaryData?.bio || ''}
//                           onChange={handleTemporaryInputChange}
//                           className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           rows={4}
//                         />
//                       </div>
//                     ) : (
//                       <p className="text-gray-700">{temporaryData?.bio || 'Add your bio here'}</p>
//                     )}
//                   </div>

//                   <div className="mb-6">
//                     <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
//                     {isEditing ? (
//                       <div className="space-y-2">
//                         {persistentData.skills?.map((skill, index) => (
//                           <div key={index} className="flex items-center">
//                             <div className="w-full">
//                               <label htmlFor={`skill-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                                 Skill {index + 1}
//                               </label>
//                               <input
//                                 id={`skill-${index}`}
//                                 type="text"
//                                 value={skill}
//                                 onChange={(e) => handleSkillChange(e, index)}
//                                 className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           onClick={addSkill}
//                           className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                         >
//                           Add Skill
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex flex-wrap gap-2">
//                         {persistentData.skills && persistentData.skills.length > 0 ? (
//                           persistentData.skills.map((skill, index) => (
//                             <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                               {skill}
//                             </span>
//                           ))
//                         ) : (
//                           <p className="text-gray-500">No skills added</p>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500 mb-2">Experience</h4>
//                     {isEditing ? (
//                       <div className="space-y-4">
//                         {temporaryData?.experience?.map((exp, index) => (
//                           <div key={index} className="space-y-2">
//                             <div>
//                               <label htmlFor={`role-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                                 Role {index + 1}
//                               </label>
//                               <input
//                                 id={`role-${index}`}
//                                 type="text"
//                                 placeholder="Role"
//                                 value={exp.role}
//                                 onChange={(e) => handleExperienceChange(e, index, 'role')}
//                                 className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                                 Company {index + 1}
//                               </label>
//                               <input
//                                 id={`company-${index}`}
//                                 type="text"
//                                 placeholder="Company"
//                                 value={exp.company}
//                                 onChange={(e) => handleExperienceChange(e, index, 'company')}
//                                 className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label htmlFor={`period-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
//                                 Period {index + 1} (e.g., 2022 - Present)
//                               </label>
//                               <input
//                                 id={`period-${index}`}
//                                 type="text"
//                                 placeholder="Period (e.g., 2022 - Present)"
//                                 value={exp.period}
//                                 onChange={(e) => handleExperienceChange(e, index, 'period')}
//                                 className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           onClick={addExperience}
//                           className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                         >
//                           Add Experience
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         {temporaryData?.experience && temporaryData.experience.length > 0 ? (
//                           temporaryData.experience.map((exp, index) => (
//                             <div key={index} className="flex items-start">
//                               <i className="fas fa-briefcase w-6 text-gray-400 mt-1"></i>
//                               <div className="ml-3">
//                                 <p className="font-medium">{exp.role}</p>
//                                 <p className="text-gray-600">{exp.company}</p>
//                                 <p className="text-sm text-gray-500">{exp.period}</p>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <p className="text-gray-500">No experience added</p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;