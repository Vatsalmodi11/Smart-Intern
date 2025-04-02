// import React, { useState, useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay, Navigation } from "swiper/modules";
// import * as echarts from "echarts";

// interface JobCard {
//   id: number;
//   title: string;
//   company: string;
//   location: string;
//   type: string;
//   logo: string;
// }
// interface Company {
//   id: number;
//   name: string;
//   description: string;
//   industry: string;
//   openings: number;
//   logo: string;
// }
// interface Testimonial {
//   id: number;
//   name: string;
//   role: string;
//   company: string;
//   text: string;
//   image: string;
//   rating: number;
// }

// const Mainpage: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [location, setLocation] = useState("");
//   const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
//   const chartRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const elements = document.querySelectorAll('[data-aos="fade-up"]');
//       elements.forEach((element) => {
//         const rect = element.getBoundingClientRect();
//         const isVisible = rect.top <= window.innerHeight * 0.75;
//         if (isVisible) {
//           element.classList.remove("opacity-0");
//           element.classList.remove("translate-x-[-100px]");
//           element.classList.remove("translate-x-[100px]");
//         }
//       });
//     };
//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (chartRef.current) {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         animation: false,
//         title: { text: "Job Market Trends", left: "center" },
//         tooltip: { trigger: "axis" },
//         xAxis: { type: "category", data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
//         yAxis: { type: "value" },
//         series: [
//           {
//             name: "Job Postings",
//             type: "line",
//             data: [150, 230, 224, 218, 135, 147],
//             smooth: true,
//             lineStyle: { color: "#2D5BFF" },
//           },
//         ],
//       };
//       chart.setOption(option);
//     }
//   }, []);

//   const jobs: JobCard[] = [
//     { id: 1, title: "Senior Software Engineer", company: "TechVision Global", location: "San Francisco, CA", type: "Full-time", logo: "https://public.readdy.ai/ai/img_res/fdf8c085c4cf560e4ea7156f1f6db564.jpg" },
//     { id: 2, title: "Product Marketing Manager", company: "InnovateLabs", location: "New York, NY", type: "Remote", logo: "https://public.readdy.ai/ai/img_res/3043861f662c9f588473f7fd6c30894a.jpg" },
//     { id: 3, title: "UX/UI Designer", company: "DesignCraft", location: "Austin, TX", type: "Hybrid", logo: "https://public.readdy.ai/ai/img_res/de1d02d6b4fce0217a955a931231fe52.jpg" },
//     { id: 4, title: "Data Scientist", company: "DataFlow Analytics", location: "Boston, MA", type: "Full-time", logo: "https://public.readdy.ai/ai/img_res/db891b67316617d868bb438b834d3620.jpg" },
//     { id: 5, title: "Business Development Manager", company: "GrowthForce", location: "Chicago, IL", type: "Full-time", logo: "https://public.readdy.ai/ai/img_res/0edb6b495fb43de4132d8d314071752c.jpg" },
//     { id: 6, title: "Frontend Developer Intern", company: "WebCraft Solutions", location: "Remote", type: "Internship", logo: "https://public.readdy.ai/ai/img_res/c8555735347ab870e84e4c5b57e00a3f.jpg" },
//   ];

//   const testimonials: Testimonial[] = [
//     { id: 1, name: "Emily Richardson", role: "Software Engineer", company: "TechVision Global", text: "Found my dream job through this platform. The process was seamless and the company culture is exactly what I was looking for.", image: "https://public.readdy.ai/ai/img_res/d0dcb75c787f6e5535c40a698aceb95b.jpg", rating: 5 },
//     { id: 2, name: "Michael Chen", role: "Product Manager", company: "InnovateLabs", text: "The platform made it easy to connect with top companies. I appreciated the detailed job descriptions and company insights.", image: "https://public.readdy.ai/ai/img_res/b58ed8bb7253f8bf6feaa1c7a4d868c6.jpg", rating: 5 },
//     { id: 3, name: "Sarah Williams", role: "UX Designer", company: "DesignCraft", text: "As a designer, I was impressed by the user experience of the platform itself. Found great opportunities that matched my skills perfectly.", image: "https://public.readdy.ai/ai/img_res/6da5b5be216621ef35f1a97f68452c65.jpg", rating: 5 },
//   ];

