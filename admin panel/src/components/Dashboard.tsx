// import React, { useState, useEffect } from 'react';
// import * as echarts from 'echarts';
// import Sidebar from './Sidebar';
// import axios from 'axios';
// import User from "../assets/image/profile.jpg";

// const Dashboard = () => {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [selectedNav, setSelectedNav] = useState('dashboard');
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [jobListings, setJobListings] = useState([]);
//   const [recentActivities, setRecentActivities] = useState([]);
//   const [stats, setStats] = useState({
//     totalJobs: 0,
//     activeApplications: 0,
//     interviewsScheduled: 0,
//     hiredThisMonth: 0,
//   });
//   const [statusDistribution, setStatusDistribution] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const initializeCharts = (jobsData) => {
//     const applicationChart = echarts.init(document.getElementById('applicationChart'));
//     const jobStatusChart = echarts.init(document.getElementById('jobStatusChart'));

//     const applicationTrends = Array(7).fill(0);
//     jobsData.forEach((job) => {
//       const postedDay = new Date(job.postedDate).getDay();
//       applicationTrends[postedDay] += job.applications || 0;
//     });

//     const applicationOption = {
//       animation: false,
//       title: { text: 'Application Trends', left: 'center', top: 10 },
//       tooltip: { trigger: 'axis' },
//       xAxis: { type: 'category', data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
//       yAxis: { type: 'value' },
//       series: [{ data: applicationTrends, type: 'line', smooth: true, color: '#3B82F6' }],
//     };

//     const jobStatusOption = {
//       animation: false,
//       title: { text: 'Job Status Distribution', left: 'center', top: 10 },
//       tooltip: { trigger: 'item' },
//       series: [
//         {
//           type: 'pie',
//           radius: '70%',
//           data: statusDistribution,
//           emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } },
//         },
//       ],
//     };

//     applicationChart.setOption(applicationOption);
//     jobStatusChart.setOption(jobStatusOption);
//   };

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);

//         // Fetch jobs
//         const jobsResponse = await axios.get('http://localhost:5000/api/jobs');
//         const jobs = jobsResponse.data;

//         // Process job data
//         setJobListings(jobs.slice(0, 4)); // Recent 4 jobs

//         // Calculate stats
//         const totalJobs = jobs.length;
//         const activeApplications = jobs.reduce((sum, job) => sum + (job.applications || 0), 0);
//         const interviewsScheduled = jobs.filter((job) => job.status === 'pending').length;
//         const currentMonth = new Date().getMonth();
//         const currentYear = new Date().getFullYear();
//         const hiredThisMonth = jobs.filter(
//           (job) =>
//             job.status === 'closed' &&
//             new Date(job.updatedAt).getMonth() === currentMonth &&
//             new Date(job.updatedAt).getFullYear() === currentYear
//         ).length;

//         setStats({
//           totalJobs,
//           activeApplications,
//           interviewsScheduled,
//           hiredThisMonth,
//         });

//         // Calculate job status distribution
//         const statusCounts = jobs.reduce((acc, job) => {
//           acc[job.status] = (acc[job.status] || 0) + 1;
//           return acc;
//         }, {});
//         const statusData = [
//           { value: statusCounts['active'] || 0, name: 'Active' },
//           { value: statusCounts['pending'] || 0, name: 'Pending' },
//           { value: statusCounts['closed'] || 0, name: 'Closed' },
//           { value: statusCounts['draft'] || 0, name: 'Draft' },
//         ].filter((item) => item.value > 0);
//         setStatusDistribution(statusData);

//         // Fetch recent activities
//         const activitiesResponse = await axios.get('http://localhost:5000/api/applications', {
//           params: { limit: 5 },
//         });
//         const mappedActivities = activitiesResponse.data.map((activity) => ({
//           id: activity._id,
//           user: activity.userName,
//           avatar: activity.avatar,
//           action: activity.action,
//           position: activity.position,
//           company: activity.company,
//           salary: activity.salary,
//           startDate: new Date(activity.appliedAt).toLocaleDateString(),
//           time: new Date(activity.appliedAt).toLocaleTimeString(),
//         }));
//         setRecentActivities(mappedActivities);

//         // Initialize charts with fetched data
//         initializeCharts(jobs);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error.message, error.response?.data);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         sidebarCollapsed={sidebarCollapsed}
//         setSidebarCollapsed={setSidebarCollapsed}
//         selectedNav={selectedNav}
//         setSelectedNav={setSelectedNav}
//       />

