import React from 'react';
import { Users, Briefcase, BarChart, MessageSquare } from 'lucide-react';

const EmployerDashboard = () => {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Profile */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-6">
            <img
              src="https://images.unsplash.com/photo-1549924231-f129b911e442?w=128&h=128&fit=crop"
              alt="Company logo"
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TechCorp Inc.</h1>
              <p className="text-gray-600">Technology & Software</p>
              <p className="text-gray-500 mt-1">San Francisco, CA</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-gray-600">Total Applicants</p>
                <p className="text-2xl font-bold text-gray-900">148</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4">
              <BarChart className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">18.9%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Applications</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((application) => (
              <div key={application} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <img
                  src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&q=${application}`}
                  alt="Applicant"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">John Doe</h3>
                  <p className="text-gray-600">Senior Software Engineer Position</p>
                </div>
                <div className="text-right">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Review
                  </button>
                  <p className="text-sm text-gray-500 mt-1">Applied 2 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;