import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import User from "../assets/image/profile.jpg";

const Jobs = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState('jobs');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [jobListings, setJobListings] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Job creation states
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salaryRange: '',
    department: '',
    status: 'draft',
    description: '',
    requirements: [],
    logo: '',
  });
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef(null);

  const departments = ['Engineering', 'Marketing', 'Analytics', 'Design', 'Sales', 'HR'];
  const locations = ['San Francisco, CA', 'New York, NY', 'Boston, MA', 'Seattle, WA', 'Austin, TX'];
  const statuses = ['Active', 'Pending', 'Closed', 'Draft'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, selectedDepartment, selectedLocation, selectedStatus]);

  const fetchJobs = async () => {
    try {
      const params = {
        search: searchQuery,
        department: selectedDepartment,
        location: selectedLocation,
        status: selectedStatus,
      };
      const response = await axios.get('http://localhost:5000/api/jobs', { params });
      console.log('API Response:', response.data);
      if (Array.isArray(response.data)) {
        setJobListings(response.data);
      } else {
        console.error('API did not return an array:', response.data);
        setJobListings([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobListings([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`http://localhost:5000/api/jobs/${id}`);
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.type) newErrors.type = 'Job type is required';
    if (!editorContent.trim()) newErrors.description = 'Job description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = async () => {
    if (validateForm()) {
      setIsSaving(true);
      try {
        const jobData = {
          ...formData,
          description: editorContent,
          requirements: formData.requirements,
          createdAt: new Date(),
        };
        await axios.post('http://localhost:5000/api/jobs', jobData);
        setIsSaving(false);
        setShowCreateModal(false);
        fetchJobs();
        resetForm();
      } catch (error) {
        console.error('Error publishing job:', error);
        setIsSaving(false);
      }
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const jobData = {
        ...formData,
        description: editorContent,
        requirements: formData.requirements,
        status: 'draft',
        createdAt: new Date(),
      };
      await axios.post('http://localhost:5000/api/jobs', jobData);
      setIsSaving(false);
      setShowCreateModal(false);
      fetchJobs();
      resetForm();
    } catch (error) {
      console.error('Error saving draft:', error);
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      type: '',
      salaryRange: '',
      department: '',
      status: 'draft',
      description: '',
      requirements: [],
      logo: '',
    });
    setEditorContent('');
    setRequirementsInput('');
    setErrors({});
  };

  const addRequirement = () => {
    if (requirementsInput.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, requirementsInput.trim()],
      });
      setRequirementsInput('');
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
        <header className="bg-white h-16 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center">
            <div className="text-2xl font-semibold">Jobs Management</div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
            >
              <i className="fas fa-plus mr-2"></i>
              Create New Job
            </button>
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <img
                  src={User}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <i className="fas fa-chevron-down text-gray-500"></i>
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  {[
                    { icon: 'user', text: 'Profile', path: '/profile' },
                    { icon: 'cog', text: 'Settings', path: '/settings' },
                    { icon: 'sign-out-alt', text: 'Logout', path: '/logout' },
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={item.path}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center no-underline text-inherit"
                    >
                      <i className={`fas fa-${item.icon} w-5 text-gray-500`}></i>
                      <span className="ml-3">{item.text}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="p-6">
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-6 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border-none"
                  />
                  <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                </div>
              </div>
              <div className="relative min-w-[150px]">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none cursor-pointer"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
              </div>
              <div className="relative min-w-[150px]">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none cursor-pointer"
                >
                  <option value="">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
              </div>
              <div className="relative min-w-[150px]">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
              </div>
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm cursor-pointer whitespace-nowrap"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('');
                  setSelectedLocation('');
                  setSelectedStatus('');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="px-6 py-4 text-gray-500">Title</th>
                  <th className="px-6 py-4 text-gray-500">Company</th>
                  <th className="px-6 py-4 text-gray-500">Location</th>
                  <th className="px-6 py-4 text-gray-500">Type</th>
                  <th className="px-6 py-4 text-gray-500">Salary Range</th>
                  <th className="px-6 py-4 text-gray-500">Department</th>
                  <th className="px-6 py-4 text-gray-500">Status</th>
                  <th className="px-6 py-4 text-gray-500">Description</th>
                  <th className="px-6 py-4 text-gray-500">Requirements</th>
                  <th className="px-6 py-4 text-gray-500">Logo</th>
                  <th className="px-6 py-4 text-gray-500">Created At</th>
                  <th className="px-6 py-4 text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(jobListings) && jobListings.length > 0 ? (
                  jobListings.map(job => (
                    <tr key={job._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{job.title}</td>
                      <td className="px-6 py-4">{job.company}</td>
                      <td className="px-6 py-4">{job.location}</td>
                      <td className="px-6 py-4">{job.type}</td>
                      <td className="px-6 py-4">{job.salaryRange || 'N/A'}</td>
                      <td className="px-6 py-4">{job.department || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          job.status === 'Active' ? 'bg-green-100 text-green-800' :
                          job.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          job.status === 'Draft' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate">{job.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <ul className="list-disc pl-4 max-w-xs truncate">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4">
                        {job.logo ? (
                          <img src={job.logo} alt="Logo" className="w-10 h-10 object-contain" />
                        ) : 'N/A'}
                      </td>
                      <td className="px-6 py-4">{new Date(job.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link to={`/jobs/edit/${job._id}`}>
                            <button className="p-2 hover:bg-gray-100 rounded-full text-blue-600 cursor-pointer">
                              <i className="fas fa-edit"></i>
                            </button>
                          </Link>
                          <button 
                            onClick={() => handleDelete(job._id)}
                            className="p-2 hover:bg-gray-100 rounded-full text-red-600 cursor-pointer"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="px-6 py-4 text-center text-gray-500">
                      No jobs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <div className="text-gray-500 text-sm">
                Showing 1 to {jobListings.length} of {jobListings.length} entries
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap">Previous</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap">Next</button>
              </div>
            </div>
          </div>
        </main>

        {showCreateModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xl font-semibold">Create New Job & View All Jobs</div>
          <button
            onClick={() => setShowCreateModal(false)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Job Creation Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border-none ${errors.title ? 'ring-2 ring-red-500' : ''}`}
              placeholder="e.g. Senior Software Engineer"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border-none ${errors.company ? 'ring-2 ring-red-500' : ''}`}
              placeholder="e.g. Tech Corp"
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none cursor-pointer border-none ${errors.location ? 'ring-2 ring-red-500' : ''}`}
                >
                  <option value="">Select Location</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
              </div>
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none cursor-pointer border-none ${errors.type ? 'ring-2 ring-red-500' : ''}`}
                >
                  <option value="">Select Job Type</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
              </div>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary Range
            </label>
            <input
              type="text"
              value={formData.salaryRange}
              onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border-none"
              placeholder="e.g. $50,000 - $70,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <div className="relative">
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none cursor-pointer border-none"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <i className="fas fa-chevron-down absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description <span className="text-red-500">*</span>
            </label>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-2 border-b">
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-200 rounded cursor-pointer">
                    <i className="fas fa-bold"></i>
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded cursor-pointer">
                    <i className="fas fa-italic"></i>
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded cursor-pointer">
                    <i className="fas fa-list-ul"></i>
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded cursor-pointer">
                    <i className="fas fa-list-ol"></i>
                  </button>
                </div>
              </div>
              <div
                ref={editorRef}
                contentEditable
                className="p-4 min-h-[200px] focus:outline-none"
                onInput={(e) => setEditorContent(e.currentTarget.textContent || '')}
              ></div>
            </div>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={requirementsInput}
                onChange={(e) => setRequirementsInput(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border-none"
                placeholder="e.g. 3+ years of experience"
                onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
              />
              <button
                onClick={addRequirement}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {formData.requirements.map((req, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span>{req}</span>
                  <button
                    onClick={() => setFormData({
                      ...formData,
                      requirements: formData.requirements.filter((_, i) => i !== index),
                    })}
                    className="text-red-600 hover:text-red-800"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Logo URL
            </label>
            <input
              type="text"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border-none"
              placeholder="e.g. https://example.com/logo.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
            <div className="flex space-x-4">
              {['draft', 'pending', 'active'].map((status) => (
                <label key={status} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="hidden"
                  />
                  <div className={`px-4 py-2 rounded-lg ${formData.status === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end space-x-4">
            <button
              onClick={() => setShowPreview(true)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 whitespace-nowrap cursor-pointer"
            >
              Preview
            </button>
            <button
              onClick={handleSaveDraft}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 whitespace-nowrap cursor-pointer"
              disabled={isSaving}
            >
              Save as Draft
            </button>
            <button
              onClick={handlePublish}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
              disabled={isSaving}
            >
              {isSaving ? (
                <i className="fas fa-spinner fa-spin mr-2"></i>
              ) : (
                <i className="fas fa-paper-plane mr-2"></i>
              )}
              Publish Job
            </button>
          </div>
        </div>

        {/* All Jobs Listing */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">All Jobs</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="px-4 py-2 text-gray-500">Title</th>
                  <th className="px-4 py-2 text-gray-500">Company</th>
                  <th className="px-4 py-2 text-gray-500">Location</th>
                  <th className="px-4 py-2 text-gray-500">Type</th>
                  <th className="px-4 py-2 text-gray-500">Salary Range</th>
                  <th className="px-4 py-2 text-gray-500">Department</th>
                  <th className="px-4 py-2 text-gray-500">Status</th>
                  <th className="px-4 py-2 text-gray-500">Description</th>
                  <th className="px-4 py-2 text-gray-500">Requirements</th>
                  <th className="px-4 py-2 text-gray-500">Logo</th>
                  <th className="px-4 py-2 text-gray-500">Created At</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(jobListings) && jobListings.length > 0 ? (
                  jobListings.map(job => (
                    <tr key={job._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{job.title}</td>
                      <td className="px-4 py-2">{job.company}</td>
                      <td className="px-4 py-2">{job.location}</td>
                      <td className="px-4 py-2">{job.type}</td>
                      <td className="px-4 py-2">{job.salaryRange || 'N/A'}</td>
                      <td className="px-4 py-2">{job.department || 'N/A'}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          job.status === 'Active' ? 'bg-green-100 text-green-800' :
                          job.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          job.status === 'Draft' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="max-w-xs truncate">{job.description}</div>
                      </td>
                      <td className="px-4 py-2">
                        <ul className="list-disc pl-4 max-w-xs truncate">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-2">
                        {job.logo ? (
                          <img src={job.logo} alt="Logo" className="w-8 h-8 object-contain" />
                        ) : 'N/A'}
                      </td>
                      <td className="px-4 py-2">{new Date(job.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="px-4 py-2 text-center text-gray-500">
                      No jobs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Job Preview</h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">{formData.title || 'Job Title'}</h1>
                  <div className="flex space-x-4">
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-building mr-2"></i>
                      {formData.company || 'Company'}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      {formData.location || 'Location'}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-briefcase mr-2"></i>
                    {formData.type || 'Job Type'}
                  </div>
                  {formData.salaryRange && (
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-money-bill-wave mr-2"></i>
                      {formData.salaryRange}
                    </div>
                  )}
                  {formData.department && (
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-users mr-2"></i>
                      {formData.department}
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-info-circle mr-2"></i>
                    {formData.status || 'Status'}
                  </div>
                  {formData.logo && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Company Logo</h3>
                      <img src={formData.logo} alt="Company Logo" className="w-20 h-20 object-contain" />
                    </div>
                  )}
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                    <div className="whitespace-pre-wrap">{editorContent || 'No description provided'}</div>
                  </div>
                  {formData.requirements.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                      <ul className="list-disc pl-5">
                        {formData.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Jobs;  