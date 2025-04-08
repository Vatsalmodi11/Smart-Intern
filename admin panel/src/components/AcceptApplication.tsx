// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from './Sidebar';

// interface Application {
//   _id: string;
//   userId: string;
//   jobId: { _id: string; title: string };
//   userName: string;
//   action: string;
//   position: string;
//   company: string;
//   salary: string;
//   appliedAt: string;
//   status: string;
// }

// const AcceptApplication: React.FC = () => {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
//   const [selectedNav, setSelectedNav] = useState<string>('applications');
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const fetchApplications = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/applications');
//       setApplications(Array.isArray(response.data.data) ? response.data.data : []);
//     } catch (error: any) {
//       console.error('Error fetching applications:', error.message, error.response?.data);
//       setError('Failed to fetch applications. Please try again later.');
//       setApplications([]);
//     }
//   };

//   const handleAccept = async (applicationId: string) => {
//     try {
//       const token = localStorage.getItem('token') || 'mock-token';
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.put(
//         `http://localhost:5000/api/applications/${applicationId}/status`,
//         { status: 'accepted' },
//         config
//       );

//       console.log('Application accepted:', response.data);
//       alert('Application accepted successfully!');
//       setApplications((prevApplications) =>
//         prevApplications.map((app) =>
//           app._id === applicationId ? { ...app, status: 'accepted' } : app
//         )
//       );
//       setSelectedApplication(null); // Close popup after acceptance
//     } catch (error: any) {
//       console.error('Error accepting application:', error.message, error.response?.data);
//       alert(
//         `Failed to accept application: ${error.response?.data?.message || error.message || 'Unknown error'}. Please try again.`
//       );
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white">
//       {/* Sidebar */}
//       <Sidebar
//         sidebarCollapsed={sidebarCollapsed}
//         setSidebarCollapsed={setSidebarCollapsed}
//         selectedNav={selectedNav}
//         setSelectedNav={setSelectedNav}
//       />

//       {/* Main Content */}
//       <div
//         className={`flex-1 transition-all duration-300 ${
//           sidebarCollapsed ? 'ml-20' : 'ml-64'
//         } p-6`}
//       >
//         {/* Header */}
//         <header className="bg-gray-800 rounded-lg shadow-md h-16 flex items-center justify-between px-6 mb-8">
//           <h3 className="text-2xl font-bold tracking-wide text-white">Smart Intern</h3>
//         </header>

//         {/* Main Section */}
//         <main className="max-w-6xl mx-auto">
//           <h2 className="text-4xl font-extrabold text-center mb-10 tracking-tight">
//             Job Applications
//           </h2>
//           {error && (
//             <p className="text-red-400 text-center mb-6 bg-red-900/20 py-3 rounded-lg">
//               {error}
//             </p>
//           )}

//           {/* Applications List */}
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {applications.length === 0 ? (
//               <p className="text-center text-gray-400 text-lg col-span-full">
//                 No applications found
//               </p>
//             ) : (
//               applications.map((application) => (
//                 <div
//                   key={application._id}
//                   className="bg-gray-800 rounded-lg shadow-md p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer relative overflow-hidden group"
//                   onClick={() => setSelectedApplication(application)}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <div className="relative z-10 flex items-center gap-4">
//                     <img
//                       src="https://via.placeholder.com/48" // Replace with dynamic avatar if available
//                       alt={application.userName}
//                       className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
//                     />
//                     <div>
//                       <h3 className="text-lg font-bold text-white">
//                         {application.userName}
//                       </h3>
//                       <p className="text-sm text-gray-300">
//                         {application.position} @{' '}
//                         <span className="font-medium">{application.company}</span>
//                       </p>
//                       <p
//                         className={`text-xs mt-2 font-semibold ${
//                           application.status === 'accepted'
//                             ? 'text-green-400'
//                             : 'text-blue-400'
//                         }`}
//                       >
//                         {application.status.charAt(0).toUpperCase() +
//                           application.status.slice(1)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </main>
//       </div>

//       {/* Modal */}
//       {selectedApplication && (
//         <div className="fixed inset-0 bg-opacity-90 flex items-center justify-end z-50">
//           <div
//             className="bg-gray-800 w-full max-w-md h-full p-8 shadow-2xl transform transition-transform duration-500 translate-x-0 slide-in-right"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-white tracking-wide">
//                 Application Details
//               </h3>
//               <button
//                 onClick={() => setSelectedApplication(null)}
//                 className="text-gray-400 hover:text-white text-3xl font-bold transition-colors duration-200"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="space-y-6">
//               <div className="flex items-center gap-5">
//                 <img
//                   src="https://via.placeholder.com/64" // Replace with dynamic avatar if available
//                   alt={selectedApplication.userName}
//                   className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
//                 />
//                 <div>
//                   <h4 className="text-xl font-semibold text-white">
//                     {selectedApplication.userName}
//                   </h4>
//                   <p className="text-sm text-gray-400">
//                     ID: {selectedApplication.userId}
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-4 text-gray-300">
//                 <div className="flex justify-between py-2 border-b border-gray-700">
//                   <span className="font-medium">Position</span>
//                   <p>{selectedApplication.position}</p>
//                 </div>
//                 <div className="flex justify-between py-2 border-b border-gray-700">
//                   <span className="font-medium">Company</span>
//                   <p>{selectedApplication.company}</p>
//                 </div>
//                 <div className="flex justify-between py-2 border-b border-gray-700">
//                   <span className="font-medium">Salary</span>
//                   <p>{selectedApplication.salary}</p>
//                 </div>
//                 <div className="flex justify-between py-2 border-b border-gray-700">
//                   <span className="font-medium">Applied On</span>
//                   <p>
//                     {new Date(selectedApplication.appliedAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="flex justify-between py-2 border-b border-gray-700">
//                   <span className="font-medium">Status</span>
//                   <p
//                     className={`font-semibold ${
//                       selectedApplication.status === 'accepted'
//                         ? 'text-green-400'
//                         : 'text-blue-400'
//                     }`}
//                   >
//                     {selectedApplication.status.charAt(0).toUpperCase() +
//                       selectedApplication.status.slice(1)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CSS for Slide-in Animation */}
//       <style jsx>{`
//         .slide-in-right {
//           animation: slideInRight 0.5s ease-out forwards;
//         }
//         @keyframes slideInRight {
//           from {
//             transform: translateX(100%);
//           }
//           to {
//             transform: translateX(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AcceptApplication;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

interface Application {
  _id: string;
  userId: string;
  jobId: { _id: string; title: string };
  userName: string;
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
      alert('Application accepted successfully!');
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === applicationId ? { ...app, status: 'accepted' } : app
        )
      );
      setSelectedApplication(null);
    } catch (error: any) {
      console.error('Error accepting application:', error.message, error.response?.data);
      alert(
        `Failed to accept application: ${error.response?.data?.message || error.message || 'Unknown error'}. Please try again.`
      );
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

      {/* Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
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
                    ID: {selectedApplication.userId}
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
                  onClick={() => handleAccept(selectedApplication._id)}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  Accept Application
                </button>
              )}
            </div>
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