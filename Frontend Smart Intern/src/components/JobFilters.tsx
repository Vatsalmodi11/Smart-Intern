import React from 'react';
import { Slider } from '@headlessui/react';

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

const JobFilters: React.FC<FilterProps> = ({ onFilterChange }) => {
  const salaryTypes = ['Hourly', 'Monthly', 'Yearly'];
  const experienceLevels = ['Entry Level', '1-3 years', '3-5 years', '5-10 years', '10+ years'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const datePosted = ['Last 24 hours', 'Last 3 days', 'Last 7 days', 'Last 14 days', 'Last 30 days'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Type</h3>
        <div className="space-y-2">
          {salaryTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="salaryType"
                value={type}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                onChange={(e) => onFilterChange({ salaryType: e.target.value })}
              />
              <span className="ml-2 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Date Posted</h3>
        <div className="space-y-2">
          {datePosted.map((date) => (
            <label key={date} className="flex items-center">
              <input
                type="radio"
                name="datePosted"
                value={date}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                onChange={(e) => onFilterChange({ datePosted: e.target.value })}
              />
              <span className="ml-2 text-gray-700">{date}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                value={level}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                onChange={(e) => onFilterChange({ experience: e.target.value })}
              />
              <span className="ml-2 text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Type</h3>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                value={type}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                onChange={(e) => onFilterChange({ jobType: e.target.value })}
              />
              <span className="ml-2 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        onClick={() => onFilterChange({ apply: true })}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default JobFilters;