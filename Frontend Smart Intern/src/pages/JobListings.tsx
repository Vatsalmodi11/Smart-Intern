import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Briefcase, Search, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobListings = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, selectedDepartment, selectedLocation, selectedStatus, startDate, endDate]);

  const fetchUser = async () => {
    try {
      setUserLoading(true);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }
      const config = { headers: { 'user-id': userId } };
      const response = await axios.get('http://localhost:5000/api/auth/user', config);
      if (!response.data || !response.data.email) {
        throw new Error('Invalid user data received');
      }
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error.message);
      setError('Failed to fetch user data. Please log in again.');
      setUser(null);
      navigate('/login');
    } finally {
      setUserLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = { search: searchQuery, department: selectedDepartment, location: selectedLocation, status: selectedStatus, startDate, endDate };
      const response = await axios.get('http://localhost:5000/api/jobs', { params });
      const validJobs = Array.isArray(response.data.data) ? response.data.data.filter((job) => job._id && job.title && job.company) : [];
      setJobListings(validJobs);
      if (validJobs.length > 0 && !selectedJob) {
        setSelectedJob(validJobs[0]);
      }
      if (validJobs.length === 0 && response.data.data?.length > 0) {
        setError('Some jobs are missing required fields (_id, title, or company).');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error.message);
      setError('Failed to fetch jobs. Please ensure the backend server is running.');
      setJobListings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (job) => {
    if (userLoading) {
      alert('Please wait while we verify your authentication status.');
      return;
    }
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      if (!job._id || !job.title || !job.company) {
        throw new Error('Job object is missing required fields.');
      }
      const userId = localStorage.getItem('userId');
      const applicationData = {
        userId,
        jobId: job._id,
        userName: user.userType === 'jobseeker' ? `${user.firstName} ${user.lastName}` : user.companyName,
        userEmail: user.email, // Added userEmail
        avatar: 'https://example.com/default-avatar.jpg',
        action: 'applied for job',
        position: job.title,
        company: job.company,
        salary: job.salaryRange || 'Salary TBD',
        appliedAt: new Date().toISOString(),
      };
      console.log('Application Data Submitted:', applicationData);
      const config = { headers: { 'user-id': userId } };
      const response = await axios.post('http://localhost:5000/api/applications', applicationData, config);
      alert('Application submitted successfully!');
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error submitting application:', error.message);
      let errorMessage = 'Failed to submit application. Please try again.';
      if (error.response?.status === 401) {
        errorMessage = 'Authentication failed. Please log in again.';
        navigate('/login');
      } else if (error.response?.status === 404) {
        errorMessage = 'Job not found.';
      }
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-4 animate-slide-up">
          <div className="relative w-full sm:w-2/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for your dream job..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-300 hover:border-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="font-medium">Filters</span>
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-4 animate-pulse font-medium">{error}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <p className="text-center text-blue-600 text-lg animate-pulse font-medium">Loading jobs...</p>
            ) : jobListings.length === 0 ? (
              <p className="text-center text-gray-500 text-lg animate-fade-in font-medium">No jobs found</p>
            ) : (
              jobListings.map((job) => (
                <div
                  key={job._id}
                  className={`bg-white rounded-md p-4 cursor-pointer border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-gray-300 ${
                    selectedJob?._id === job._id ? 'border-gray-500 bg-gray-50 shadow-md' : ''
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        job.logo ||
                        `https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop&q=${job._id}`
                      }
                      alt="Company logo"
                      className="w-10 h-10 rounded-md object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 line-clamp-1 hover:text-gray-700 transition-colors duration-300">
                        {job.title}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium line-clamp-1">{job.company}</p>
                      <div className="flex flex-wrap gap-2 mt-1 text-xs text-blue-600">
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Briefcase className="h-3 w-3 mr-1 text-gray-400" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApply(job);
                      }}
                      className="text-blue-600 font-medium hover:text-gray-800 text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-3 bg-white rounded-md border border-gray-200 p-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto shadow-sm transition-all duration-300 hover:shadow-md">
            {selectedJob ? (
              <div className="space-y-6 animate-slide-up">
                <div className="flex items-start justify-between border-b border-gray-200 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                    <p className="text-blue-600 mt-1 text-base font-medium">{selectedJob.company}</p>
                  </div>
                  <button
                    onClick={() => handleApply(selectedJob)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 font-medium"
                  >
                    Apply Now
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-blue-600">
                  <div>
                    <span className="font-medium text-gray-900">Location:</span>
                    <p>{selectedJob.location}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Type:</span>
                    <p>{selectedJob.type}</p>
                  </div>
                  {selectedJob.salaryRange && (
                    <div>
                      <span className="font-medium text-gray-900">Salary:</span>
                      <p className="text-gray-700">{selectedJob.salaryRange}</p>
                    </div>
                  )}
                  {selectedJob.department && (
                    <div>
                      <span className="font-medium text-gray-900">Department:</span>
                      <p>{selectedJob.department}</p>
                    </div>
                  )}
                  {selectedJob.status && (
                    <div>
                      <span className="font-medium text-gray-900">Status:</span>
                      <p>{selectedJob.status}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About the Role</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{selectedJob.description}</p>
                </div>

                {selectedJob.requirements && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
                    {Array.isArray(selectedJob.requirements) ? (
                      <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                        {selectedJob.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700 text-sm">{selectedJob.requirements}</p>
                    )}
                  </div>
                )}

                {Object.entries(selectedJob).map(([key, value]) => {
                  if (
                    !['_id', 'title', 'company', 'location', 'type', 'salaryRange', 'description', 'requirements', 'logo', 'department', 'status', 'createdAt'].includes(key) &&
                    value
                  ) {
                    return (
                      <div key={key}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-gray-700 text-sm">
                          {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full animate-fade-in">
                <div className="text-center">
                  <p className="text-blue-600 text-lg font-semibold">No Job Selected</p>
                  <p className="text-gray-400 text-sm mt-1">Click a job to view all details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;