//   const companies = [
//     { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" },
//     { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
//     { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
//     { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
//     { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
//     { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Facebook_New_Logo_%282015%29.svg" },
//     { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
//     { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
//     { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
//     { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
//     { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
//   ];

//   const toggleFilter = (filter: string) => {
//     setSelectedFilters((prev) =>
//       prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section (White Theme) */}
//       <div className="relative min-h-screen w-full bg-white text-gray-900 overflow-hidden">
//   {/* Background with Fallback */}
//   <div className="absolute inset-0 bg-white">
//     <div
//       className="w-full h-full opacity-10"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3')`,
//         backgroundRepeat: 'repeat',
//         backgroundSize: 'auto',
//         backgroundPosition: 'center',
//       }}
//       onError={(e) => {
//         e.currentTarget.style.backgroundImage = `url('https://via.placeholder.com/1920x1080?text=Background+Texture')`;
//       }}
//     ></div>
//   </div>

//   {/* Embedded CSS Animations */}
//   <style jsx>{`
//     @keyframes particle {
//       0%, 100% { transform: translate(0, 0); }
//       25% { transform: translate(20px, -20px); }
//       50% { transform: translate(-20px, 20px); }
//       75% { transform: translate(15px, 15px); }
//     }
//     .animate-particle { animation: particle 8s ease-in-out infinite; }
//     @keyframes spin-slow {
//       from { transform: rotate(0deg); }
//       to { transform: rotate(360deg); }
//     }
//     .animate-spin-slow { animation: spin-slow 20s linear infinite; }
//     @keyframes float {
//       0%, 100% { transform: translateY(0); }
//       50% { transform: translateY(-10px); }
//     }
//     .animate-float { animation: float 4s ease-in-out infinite; }
//     @keyframes float-slow {
//       0%, 100% { transform: translateY(0); }
//       50% { transform: translateY(-20px); }
//     }
//     .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
//     @keyframes text-gradient {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }
//     .animate-text-gradient {
//       background-size: 200% 200%;
//       animation: text-gradient 5s ease infinite;
//     }
//     .animation-delay-500 { animation-delay: 0.5s; }
//     .animation-delay-1000 { animation-delay: 1s; }
//     .animation-delay-2000 { animation-delay: 2s; }
//   `}</style>

//   {/* Main Content */}
//   <div className="relative min-h-screen w-full bg-white text-gray-900 overflow-hidden">
//   {/* Background with Fallback */}
//   <div className="absolute inset-0 bg-white">
//     <div
//       className="w-full h-full opacity-10"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3')`,
//         backgroundRepeat: 'repeat',
//         backgroundSize: 'auto',
//         backgroundPosition: 'center',
//       }}
//       onError={(e) => {
//         e.currentTarget.style.backgroundImage = `url('https://via.placeholder.com/1920x1080?text=Background+Texture')`;
//       }}
//     ></div>
//   </div>

//   {/* Embedded CSS Animations */}
//   <style jsx>{`
//     @keyframes particle {
//       0%, 100% { transform: translate(0, 0); }
//       25% { transform: translate(20px, -20px); }
//       50% { transform: translate(-20px, 20px); }
//       75% { transform: translate(15px, 15px); }
//     }
//     .animate-particle { animation: particle 8s ease-in-out infinite; }
//     @keyframes spin-slow {
//       from { transform: rotate(0deg); }
//       to { transform: rotate(360deg); }
//     }
//     .animate-spin-slow { animation: spin-slow 20s linear infinite; }
//     @keyframes float {
//       0%, 100% { transform: translateY(0); }
//       50% { transform: translateY(-10px); }
//     }
//     .animate-float { animation: float 4s ease-in-out infinite; }
//     @keyframes float-slow {
//       0%, 100% { transform: translateY(0); }
//       50% { transform: translateY(-20px); }
//     }
//     .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
//     @keyframes text-gradient {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }
//     .animate-text-gradient {
//       background-size: 200% 200%;
//       animation: text-gradient 5s ease infinite;
//     }
//     .animation-delay-500 { animation-delay: 0.5s; }
//     .animation-delay-1000 { animation-delay: 1s; }
//     .animation-delay-2000 { animation-delay: 2s; }
//   `}</style>

//   {/* Main Content */}
//   <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col items-center justify-center min-h-screen">
//     {/* Floating Particles */}
//     <div className="absolute inset-0 pointer-events-none">
//       <div className="absolute w-2 h-2 bg-cyan-500 rounded-full top-1/4 left-1/5 animate-particle"></div>
//       <div className="absolute w-3 h-3 bg-pink-500 rounded-full bottom-1/3 right-1/4 animate-particle animation-delay-1000"></div>
//       <div className="absolute w-1 h-1 bg-yellow-500 rounded-full top-1/2 left-3/4 animate-particle animation-delay-2000"></div>
//     </div>

//     {/* Central Narrative */}
//     <div className="text-center space-y-8 sm:space-y-12">
//       <div className="inline-flex items-center bg-cyan-100 backdrop-blur-md px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-cyan-200 animate-pulse">
//         <i className="fas fa-globe mr-2 text-cyan-600"></i>
//         <span>Your Journey Begins Here</span>
//       </div>
//       <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight relative">
//         <span className="relative z-10">Embark on Your</span>
//         <br />
//         <span className="relative inline-block">
//           <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500 animate-text-gradient">Career Odyssey</span>
//           <span className="absolute inset-0 blur-md bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500 opacity-20"></span>
//         </span>
//       </h1>
//       <p className="text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl mx-auto text-gray-600 leading-relaxed">
//         Step into a world where your skills unlock endless opportunities. Explore a universe of jobs with AI-powered precision and expert guidance.
//       </p>

//       {/* Gradient Ring with Buttons */}
//       <div className="relative w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] mx-auto">
//         {/* Single Gradient Ring */}
//         <div className="absolute inset-0 rounded-full border-[20px] border-transparent bg-gradient-to-r from-pink-500 to-purple-500 animate-spin-slow"></div>

//         {/* Buttons Positioned on the Circle */}
//         <button className="absolute top-0 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-cyan-600 transition-all shadow-md shadow-cyan-500/20">
//           <i className="fas fa-rocket mr-1 sm:mr-2"></i> Launch Search
//         </button>
//         <button className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-pink-600 transition-all shadow-md shadow-pink-500/20">
//           <i className="fas fa-compass mr-1 sm:mr-2"></i> Explore Guides
//         </button>
//         <button className="absolute top-1/2 left-0 -translate-y-1/2 bg-yellow-500 text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-yellow-600 transition-all shadow-md shadow-yellow-500/20">
//           <i className="fas fa-star mr-1 sm:mr-2"></i> Success Map
//         </button>
//         <button className="absolute top-1/2 right-0 -translate-y-1/2 bg-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-purple-600 transition-all shadow-md shadow-purple-500/20">
//           <i className="fas fa-users mr-1 sm:mr-2"></i> Join Community
//         </button>
//       </div>

//       {/* Stats Section with More Spacing */}
//       <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 md:gap-24 mt-12 sm:mt-16">
//         <div className="text-center animate-float">
//           <p className="text-xl sm:text-3xl font-bold text-cyan-500">250K+</p>
//           <p className="text-xs sm:text-sm text-gray-500">Jobs in Orbit</p>
//         </div>
//         <div className="text-center animate-float animation-delay-500">
//           <p className="text-xl sm:text-3xl font-bold text-pink-500">10K+</p>
//           <p className="text-xs sm:text-sm text-gray-500">Star Mentors</p>
//         </div>
//         <div className="text-center animate-float animation-delay-1000">
//           <p className="text-xl sm:text-3xl font-bold text-yellow-500">95%</p>
//           <p className="text-xs sm:text-sm text-gray-500">Match Accuracy</p>
//         </div>
//       </div>
//     </div>

//     {/* Floating Image */}
//     <div className="absolute bottom-8 right-8 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 hidden lg:block">
//       <img
//         src="https://images.unsplash.com/photo-1611432579699-7030e81e13e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
//         alt="Career Explorer"
//         className="w-full h-full object-contain animate-float-slow"
//         onError={(e) => {
//           e.currentTarget.src = "https://via.placeholder.com/200?text=Explorer";
//         }}
//       />
//     </div>
//   </div>
// </div>

