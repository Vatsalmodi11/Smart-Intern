import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface IExperience {
  role: string;
  company: string;
  period: string;
}

interface IProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  department: string;
  location: string;
  bio: string;
  skills: string[];
  experience: IExperience[];
  companyImage?: string;
}

const Profile: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState('profile');
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<IProfile>({
    name: '',
    title: '',
    email: '',
    phone: '',
    department: '',
    location: '',
    bio: '',
    skills: [],
    experience: [],
  });
  const [companyImage, setCompanyImage] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/profile');
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data: IProfile = await response.json();
      setProfileData(data);
      if (data.companyImage) setCompanyImage(data.companyImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profileData, companyImage }),
      });
      if (!response.ok) throw new Error('Failed to save profile');
      const updatedProfile: IProfile = await response.json();
      setProfileData(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSkills = [...profileData.skills];
    newSkills[index] = e.target.value;
    setProfileData((prev) => ({ ...prev, skills: newSkills }));
  };

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof IExperience
  ) => {
    const newExperience = [...profileData.experience];
    newExperience[index] = { ...newExperience[index], [field]: e.target.value };
    setProfileData((prev) => ({ ...prev, experience: newExperience }));
  };

  const addSkill = () => {
    setProfileData((prev) => ({ ...prev, skills: [...prev.skills, ''] }));
  };

  const addExperience = () => {
    setProfileData((prev) => ({
      ...prev,
      experience: [...prev.experience, { role: '', company: '', period: '' }],
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading && !isEditing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        selectedNav={selectedNav}
        setSelectedNav={setSelectedNav}
      />
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300 pt-0`}>
        <main className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
              <button onClick={fetchProfile} className="ml-2 underline">Retry</button>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg"></div>
            <div className="px-6 pb-6">
              <div className="flex justify-between items-end -mt-16">
                <div className="flex items-end">
                  <div className="relative">
                    {isEditing ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={companyImage || "/default-profile.jpg"}
                          alt="Company Profile"
                          className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                        <label htmlFor="company-image-upload" className="mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center">
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
                        src={companyImage || "/default-profile.jpg"}
                        alt="Company Profile"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                    )}
                  </div>
                  <div className="ml-6 mb-2">
                    <h2 className="text-3xl font-bold">{profileData.name || 'Add Your Name'}</h2>
                    <p className="text-gray-600">{profileData.title || 'Add Your Title'}</p>
                  </div>
                </div>
                <button
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  disabled={loading}
                  className={`bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center whitespace-nowrap ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <i className="fas fa-edit mr-2"></i>
                  {isEditing ? (loading ? 'Saving...' : 'Save Changes') : 'Edit Profile'}
                </button>
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
                    className={`px-6 py-4 text-sm font-medium cursor-pointer whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
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
                        { label: 'Company Name', name: 'name', type: 'text' as const },
                        { label: 'Company Email', name: 'email', type: 'email' as const },
                        { label: 'Company Phone', name: 'phone', type: 'tel' as const },
                        { label: 'Department', name: 'department', type: 'text' as const },
                        { label: 'Location', name: 'location', type: 'text' as const },
                      ].map((field) => (
                        <div key={field.name} className="flex items-center">
                          <i className={`fas fa-${field.name === 'name' ? 'user' : field.name === 'email' ? 'envelope' : field.name === 'phone' ? 'phone' : field.name === 'department' ? 'building' : 'map-marker-alt'} w-6 text-gray-400`}></i>
                          {isEditing ? (
                            <div className="ml-3 w-full">
                              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label}
                              </label>
                              <input
                                id={field.name}
                                type={field.type}
                                name={field.name}
                                value={profileData[field.name as keyof IProfile] || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                              />
                            </div>
                          ) : (
                            <div className="ml-3">
                              <p className="text-sm text-gray-500">{field.label}</p>
                              <p className="font-medium">{profileData[field.name as keyof IProfile] || 'Not added'}</p>
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
                            Company Bio
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            value={profileData.bio || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                            disabled={loading}
                          />
                        </div>
                      ) : (
                        <p className="text-gray-700">{profileData.bio || 'Add your bio here'}</p>
                      )}
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
                      {isEditing ? (
                        <div className="space-y-2">
                          {profileData.skills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                type="text"
                                value={skill}
                                onChange={(e) => handleSkillChange(e, index)}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Skill ${index + 1}`}
                                disabled={loading}
                              />
                            </div>
                          ))}
                          <button
                            onClick={addSkill}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            disabled={loading}
                          >
                            Add Skill
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.length > 0 ? (
                            profileData.skills.map((skill, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
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
                          {profileData.experience.map((exp, index) => (
                            <div key={index} className="space-y-2">
                              <input
                                type="text"
                                placeholder="Role"
                                value={exp.role}
                                onChange={(e) => handleExperienceChange(e, index, 'role')}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                              />
                              <input
                                type="text"
                                placeholder="Company"
                                value={exp.company}
                                onChange={(e) => handleExperienceChange(e, index, 'company')}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                              />
                              <input
                                type="text"
                                placeholder="Period (e.g., 2022 - Present)"
                                value={exp.period}
                                onChange={(e) => handleExperienceChange(e, index, 'period')}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                              />
                            </div>
                          ))}
                          <button
                            onClick={addExperience}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            disabled={loading}
                          >
                            Add Experience
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {profileData.experience.length > 0 ? (
                            profileData.experience.map((exp, index) => (
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
        </main>
      </div>
    </div>
  );
};

export default Profile;