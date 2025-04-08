import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import User from "../assets/image/profile.jpg";

const JobsTable = ({ searchQuery, selectedDepartment, selectedLocation, selectedStatus }) => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState('jobs');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [formData, setFormData] = useState({
    title: '', company: '', location: '', type: '', salaryRange: '', department: '', status: 'draft', description: '', requirements: [], logo: ''
  });

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, selectedDepartment, selectedLocation, selectedStatus]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = { search: searchQuery, department: selectedDepartment, location: selectedLocation, status: selectedStatus };
      const response = await axios.get('http://localhost:5000/api/jobs', { params });
      const validJobs = Array.isArray(response.data.data) 
        ? response.data.data.filter((job) => job._id && job.title && job.company) 
        : [];
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

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const newJob = { ...formData, requirements: formData.requirements, createdAt: new Date().toISOString() };
      const response = await axios.post('http://localhost:5000/api/jobs', newJob);
      if (response.status === 201 || response.status === 200) {
        setFormData({ title: '', company: '', location: '', type: '', salaryRange: '', department: '', status: 'draft', description: '', requirements: [], logo: '' });
        setShowCreateModal(false);
        fetchJobs();
      }
    } catch (error) {
      console.error('Error creating job:', error.message);
      setError('Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        setLoading(true);
        setError(null);
        await axios.delete(`http://localhost:5000/api/jobs/${id}`);
        fetchJobs();
        if (selectedJob && selectedJob._id === id) {
          setSelectedJob(null);
        }
      } catch (error) {
        console.error('Error deleting job:', error.message);
        setError('Failed to delete job. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        selectedNav={selectedNav}
        setSelectedNav={setSelectedNav}
      />
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <header className="bg-white h-16 flex items-center justify-between px-6 shadow-sm border-b">
          <div className="text-xl font-semibold text-gray-800">Jobs Management</div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>Create New Job
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2"
              >
                <img src={User} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
                <i className="fas fa-chevron-down text-gray-500"></i>
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                  {[{ icon: 'user', text: 'Profile', path: '/profile' }, { icon: 'cog', text: 'Settings', path: '/settings' }, { icon: 'sign-out-alt', text: 'Logout', path: '/logout' }].map((item, index) => (
                    <a key={index} href={item.path} className="block px-4 py-2 hover:bg-gray-100 flex items-center text-gray-700">
                      <i className={`fas fa-${item.icon} mr-2`}></i>{item.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="bg-white rounded-lg shadow-sm border w-full">
            <table className="w-full table-fixed">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-gray-600">
                  <th className="px-4 py-3 font-medium w-[15%]">Title</th>
                  <th className="px-4 py-3 font-medium w-[15%]">Company</th>
                  <th className="px-4 py-3 font-medium w-[15%]">Location</th>
                  <th className="px-4 py-3 font-medium w-[10%]">Type</th>
                  <th className="px-4 py-3 font-medium w-[10%]">Salary Range</th>
                  <th className="px-4 py-3 font-medium w-[10%]">Department</th>
                  <th className="px-4 py-3 font-medium w-[10%]">Status</th>
                  <th className="px-4 py-3 font-medium w-[15%]">Description</th>
                  <th className="px-4 py-3 font-medium w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-3 text-center text-gray-500">
                      Loading jobs...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-3 text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : Array.isArray(jobListings) && jobListings.length > 0 ? (
                  jobListings.map(job => (
                    <tr 
                      key={job._id} 
                      className={`border-t ${selectedJob && selectedJob._id === job._id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                      onClick={() => setSelectedJob(job)}
                    >
                      <td className="px-4 py-3 truncate">{job.title}</td>
                      <td className="px-4 py-3 truncate">{job.company}</td>
                      <td className="px-4 py-3 truncate">{job.location}</td>
                      <td className="px-4 py-3 truncate">{job.type}</td>
                      <td className="px-4 py-3 truncate">{job.salaryRange || 'N/A'}</td>
                      <td className="px-4 py-3 truncate">{job.department || 'N/A'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                          job.status === 'Active' ? 'bg-green-100 text-green-800' :
                          job.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          job.status === 'Draft' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 truncate">{job.description}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Link to={`/jobs/edit/${job._id}`}>
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                              <i className="fas fa-edit"></i>
                            </button>
                          </Link>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(job._id);
                            }} 
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-4 py-3 text-center text-gray-500">
                      No jobs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

        {showCreateModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/20">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Create New Job</h2>
                <button 
                  onClick={() => setShowCreateModal(false)} 
                  className="text-gray-600 hover:text-gray-800"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleCreateJob} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Type</option>
                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                  <input type="text" value={formData.salaryRange} onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Department</option>
                    {['Engineering', 'Marketing', 'Analytics', 'Design', 'Sales', 'HR'].map(dept => <option key={dept} value={dept}>{dept}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {['draft', 'pending', 'active'].map(status => <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (comma-separated)</label>
                  <input type="text" value={formData.requirements.join(', ')} onChange={(e) => setFormData({ ...formData, requirements: e.target.value.split(',').map(r => r.trim()) })} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 3+ years experience, JavaScript" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                  <input type="text" value={formData.logo} onChange={(e) => setFormData({ ...formData, logo: e.target.value })} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
                    {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : null}Create Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsTable;