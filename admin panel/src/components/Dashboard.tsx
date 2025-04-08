
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import Sidebar from './Sidebar';
import User from '../assets/image/profile.jpg';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [jobData, setJobData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [applicationData, setApplicationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jobChartRef = useRef(null);
  const appChartRef = useRef(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [jobsRes, postsRes, applicationsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/jobs'),
          axios.get('http://localhost:5000/api/posts'),
          axios.get('http://localhost:5000/api/applications'),
        ]);

        const jobs = jobsRes.data.data || [];
        setJobData(jobs);
        console.log('Jobs Data:', jobs);

        const posts = (postsRes.data.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPostData(posts);
        console.log('Posts Data:', posts);

        const applications = applicationsRes.data.data || [];
        setApplicationData(applications);
        setUnreadNotifications(applications.filter(app => app.status === 'pending').length);
        console.log('Applications Data:', applications);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const initCharts = () => {
    // Job Chart
    const jobChartDom = document.getElementById('jobChart');
    if (jobChartDom && !jobChartRef.current) {
      jobChartRef.current = echarts.init(jobChartDom);
      console.log('Job Chart Initialized');
    }

    if (jobData.length > 0 && jobChartRef.current) {
      const monthlyJobs = jobData.reduce((acc, job) => {
        const month = new Date(job.createdAt).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});
      const jobChartData = Object.entries(monthlyJobs).map(([month, count]) => ({ month, count }));
      console.log('Job Chart Data:', jobChartData);

      const jobOption = {
        title: { text: 'Job Postings by Month', left: 'center', textStyle: { color: isDarkTheme ? '#fff' : '#333' } },
        xAxis: { type: 'category', data: jobChartData.map(d => d.month) },
        yAxis: { type: 'value' },
        series: [{ data: jobChartData.map(d => d.count), type: 'bar', color: '#3B82F6' }],
        tooltip: { trigger: 'axis' },
      };
      jobChartRef.current.setOption(jobOption);
    }

    // Application Chart
    const appChartDom = document.getElementById('applicationChart');
    if (appChartDom && !appChartRef.current) {
      appChartRef.current = echarts.init(appChartDom);
      console.log('Application Chart Initialized');
    }

    if (applicationData.length > 0 && appChartRef.current) {
      const monthlyApplications = applicationData.reduce((acc, app) => {
        const month = new Date(app.appliedAt || app.createdAt).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});
      const appChartData = Object.entries(monthlyApplications).map(([month, count]) => ({ month, count }));
      console.log('Application Chart Data:', appChartData);

      const appOption = {
        title: { text: 'Applications by Month', left: 'center', textStyle: { color: isDarkTheme ? '#fff' : '#333' } },
        xAxis: { type: 'category', data: appChartData.map(d => d.month) },
        yAxis: { type: 'value' },
        series: [{ data: appChartData.map(d => d.count), type: 'bar', color: '#10B981' }],
        tooltip: { trigger: 'axis' },
      };
      appChartRef.current.setOption(appOption);
    }
  };

  useEffect(() => {
    if (!loading && !error) {
      initCharts();
    }
    return () => {
      if (jobChartRef.current) jobChartRef.current.dispose();
      if (appChartRef.current) appChartRef.current.dispose();
      jobChartRef.current = null;
      appChartRef.current = null;
    };
  }, [loading, error, jobData, applicationData, isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };

  const totalJobs = jobData.length;
  const activeJobs = jobData.filter(job => job.status === 'active').length;
  const totalApplications = applicationData.length;
  const pendingApplications = applicationData.filter(app => app.status === 'pending').length;
  const recentPosts = postData.slice(0, 5);

  return (
    <div className={`flex h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        selectedNav={selectedNav}
        setSelectedNav={setSelectedNav}
      />
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 h-16 flex items-center justify-between px-6 shadow-lg">
          <div className="flex items-center flex-1">
            {/* <h3 className="text-white font-bold text-xl">Smart Intern</h3> */}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-6 w-64 px-4 py-2 rounded-full bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="text-white hover:text-blue-200">
                <i className="fas fa-bell text-lg"></i>
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 p-4">
                  <h4 className="text-sm font-semibold text-gray-800">Notifications</h4>
                  <p className="text-sm text-gray-600">You have {unreadNotifications} pending applications.</p>
                  <button onClick={() => setUnreadNotifications(0)} className="text-blue-500 hover:underline mt-2">
                    Mark all as read
                  </button>
                </div>
              )}
            </div>
            {/* <button onClick={toggleTheme} className="text-white hover:text-blue-200">
              <i className={`fas fa-${isDarkTheme ? 'sun' : 'moon'} text-lg`}></i>
            </button> */}
            <div className="relative">
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center space-x-2">
                <img src={User} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white" />
                <i className="fas fa-chevron-down text-white"></i>
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  {['Profile', 'Settings', 'Logout'].map((item, idx) => (
                    <a key={idx} href={`/${item.toLowerCase()}`} className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>
        <main className={`p-6 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-4 rounded-xl shadow-md`}>
                  <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>Total Jobs</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">{totalJobs}</p>
                    <span className="text-blue-500 text-sm">+{activeJobs} active</span>
                  </div>
                </div>
                <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-4 rounded-xl shadow-md`}>
                  <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>Total Applications</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">{totalApplications}</p>
                    <span className="text-blue-500 text-sm">+{pendingApplications} pending</span>
                  </div>
                </div>
                <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-4 rounded-xl shadow-md`}>
                  <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>Total Posts</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">{postData.length}</p>
                    <span className="text-blue-500 text-sm">{recentPosts.length} recent</span>
                  </div>
                </div>
                <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-4 rounded-xl shadow-md`}>
                  <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>Active Jobs</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">{activeJobs}</p>
                    <span className="text-blue-500 text-sm">Currently open</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-6 rounded-xl shadow-md`}>
                  <h2 className="text-lg font-semibold mb-4">Job Postings Overview</h2>
                  <div id="jobChart" style={{ height: '300px', width: '100%' }}>
                    {jobData.length === 0 && <p className="text-center text-gray-500 mt-20">No job data available</p>}
                  </div>
                </div>
                <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-6 rounded-xl shadow-md`}>
                  <h2 className="text-lg font-semibold mb-4">Applications Overview</h2>
                  <div id="applicationChart" style={{ height: '300px', width: '100%' }}>
                    {applicationData.length === 0 && <p className="text-center text-gray-500 mt-20">No application data available</p>}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} p-6 rounded-xl shadow-md`}>
                  <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
                  {recentPosts.length > 0 ? (
                    recentPosts.map((post, idx) => (
                      <div key={idx} className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm font-medium">{post.title}</p>
                          <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{post.companyName}</p>
                        </div>
                        <p className="text-sm text-blue-600">{new Date(post.createdAt).toLocaleDateString()}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No recent posts</p>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;