//       <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
//         <header className="bg-white h-16 flex items-center justify-between px-6 shadow-sm">
//           <div className="flex items-center flex-1">
//             <h3 className="py-10 text-blue-500 font-bold gap-10">Smart Intern</h3>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-64 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//               />
//               <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <button
//                 onClick={() => setShowProfileMenu(!showProfileMenu)}
//                 className="flex items-center space-x-3 cursor-pointer"
//               >
//                 <img
//                   src={User}
//                   alt="Profile"
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <i className="fas fa-chevron-down text-gray-500"></i>
//               </button>
//               {showProfileMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
//                   {[
//                     { icon: 'user', text: 'Profile', path: '/profile' },
//                     { icon: 'cog', text: 'Settings', path: '/settings' },
//                     { icon: 'sign-out-alt', text: 'Logout', path: '/logout' },
//                   ].map((item, index) => (
//                     <a
//                       key={index}
//                       href={item.path}
//                       className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center no-underline text-inherit"
//                     >
//                       <i className={`fas fa-${item.icon} w-5 text-gray-500`}></i>
//                       <span className="ml-3">{item.text}</span>
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <main className="p-6">
//           {loading ? (
//             <div className="text-center">Loading...</div>
//           ) : (
//             <div className="grid grid-cols-3 gap-6">
//               <div className="col-span-2 bg-white rounded-lg shadow-sm">
//                 <div className="p-6 border-b">
//                   <h2 className="text-xl font-semibold">Recent Job Listings</h2>
//                 </div>
//                 <div className="p-6">
//                   <div className="grid grid-cols-1 gap-4">
//                     {jobListings.map((job) => (
//                       <div key={job._id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h3 className="text-xl font-semibold">{job.title}</h3>
//                             <p className="text-gray-600">{job.department}</p>
//                           </div>
//                           <span
//                             className={`px-3 py-1 rounded-full text-sm ${
//                               job.status === 'active' ? 'bg-green-100 text-green-800' :
//                               job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                               'bg-gray-100 text-gray-800'
//                             }`}
//                           >
//                             {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
//                           </span>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4 mt-4">
//                           <div>
//                             <p className="text-gray-600"><i className="fas fa-building mr-2"></i>{job.department}</p>
//                             <p className="text-gray-600"><i className="fas fa-map-marker-alt mr-2"></i>{job.location}</p>
//                             <p className="text-gray-600"><i className="fas fa-money-bill-wave mr-2"></i>${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}</p>
//                           </div>
//                           <div>
//                             <p className="text-gray-600"><i className="fas fa-users mr-2"></i>{job.applications} Applications</p>
//                             <p className="text-gray-600"><i className="fas fa-calendar-alt mr-2"></i>Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
//                           </div>
//                         </div>
//                         <div className="mt-4 pt-4 border-t">
//                           <p className="text-gray-700"><span className="font-medium">Description:</span> {job.description}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white rounded-lg shadow-sm">
//                 <div className="p-6 border-b">
//                   <h2 className="text-xl font-semibold">Recent Activities</h2>
//                 </div>
//                 <div className="p-6">
//                   {recentActivities.length > 0 ? (
//                     recentActivities.map((activity) => (
//                       <div key={activity.id} className="flex items-start mb-6 last:mb-0 bg-gray-50 p-4 rounded-lg">
//                         <img
//                           src={activity.avatar}
//                           alt={activity.user}
//                           className="w-12 h-12 rounded-full mr-4"
//                         />
//                         <div className="flex-1">
//                           <div className="flex items-center justify-between">
//                             <p className="font-medium text-lg">{activity.user}</p>
//                             <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{activity.action}</span>
//                           </div>
//                           <div className="mt-2 grid grid-cols-2 gap-4">
//                             <div>
//                               <p className="text-gray-600"><i className="fas fa-briefcase mr-2"></i>{activity.position}</p>
//                               <p className="text-gray-600"><i className="fas fa-building mr-2"></i>{activity.company}</p>
//                             </div>
//                             <div>
//                               <p className="text-gray-600"><i className="fas fa-money-bill-wave mr-2"></i>{activity.salary}</p>
//                               <p className="text-gray-600"><i className="fas fa-calendar-alt mr-2"></i>Applied: {activity.startDate}</p>
//                             </div>
//                           </div>
//                           <p className="text-sm text-gray-500 mt-2">{activity.time}</p>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center text-gray-500">
//                       <p>No recent activities found.</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import Sidebar from './Sidebar'; // Importing your Sidebar component
import User from "../assets/image/profile.jpg"; // Importing the profile image

