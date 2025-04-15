import React, { useState, useEffect } from 'react';
import { Search, MapPin, TrendingUp, Users, Globe } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Post {
  _id: string;
  companyName: string;
  companyProfile: string | null;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
}

const companies = [
  { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Facebook_New_Logo_%282015%29.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [recruiterPosts, setRecruiterPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const API_BASE_URL = 'http://localhost:5000';

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`Failed to fetch posts: ${response.statusText}`);
      const data = await response.json();
      setRecruiterPosts(data.data || []);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    setIsVisible(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimestamp = (createdAt: string) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffMs = now.getTime() - postDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const topTechnologies = ['React', 'Python', 'JavaScript', 'Node.js', 'AWS'];
  const topJobs = ['Frontend Developer', 'Backend Engineer', 'Data Scientist', 'DevOps Engineer', 'UI/UX Designer'];
  const profileData = {
    name: 'John Doe',
    title: 'Software Engineer',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop',
  };

  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      {/* Hero Section */}  
      <div className="relative w-full bg-white pt-10">
  <div className="relative h-screen flex items-center justify-between px-10 overflow-hidden">
    {/* Left Content */}
    <div className="w-1/2 z-10">
      <div
        className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          #1 Internship Platform in 2025
        </div>
        <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-6">
          Launch Your Career with Smart Internships
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Connect with Fortune 500 companies, gain real-world experience, and build your professional network.
        </p>
        <div className="flex gap-4 mb-12">
          <button className="bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
    {/* Right Image with Gradient Overlay */}
    <div className="w-1/2 h-full relative">
      <img
        src="https://public.readdy.ai/ai/img_res/8f7c611962618c4cb6094d0763c4fd0f.jpg"
        alt="Smart Internship Platform"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent pointer-events-none" />
    </div>
    {/* Stats */}
    <div className="absolute bottom-10 left-10 flex gap-6 z-10">
      <div className="bg-white rounded-xl shadow-lg p-6 w-48">
        <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
        <div className="text-gray-600">Active Interns</div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 w-48">
        <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
        <div className="text-gray-600">Partner Companies</div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 w-48">
        <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
        <div className="text-gray-600">Success Rate</div>
      </div>
    </div>
    {/* Clock */}
    <div className="fixed top-32 right-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full px-6 py-3 z-20 text-sm tracking-wider shadow-lg backdrop-blur-sm">
      <i className="far fa-clock mr-2"></i>
      {currentTime.toLocaleTimeString()}
    </div>
  </div>
  {/* Ensure the next section starts below the hero */}
  <div className="h-10"></div> {/* Spacer to prevent immediate overlap */}
</div>

      {/* Trusted Companies Section with Auto-Scrolling Swiper */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted By Leading Companies
          </h2>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={5}
            loop={true}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 5 }, // Ensure 5 columns on larger screens
            }}
            className="flex items-center"
          >
            {companies.map((company, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center h-36">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-20 w-32 object-contain"
                  />
                  <p className="mt-4 text-lg text-gray-700 font-medium text-center">
                    {company.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Left - Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-36 h-36 rounded-full mx-auto mb-6 border-4 border-blue-100 shadow-md"
              />
              <h3 className="text-2xl font-bold text-center text-gray-900 mt-4">{profileData.name}</h3>
              <p className="text-gray-600 text-center mt-2 font-medium">{profileData.title}</p>
              <div className="flex items-center justify-center mt-4 text-gray-500">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-sm">{profileData.location}</span>
              </div>
            </div>
          </div>

          {/* Center - Recruiter Posts */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Recruiter Posts</h2>
              <button
                onClick={fetchPosts}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Refresh
              </button>
            </div>
            {loading ? (
              <p className="text-center text-gray-600">Loading posts...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : recruiterPosts.length === 0 ? (
              <p className="text-center text-gray-600">No posts available</p>
            ) : (
              <div className="space-y-10">
                {recruiterPosts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center mb-6">
                      <img
                        src={post.companyProfile ? `${API_BASE_URL}${post.companyProfile}` : 'https://via.placeholder.com/100'}
                        alt={`${post.companyName} logo`}
                        className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-gray-200 shadow-sm"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{post.companyName}</h3>
                        <span className="text-sm text-gray-500">{formatTimestamp(post.createdAt)}</span>
                      </div>
                    </div>
                    <img
                      src={post.image ? `${API_BASE_URL}${post.image}` : 'https://via.placeholder.com/300x200'}
                      alt={`${post.companyName} post`}
                      className="w-full h-[550px] object-cover rounded-xl mb-6"
                    />
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">{post.title}</h4>
                    <p className="text-gray-600 text-sm mt-4 leading-relaxed">{post.description}</p>
                    <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-md">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right - Top Technologies & Jobs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 sticky top-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Top Technologies</h3>
              <ul className="space-y-4">
                {topTechnologies.map((tech, index) => (
                  <li key={index} className="text-gray-700 flex items-center text-lg">
                    <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-[calc(8rem+20rem)]">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Top Jobs</h3>
              <ul className="space-y-4">
                {topJobs.map((job, index) => (
                  <li key={index} className="text-gray-700 flex items-center text-lg">
                    <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></span>
                    {job}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-t from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 tracking-tight">
            Why Smart Intern Stands Out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-center mb-6">
                <TrendingUp className="h-16 w-16 text-blue-600 p-3 bg-blue-100 rounded-full" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Career Growth</h3>
              <p className="text-gray-600 leading-relaxed">Unlock opportunities that align with your career aspirations</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-center mb-6">
                <Users className="h-16 w-16 text-blue-600 p-3 bg-blue-100 rounded-full" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Network</h3>
              <p className="text-gray-600 leading-relaxed">Connect with industry leaders and expand your professional circle</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-center mb-6">
                <Globe className="h-16 w-16 text-blue-600 p-3 bg-blue-100 rounded-full" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Global Reach</h3>
              <p className="text-gray-600 leading-relaxed">Access a world of opportunities from top companies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;





{/* <div className="lg:col-span-1">
<div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
  {profile ? (
    <>
      <img
        src={profile.companyImage ? `${API_BASE_URL}${profile.companyImage}` : 'https://via.placeholder.com/128'}
        alt="Profile"
        className="w-36 h-36 rounded-full mx-auto mb-6 border-4 border-blue-100 shadow-md"
      />
      <h3 className="text-2xl font-bold text-center text-gray-900 mt-4">{`${profile.firstName} ${profile.lastName}`}</h3>
      <p className="text-gray-600 text-center mt-2 font-medium">Software Engineer</p>
      <div className="flex items-center justify-center mt-4 text-gray-500">
        <MapPin className="h-5 w-5 mr-2" />
        <span className="text-sm">{profile.location || 'Not specified'}</span>
      </div>
    </>
  ) : (
    <p className="text-center text-gray-600">Loading profile...</p>
  )}
</div>
</div>




const fetchUserProfile = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    const data = await response.json();
    setProfile(data.data || null);
  } catch (err) {
    setError((err as Error).message);
  }
}; */}