//       {/* Trusted By Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">Trusted By Leading Companies</h2>
//           <Swiper
//             modules={[Autoplay]}
//             spaceBetween={30}
//             slidesPerView={5}
//             loop={true}
//             autoplay={{ delay: 2000, disableOnInteraction: false }}
//             breakpoints={{
//               320: { slidesPerView: 1 },
//               640: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//               1600: { slidesPerView: 4 },
//             }}
//             className="flex items-center"
//           >
//             {companies.map((company, index) => (
//               <SwiperSlide key={index}>
//                 <div className="flex flex-col items-center justify-center h-36 py-8">
//                   <img
//                     src={company.logo}
//                     alt={company.name}
//                     className="h-20 w-30 object-contain"
//                     onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/100?text=Logo"; }}
//                   />
//                   <p className="mt-4 text-lg text-gray-700 font-medium text-center">{company.name}</p>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>

//       {/* Expert Insights Section */}
//       <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">Expert Insights & Resources</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { title: "Tech Industry Trends 2025", description: "Comprehensive analysis of emerging technologies and their impact on the job market", icon: "fas fa-microchip", link: "#" },
//               { title: "Remote Work Best Practices", description: "Expert guidelines for maintaining productivity and work-life balance in remote settings", icon: "fas fa-laptop-house", link: "#" },
//               { title: "Career Development Guide", description: "Strategic approaches to advance your career in the modern workplace", icon: "fas fa-chart-line", link: "#" },
//             ].map((item, index) => (
//               <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
//                 <i className={`${item.icon} text-3xl text-[#2D5BFF] mb-4`}></i>
//                 <h3 className="text-xl font-bold mb-3">{item.title}</h3>
//                 <p className="text-gray-600 mb-4">{item.description}</p>
//                 <a href={item.link} className="text-[#2D5BFF] font-semibold flex items-center">
//                   Learn More <i className="fas fa-arrow-right ml-2"></i>
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Inspiring Quote Section */}
//       <section className="py-20 bg-[#2D5BFF]">
//         <div className="container mx-auto px-6">
//           <div className="max-w-4xl mx-auto text-center text-white">
//             <i className="fas fa-quote-left text-5xl opacity-50 mb-6"></i>
//             <blockquote className="text-3xl font-light italic mb-8">
//               "Success is not final, failure is not fatal: it is the courage to continue that counts."
//             </blockquote>
//             <p className="text-xl">- Winston Churchill</p>
//           </div>
//         </div>
//       </section>