const Dashboard = () => {
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState('dashboard');

  // Profile navbar states
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Example: 3 unread notifications

  // Placeholder data for the bar chart (monthly revenue)
  const monthlyRevenue = [
    4000, 6000, 2000, 5000, 3000, 4000, 3500, 2500, 1500, 1000, 500, 0
  ];

  // Initialize the bar chart using ECharts
  useEffect(() => {
    const chartDom = document.getElementById('revenueChart');
    const myChart = echarts.init(chartDom);

    const option = {
      animation: false,
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        type: 'value',
        max: 6000,
        interval: 1500,
        axisLabel: {
          formatter: '${value}',
        },
      },
      series: [
        {
          data: monthlyRevenue,
          type: 'bar',
          color: '#3B82F6', // Blue color for the bars
        },
      ],
    };

    myChart.setOption(option);

    // Cleanup on unmount
    return () => {
      myChart.dispose();
    };
  }, []);

  // Placeholder data for recent sales
  const recentSales = [
    { initials: 'OM', name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: 1999.00 },
    { initials: 'JL', name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: 39.00 },
    { initials: 'IN', name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: 299.00 },
    { initials: 'WK', name: 'William Kim', email: 'will@email.com', amount: 99.00 },
    { initials: 'SD', name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: 39.00 },
  ];

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`flex h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Sidebar Integration */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        selectedNav={selectedNav}
        setSelectedNav={setSelectedNav}
      />

      {/* Main Content */}
      <div
        className={`flex-1 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        } transition-all duration-300`}
      >
        {/* Enhanced Profile Navbar */}
        <header className="bg-gradient-to-r from-blue-500 to-blue-600 h-16 flex items-center justify-between px-6 shadow-lg">
          <div className="flex items-center flex-1">
            <h3 className="py-10 text-white font-bold text-xl tracking-wide">Smart Intern</h3>
            <div className="relative ml-6">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 rounded-full bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm transition-all duration-300"
              />
              <i className="fas fa-search absolute right-3 top-3 text-gray-500"></i>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-white hover:text-blue-200 transition-colors duration-200"
              >
                <i className="fas fa-bell text-lg"></i>
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b">
                    <h4 className="text-sm font-semibold">Notifications</h4>
                  </div>
                  <div className="px-4 py-3 text-sm text-gray-600">
                    <p>You have {unreadNotifications} unread notifications.</p>
                    <button
                      onClick={() => setUnreadNotifications(0)}
                      className="text-blue-500 hover:underline mt-2"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              <i className={`fas fa-${isDarkTheme ? 'sun' : 'moon'} text-lg`}></i>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <img
                  src={User}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                <i className="fas fa-chevron-down text-white"></i>
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

        {/* Dashboard Content */}
        <main className={`p-6 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
          {/* Header Metrics */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>Total Revenue</h3>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">$45,231.89</p>
                <span className="text-blue-500 text-sm">+20.1% from last month</span>
              </div>
            </div>
            <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>Subscriptions</h3>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">+2350</p>
                <span className="text-blue-500 text-sm">+180.1% from last month</span>
              </div>
            </div>
            <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>Sales</h3>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">+12,234</p>
                <span className="text-blue-500 text-sm">+19% from last month</span>
              </div>
            </div>
            <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>Active Now</h3>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">+573</p>
                <span className="text-blue-500 text-sm">+201 since last hour</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-6">
            {/* Bar Chart Section */}
            <div className={`col-span-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
              <h2 className="text-lg font-semibold mb-4">Overview</h2>
              <div id="revenueChart" style={{ height: '300px', width: '100%' }}></div>
            </div>

            {/* Recent Sales Section */}
            <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
              <h2 className="text-lg font-semibold mb-4">Recent Sales</h2>
              <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} mb-4`}>You made 265 sales this month.</p>
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center justify-between mb-4 last:mb-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                      {sale.initials}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{sale.name}</p>
                      <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{sale.email}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-blue-600">+${sale.amount.toFixed(2)}</p>
                </div>
              ))}
              <button className="text-blue-500 text-sm mt-4">Active Window</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;