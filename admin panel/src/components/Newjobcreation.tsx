import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

const Newjobcreation = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState('jobs');

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    minSalary: '',
    maxSalary: '',
    description: '',
    status: 'draft',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  const departments = ['Engineering', 'Marketing', 'Analytics', 'Design', 'Sales', 'HR'];
  const locations = ['San Francisco, CA', 'New York, NY', 'Boston, MA', 'Seattle, WA', 'Austin, TX'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.minSalary) newErrors.minSalary = 'Minimum salary is required';
    if (!formData.maxSalary) newErrors.maxSalary = 'Maximum salary is required';
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
          minSalary: Number(formData.minSalary),
          maxSalary: Number(formData.maxSalary),
          description: editorContent,
        };
        await axios.post('http://localhost:5000/api/jobs', jobData);
        setIsSaving(false);
        navigate('/jobs');
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
        minSalary: Number(formData.minSalary),
        maxSalary: Number(formData.maxSalary),
        description: editorContent,
        status: 'draft',
      };
      await axios.post('http://localhost:5000/api/jobs', jobData);
      setIsSaving(false);
      navigate('/jobs');
    } catch (error) {
      console.error('Error saving draft:', error);
      setIsSaving(false);
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
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300 pt-16`}>
        <main className="p-6 max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/jobs" className="text-blue-600 hover:text-blue-700 flex items-center cursor-pointer">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Jobs
            </Link>
            <div className="mx-4 text-gray-300">|</div>
            <div className="text-xl font-semibold">Create New Job</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
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

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none cursor-pointer border-none ${errors.department ? 'ring-2 ring-red-500' : ''}`}
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    <i className="fas fa-chevron-down absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
                  </div>
                  {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                </div>

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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <span className="absolute left-4 top-2 text-gray-500">$</span>
                      <input
                        type="text"
                        value={formData.minSalary}
                        onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                        className={`w-full pl-8 pr-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border-none ${errors.minSalary ? 'ring-2 ring-red-500' : ''}`}
                        placeholder="Minimum"
                      />
                    </div>
                    {errors.minSalary && <p className="text-red-500 text-sm mt-1">{errors.minSalary}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <span className="absolute left-4 top-2 text-gray-500">$</span>
                      <input
                        type="text"
                        value={formData.maxSalary}
                        onChange={(e) => setFormData({ ...formData, maxSalary: e.target.value })}
                        className={`w-full pl-8 pr-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border-none ${errors.maxSalary ? 'ring-2 ring-red-500' : ''}`}
                        placeholder="Maximum"
                      />
                    </div>
                    {errors.maxSalary && <p className="text-red-500 text-sm mt-1">{errors.maxSalary}</p>}
                  </div>
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
                      <button className="p-2 hover:bg-gray-200 rounded cursor-pointer">
                        <i className="fas fa-link"></i>
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded cursor-pointer">
                        <i className="fas fa-image"></i>
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
            </div>

            <div className="mt-8 flex items-center justify-end space-x-4">
              <button
                onClick={() => setShowPreview(true)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Preview
              </button>
              <button
                onClick={handleSaveDraft}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 !rounded-button whitespace-nowrap cursor-pointer"
                disabled={isSaving}
              >
                Save as Draft
              </button>
              <button
                onClick={handlePublish}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer"
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
        </main>

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
                      {formData.department || 'Department'}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      {formData.location || 'Location'}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-money-bill-wave mr-2"></i>
                    {formData.minSalary && formData.maxSalary
                      ? `$${formData.minSalary} - $${formData.maxSalary}`
                      : 'Salary Range'}
                  </div>
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                    <div className="whitespace-pre-wrap">{editorContent || 'No description provided'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Newjobcreation;