//       {/* Technical Resources Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">Technical Resources</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { title: "Programming Guides", description: "Comprehensive tutorials and documentation for various programming languages", icon: "fas fa-code", count: "500+" },
//               { title: "Design Resources", description: "UI/UX design patterns, tools, and best practices", icon: "fas fa-palette", count: "300+" },
//               { title: "Cloud Solutions", description: "AWS, Azure, and GCP implementation guides", icon: "fas fa-cloud", count: "200+" },
//               { title: "Security Practices", description: "Cybersecurity guidelines and implementation strategies", icon: "fas fa-shield-alt", count: "150+" },
//             ].map((resource, index) => (
//               <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors duration-300">
//                 <i className={`${resource.icon} text-4xl text-[#2D5BFF] mb-4`}></i>
//                 <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
//                 <p className="text-gray-600 mb-4">{resource.description}</p>
//                 <p className="text-[#2D5BFF] font-bold">{resource.count} Resources</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Jobs Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-3xl font-bold">Featured Opportunities</h2>
//             <button className="text-[#2D5BFF] font-semibold cursor-pointer">
//               View all jobs <i className="fas fa-arrow-right ml-2"></i>
//             </button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {jobs.map((job) => (
//               <div key={job.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
//                 <div className="flex items-start gap-4">
//                   <img
//                     src={job.logo}
//                     alt={job.company}
//                     className="w-12 h-12 rounded-lg object-cover"
//                     onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/48?text=Logo"; }}
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-bold text-lg mb-1">{job.title}</h3>
//                     <p className="text-gray-600 mb-2">{job.company}</p>
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <i className="fas fa-map-marker-alt"></i>
//                       <span>{job.location}</span>
//                       <span className="mx-2">•</span>
//                       <span>{job.type}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <button className="mt-4 w-full bg-[#2D5BFF] text-white py-2 rounded-lg whitespace-nowrap cursor-pointer">
//                   Quick Apply
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Companies Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">Top Hiring Companies</h2>
//           <div className="space-y-24">
//             {[
//               { id: 1, name: "TechVision Global", description: "Leading innovation in cloud computing and AI solutions.", industry: "Technology", openings: 15, logo: "https://public.readdy.ai/ai/img_res/4e09be11d9fc80e61df92438d5fb369a.jpg", benefits: ["Flexible Work Hours", "Health Insurance", "Stock Options", "Professional Development"], location: "San Francisco, CA", founded: 2018, employees: "500-1000" },
//               { id: 2, name: "InnovateLabs", description: "Revolutionizing product development through design thinking.", industry: "Innovation", openings: 8, logo: "https://public.readdy.ai/ai/img_res/f24ded9af4edfdb17b8d0d67c4b4e225.jpg", benefits: ["Remote Work", "Unlimited PTO", "Learning Budget", "401(k) Match"], location: "New York, NY", founded: 2019, employees: "100-500" },
//               { id: 3, name: "DesignCraft", description: "Creating exceptional digital experiences through design.", industry: "Design", openings: 12, logo: "https://public.readdy.ai/ai/img_res/5b384964e5eb3be8dadce0eafd013ceb.jpg", benefits: ["Creative Environment", "Healthcare", "Gym Membership", "Team Events"], location: "Austin, TX", founded: 2020, employees: "50-100" },
//             ].map((company, index) => (
//               <div
//                 key={company.id}
//                 className={`flex items-center gap-12 opacity-0 transition-all duration-1000 ${index % 2 === 0 ? "translate-x-[-100px]" : "flex-row-reverse translate-x-[100px]"}`}
//                 data-aos="fade-up"
//               >
//                 <div className="flex-1">
//                   <img
//                     src={company.logo}
//                     alt={company.name}
//                     className="w-full h-[400px] object-cover rounded-xl shadow-lg"
//                     onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400?text=Company"; }}
//                   />
//                 </div>
//                 <div className="flex-1 space-y-6">
//                   <h3 className="text-3xl font-bold">{company.name}</h3>
//                   <p className="text-gray-600 text-lg leading-relaxed">{company.description}</p>
//                   <div className="flex items-center gap-4">
//                     <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">{company.industry}</span>
//                     <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">{company.openings} openings</span>
//                   </div>
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2"><i className="fas fa-map-marker-alt text-gray-500"></i><span>{company.location}</span></div>
//                     <div className="flex items-center gap-2"><i className="fas fa-users text-gray-500"></i><span>{company.employees} employees</span></div>
//                     <div className="flex items-center gap-2"><i className="fas fa-calendar text-gray-500"></i><span>Founded {company.founded}</span></div>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold mb-3">Benefits & Perks</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {company.benefits.map((benefit) => (
//                         <span key={benefit} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{benefit}</span>
//                       ))}
//                     </div>
//                   </div>
//                   <button className="bg-[#2D5BFF] text-white px-6 py-3 rounded-lg whitespace-nowrap hover:bg-blue-700 transition-colors">
//                     View Open Positions
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Success Stories Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { name: "David Anderson", role: "Senior Software Architect", company: "From StartupX to Google", story: "Transitioned from a small startup to leading a team at Google through strategic skill development", image: "https://public.readdy.ai/ai/img_res/efcaec019dbb597b949a6c557b574444.jpg" },
//               { name: "Jennifer Martinez", role: "Product Lead", company: "From Agency to Apple", story: "Grew from managing small projects to leading global product initiatives at Apple", image: "https://public.readdy.ai/ai/img_res/a0f56c64e9af34d33ac7543b28610119.jpg" },
//               { name: "Robert Chang", role: "AI Research Scientist", company: "From Academia to Tesla", story: "Bridged the gap between academic research and industry applications in AI", image: "https://public.readdy.ai/ai/img_res/727f734fa6ebd5d41c9b71afd269167b.jpg" },
//             ].map((story, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <img
//                   src={story.image}
//                   alt={story.name}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300x200?text=Story"; }}
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-2">{story.name}</h3>
//                   <p className="text-[#2D5BFF] font-semibold mb-2">{story.role}</p>
//                   <p className="text-gray-600 mb-3">{story.company}</p>
//                   <p className="text-gray-700">{story.story}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Market Trends Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">Market Trends</h2>
//           <div ref={chartRef} className="w-full h-[400px]"></div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
//           <Swiper
//             modules={[Pagination, Autoplay]}
//             spaceBetween={30}
//             slidesPerView={3}
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 3000 }}
//           >
//             {testimonials.map((testimonial) => (
//               <SwiperSlide key={testimonial.id}>
//                 <div className="bg-white rounded-lg p-6 shadow-sm">
//                   <div className="flex items-center gap-4 mb-4">
//                     <img
//                       src={testimonial.image}
//                       alt={testimonial.name}
//                       className="w-16 h-16 rounded-full object-cover"
//                       onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/64?text=User"; }}
//                     />
//                     <div>
//                       <h3 className="font-bold text-lg">{testimonial.name}</h3>
//                       <p className="text-gray-600">{testimonial.role} at {testimonial.company}</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 mb-4">{testimonial.text}</p>
//                   <div className="flex text-yellow-400">
//                     {[...Array(testimonial.rating)].map((_, i) => (
//                       <i key={i} className="fas fa-star"></i>
//                     ))}
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-16">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">For Job Seekers</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-blue-400 cursor-pointer">Browse Jobs</a></li>
//                 <li><a href="#" className="hover:text-blue-400 cursor-pointer">Career Resources</a></li>
//                 <li><a href="#" className="hover:text-blue-400 cursor-pointer">Resume Builder</a></li>
//                 <li><a href="#" className="hover:text-blue-400 cursor-pointer">Job Alerts</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">For Employers</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-blue-400 cursor-pointer">Post a Job</a></li>
//                 <li><a href="#" className="hover:text-blue-400 cursor-pointer">Browse Candidates</a></li>
//                 <li><a href="#" className="hover:text-blue-400 cursor-pointer">Recruiting Solutions</a></li>
//                 <li><a href="#" className="hover:text-blue-400 cursor-pointer">Pricing Plans</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Resources</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-blue-400 cursor-pointer">Help Center</a></li>
//                 <li><a href="#" className="hover:text-blue-400 cursor-pointer">Blog</a></li>
//                 <li><a href="#" className="hover:text-blue-400 cursor-pointer">Success Stories</a></li>
//                 <li><a href="#" className="hover:text-blue-400 cursor-pointer">Events</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Newsletter</h3>
//               <p className="mb-4">Stay updated with the latest job opportunities</p>
//               <div className="flex">
//                 <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-l text-gray-900 border-none" />
//                 <button className="bg-[#2D5BFF] px-4 rounded-r rounded-lg whitespace-nowrap cursor-pointer">Subscribe</button>
//               </div>
//               <div className="flex gap-4 mt-6">
//                 <a href="#" className="text-2xl hover:text-blue-400 cursor-pointer"><i className="fab fa-facebook"></i></a>
//                 <a href="#" className="text-2xl hover:text-blue-400 cursor-pointer"><i className="fab fa-twitter"></i></a>
//                 <a href="#" className="text-2xl hover:text-blue-400 cursor-pointer"><i className="fab fa-linkedin"></i></a>
//                 <a href="#" className="text-2xl hover:text-blue-400 cursor-pointer"><i className="fab fa-instagram"></i></a>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 mt-12 pt-8 text-center">
//             <p>© 2025 JobPortal. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Mainpage;

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import AOS from 'aos';
import 'swiper/css';
import 'swiper/css/pagination';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.css';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Sample data
const companies = [
  { name: 'Company 1', logo: 'https://via.placeholder.com/100' },
  { name: 'Company 2', logo: 'https://via.placeholder.com/100' },
  { name: 'Company 3', logo: 'https://via.placeholder.com/100' },
  { name: 'Company 4', logo: 'https://via.placeholder.com/100' },
  { name: 'Company 5', logo: 'https://via.placeholder.com/100' },
];

