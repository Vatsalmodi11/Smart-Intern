import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

interface Application {
  _id: string;
  userId: string;
  jobId: { _id: string; title: string };
  userName: string;
  userEmail: string;
  action: string;
  position: string;
  company: string;
  salary: string;
  appliedAt: string;
  status: string;
}

const AcceptApplication: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [selectedNav, setSelectedNav] = useState<string>('applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showAcceptForm, setShowAcceptForm] = useState<boolean>(false);
  const [formEmail, setFormEmail] = useState<string>('');
  const [formSubject, setFormSubject] = useState<string>('');
  const [formMessage, setFormMessage] = useState<string>('');
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/applications');
      setApplications(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error: any) {
      console.error('Error fetching applications:', error.message, error.response?.data);
      setError('Failed to fetch applications. Please try again later.');
      setApplications([]);
    }
  };

  const handleOpenAcceptForm = (application: Application) => {
    setSelectedApplication(application);
    setFormEmail(application.userEmail); // Pre-fill email
    setFormSubject(`Offer Acceptance – ${application.position} at ${application.company}`); // Pre-fill subject
    setFormMessage(
      `Dear ${application.userName},\n\n` +
      `Congratulations!\n\n` +
      `We are pleased to inform you that your application for the ${application.position} position at ${application.company} has been successfully accepted. After a thorough review of your qualifications and performance during the interview process, we believe you will be a valuable addition to our team.\n\n` +
      `Position Details:\n` +
      `- Job Title: ${application.position}\n` +
      `- Location: ${application.company} Headquarters, New York, NY (Hybrid model)\n` +
      `- Start Date: May 20, 2025 (subject to your availability)\n` +
      `- Reporting To: Emily Roberts, Senior Engineering Manager\n\n` +
      `Next Steps:\n` +
      `- You will receive your official offer letter and onboarding documents within the next 48 hours via email.\n` +
      `- Once the documents are received, please review and sign them electronically within 5 business days.\n` +
      `- Our HR team will schedule an orientation session to walk you through company policies, tools, and systems.\n\n` +
      `What to Prepare:\n` +
      `- Valid identification for HR records\n` +
      `- Banking information for direct deposit setup\n` +
      `- Any outstanding certifications or documents required\n\n` +
      `If you have any questions in the meantime, please don’t hesitate to reach out to us at hr@${application.company.toLowerCase().replace(/\s/g, '')}.com.\n\n` +
      `We are excited to have you join ${application.company} and look forward to working together!\n\n` +
      `Best regards,\n` +
      `Smart Intern Team\n` +
      `on behalf of ${application.company}\n` +
      `Email: info@smartintern.com | Phone: (123) 456-7890`
    ); // Default email content
    setShowAcceptForm(true);
  };

  const handleAccept = async (applicationId: string) => {
    try {
      const token = localStorage.getItem('token') || 'mock-token';
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.put(
        `http://localhost:5000/api/applications/${applicationId}/status`,
        { status: 'accepted' },
        config
      );

      console.log('Application accepted:', response.data);
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === applicationId ? { ...app, status: 'accepted' } : app
        )
      );
      return true;
    } catch (error: any) {
      console.error('Error accepting application:', error.message, error.response?.data);
      throw new Error(
        `Failed to accept application: ${error.response?.data?.message || error.message || 'Unknown error'}`
      );
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const formData = new FormData();
    formData.append('access_key', 'f4c11f67-6e55-4bb3-9719-15c2bdff0016');
    formData.append('email', formEmail);
    formData.append('subject', formSubject);
    formData.append('message', formMessage);
    formData.append('from_name', 'Smart Intern');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        // Update application status after successful email
        await handleAccept(selectedApplication!._id);
        alert('Email sent and application accepted successfully!');
        setShowAcceptForm(false);
        setSelectedApplication(null);
        setFormEmail('');
        setFormSubject('');
        setFormMessage('');
      } else {
        // throw new Error(result.message || 'Failed to send email');
      }
    // } catch (error: any) {
      console.error('Error submitting form:', error.message);
      setFormError(`Failed to send email: ${error.message}. Please try again.`);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900 font-sans">
      {/* Sidebar */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        selectedNav={selectedNav}
        setSelectedNav={setSelectedNav}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        } p-8`}
      >
        {/* Header */}
        <header className="bg-white rounded-xl shadow-lg h-16 flex items-center justify-between px-6 mb-10">
          <h3 className="text-2xl font-bold text-blue-600">Smart Intern</h3>
        </header>

        {/* Main Section */}
        <main className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
            Job Applications
          </h2>
          {error && (
            <p className="text-red-500 text-center mb-8 bg-red-100 py-3 rounded-xl shadow-sm">
              {error}
            </p>
          )}

          {/* Applications List */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {applications.length === 0 ? (
              <p className="text-center text-gray-500 text-lg col-span-full">
                No applications found
              </p>
            ) : (
              applications.map((application) => (
                <div
                  key={application._id}
                  className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-300 animate-fade-in"
                  onClick={() => setSelectedApplication(application)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src="https://via.placeholder.com/48"
                      alt={application.userName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {application.userName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {application.position} @{' '}
                        <span className="font-medium text-blue-500">{application.company}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{application.userEmail}</p>
                      <p
                        className={`text-xs mt-1 font-medium ${
                          application.status === 'accepted'
                            ? 'text-green-500'
                            : 'text-purple-500'
                        }`}
                      >
                        {application.status.charAt(0).toUpperCase() +
                          application.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Application Details Modal */}
      {selectedApplication && !showAcceptForm && (
       <div className="fixed inset-0 backdrop-blur-md bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl transform transition-all duration-300 scale-100 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-600">Application Details</h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-blue-600 text-2xl font-bold transition-colors duration-200"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <img
                  src="https://via.placeholder.com/64"
                  alt={selectedApplication.userName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {selectedApplication.userName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Email: {selectedApplication.userEmail}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between py-2">
                  <span className="font-medium text-blue-600">Position</span>
                  <p>{selectedApplication.position}</p>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-blue-600">Company</span>
                  <p>{selectedApplication.company}</p>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-blue-600">Salary</span>
                  <p>{selectedApplication.salary}</p>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-blue-600">Applied On</span>
                  <p>{new Date(selectedApplication.appliedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-blue-600">Status</span>
                  <p
                    className={`font-medium ${
                      selectedApplication.status === 'accepted'
                        ? 'text-green-500'
                        : 'text-purple-500'
                    }`}
                  >
                    {selectedApplication.status.charAt(0).toUpperCase() +
                      selectedApplication.status.slice(1)}
                  </p>
                </div>
              </div>

              {selectedApplication.status !== 'accepted' && (
                <button
                  onClick={() => handleOpenAcceptForm(selectedApplication)}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  Accept Application
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Web3Forms Modal */}
      {showAcceptForm && selectedApplication && (
        <div className="fixed inset-0 backdrop-blur-md  bg-opacity-30 flex items-center justify-center z-60">
          <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl transform transition-all duration-300 scale-100 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-600">Send Acceptance Email</h3>
              <button
                onClick={() => setShowAcceptForm(false)}
                className="text-gray-400 hover:text-blue-600 text-2xl font-bold transition-colors duration-200"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {formError && (
                <p className="text-red-500 text-center bg-red-100 py-2 rounded-lg">{formError}</p>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Recipient Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 h-64 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={formLoading}
                className={`w-full py-3 rounded-lg text-white transition-colors duration-200 shadow-md ${
                  formLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {formLoading ? 'Sending...' : 'Send Email & Accept'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CSS for Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .font-sans {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default AcceptApplication;