const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Tech Co', location: 'Remote', type: 'Full-time', logo: 'https://via.placeholder.com/48' },
  { id: 2, title: 'UI/UX Designer', company: 'Design Inc', location: 'New York', type: 'Part-time', logo: 'https://via.placeholder.com/48' },
  { id: 3, title: 'Data Analyst', company: 'Data Corp', location: 'San Francisco', type: 'Full-time', logo: 'https://via.placeholder.com/48' },
];

const testimonials = [
  { id: 1, name: 'John Doe', role: 'Developer', company: 'Tech Co', text: 'Great platform for job seekers!', rating: 5, image: 'https://via.placeholder.com/64' },
  { id: 2, name: 'Jane Smith', role: 'Designer', company: 'Design Inc', text: 'Found my dream job here!', rating: 4, image: 'https://via.placeholder.com/64' },
  { id: 3, name: 'Mike Johnson', role: 'Analyst', company: 'Data Corp', text: 'Excellent resources!', rating: 5, image: 'https://via.placeholder.com/64' },
];

// Chart data
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Job Market Trends 2025',
    data: [65, 59, 80, 81, 56, 73],
    fill: false,
    borderColor: '#2D5BFF',
    tension: 0.1,
  }]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Job Openings'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Months'
      }
    }
  }
};

const JobPortal = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      {/* Trusted By Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted By Leading Companies</h2>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={5}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1600: { slidesPerView: 4 },
            }}
            className="flex items-center"
          >
            {companies.map((company, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center h-36 py-8">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-20 w-30 object-contain"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/100?text=Logo"; }}
                  />
                  <p className="mt-4 text-lg text-gray-700 font-medium text-center">{company.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Expert Insights Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Expert Insights & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Tech Industry Trends 2025", description: "Comprehensive analysis of emerging technologies and their impact on the job market", icon: "fas fa-microchip", link: "#" },
              { title: "Remote Work Best Practices", description: "Expert guidelines for maintaining productivity and work-life balance in remote settings", icon: "fas fa-laptop-house", link: "#" },
              { title: "Career Development Guide", description: "Strategic approaches to advance your career in the modern workplace", icon: "fas fa-chart-line", link: "#" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <i className={`${item.icon} text-3xl text-[#2D5BFF] mb-4`}></i>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a href={item.link} className="text-[#2D5BFF] font-semibold flex items-center">
                  Learn More <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiring Quote Section */}
      <section className="py-20 bg-[#2D5BFF]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <i className="fas fa-quote-left text-5xl opacity-50 mb-6"></i>
            <blockquote className="text-3xl font-light italic mb-8">
              "Success is not final, failure is not fatal: it is the courage to continue that counts."
            </blockquote>
            <p className="text-xl">- Winston Churchill</p>
          </div>
        </div>
      </section>

      {/* Technical Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Programming Guides", description: "Comprehensive tutorials and documentation for various programming languages", icon: "fas fa-code", count: "500+" },
              { title: "Design Resources", description: "UI/UX design patterns, tools, and best practices", icon: "fas fa-palette", count: "300+" },
              { title: "Cloud Solutions", description: "AWS, Azure, and GCP implementation guides", icon: "fas fa-cloud", count: "200+" },
              { title: "Security Practices", description: "Cybersecurity guidelines and implementation strategies", icon: "fas fa-shield-alt", count: "150+" },
            ].map((resource, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors duration-300">
                <i className={`${resource.icon} text-4xl text-[#2D5BFF] mb-4`}></i>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <p className="text-[#2D5BFF] font-bold">{resource.count} Resources</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Opportunities</h2>
            <button className="text-[#2D5BFF] font-semibold cursor-pointer">
              View all jobs <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/48?text=Logo"; }}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{job.location}</span>
                      <span className="mx-2">•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full bg-[#2D5BFF] text-white py-2 rounded-lg whitespace-nowrap cursor-pointer">
                  Quick Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Top Hiring Companies</h2>
          <div className="space-y-24">
            {[
              { id: 1, name: "TechVision Global", description: "Leading innovation in cloud computing and AI solutions.", industry: "Technology", openings: 15, logo: "https://public.readdy.ai/ai/img_res/4e09be11d9fc80e61df92438d5fb369a.jpg", benefits: ["Flexible Work Hours", "Health Insurance", "Stock Options", "Professional Development"], location: "San Francisco, CA", founded: 2018, employees: "500-1000" },
              { id: 2, name: "InnovateLabs", description: "Revolutionizing product development through design thinking.", industry: "Innovation", openings: 8, logo: "https://public.readdy.ai/ai/img_res/f24ded9af4edfdb17b8d0d67c4b4e225.jpg", benefits: ["Remote Work", "Unlimited PTO", "Learning Budget", "401(k) Match"], location: "New York, NY", founded: 2019, employees: "100-500" },
              { id: 3, name: "DesignCraft", description: "Creating exceptional digital experiences through design.", industry: "Design", openings: 12, logo: "https://public.readdy.ai/ai/img_res/5b384964e5eb3be8dadce0eafd013ceb.jpg", benefits: ["Creative Environment", "Healthcare", "Gym Membership", "Team Events"], location: "Austin, TX", founded: 2020, employees: "50-100" },
            ].map((company, index) => (
              <div
                key={company.id}
                className={`flex items-center gap-12 opacity-0 transition-all duration-1000 ${index % 2 === 0 ? "translate-x-[-100px]" : "flex-row-reverse translate-x-[100px]"}`}
                data-aos="fade-up"
              >
                <div className="flex-1">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-[400px] object-cover rounded-xl shadow-lg"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400?text=Company"; }}
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-bold">{company.name}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{company.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">{company.industry}</span>
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">{company.openings} openings</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2"><i className="fas fa-map-marker-alt text-gray-500"></i><span>{company.location}</span></div>
                    <div className="flex items-center gap-2"><i className="fas fa-users text-gray-500"></i><span>{company.employees} employees</span></div>
                    <div className="flex items-center gap-2"><i className="fas fa-calendar text-gray-500"></i><span>Founded {company.founded}</span></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Benefits & Perks</h4>
                    <div className="flex flex-wrap gap-2">
                      {company.benefits.map((benefit) => (
                        <span key={benefit} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{benefit}</span>
                      ))}
                    </div>
                  </div>
                  <button className="bg-[#2D5BFF] text-white px-6 py-3 rounded-lg whitespace-nowrap hover:bg-blue-700 transition-colors">
                    View Open Positions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "David Anderson", role: "Senior Software Architect", company: "From StartupX to Google", story: "Transitioned from a small startup to leading a team at Google through strategic skill development", image: "https://public.readdy.ai/ai/img_res/efcaec019dbb597b949a6c557b574444.jpg" },
              { name: "Jennifer Martinez", role: "Product Lead", company: "From Agency to Apple", story: "Grew from managing small projects to leading global product initiatives at Apple", image: "https://public.readdy.ai/ai/img_res/a0f56c64e9af34d33ac7543b28610119.jpg" },
              { name: "Robert Chang", role: "AI Research Scientist", company: "From Academia to Tesla", story: "Bridged the gap between academic research and industry applications in AI", image: "https://public.readdy.ai/ai/img_res/727f734fa6ebd5d41c9b71afd269167b.jpg" },
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300x200?text=Story"; }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{story.name}</h3>
                  <p className="text-[#2D5BFF] font-semibold mb-2">{story.role}</p>
                  <p className="text-gray-600 mb-3">{story.company}</p>
                  <p className="text-gray-700">{story.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Market Trends</h2>
          <div ref={chartRef} className="w-full h-[400px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/64?text=User"; }}
                    />
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.text}</p>
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">For Job Seekers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 cursor-pointer">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-blue-400 cursor-pointer">Career Resources</a></li>
                <li><a href="#" className="hover:text-blue-400 cursor-pointer">Resume Builder</a></li>
                <li><a href="#" className="hover:text-blue-400 cursor-pointer">Job Alerts</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">For Employers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 cursor-pointer">Post a Job</a></li>
                <li><a href="#" className="hover:text-blue-400 cursor-pointer">Browse Candidates</a></li>
                <li><a href="#" className="hover:text-blue-400 cursor-pointer">Recruiting Solutions</a></li>
                <li><a href="#" className="hover:text-blue-400 cursor-pointer">Pricing Plans</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 cursor-pointer">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 cursor-pointer">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 cursor-pointer">Success Stories</a></li>
                <li><a href="#" className="hover:text-blue-400 cursor-pointer">Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="mb-4">Stay updated with the latest job opportunities</p>
              <div className="flex">
                <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-l text-gray-900 border-none" />
                <button className="bg-[#2D5BFF] px-4 rounded-r rounded-lg whitespace-nowrap cursor-pointer">Subscribe</button>
              </div>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-2xl hover:text-blue-400 cursor-pointer"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-2xl hover:text-blue-400 cursor-pointer"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-2xl hover:text-blue-400 cursor-pointer"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="text-2xl hover:text-blue-400 cursor-pointer"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p>© 2025 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobPortal;