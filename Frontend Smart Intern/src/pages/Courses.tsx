// // The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay } from 'swiper/modules';
// import * as echarts from 'echarts';
// const Courses: React.FC = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [showLoginModal, setShowLoginModal] = useState(false);
//     const [selectedCourse, setSelectedCourse] = useState<null | {
//         title: string;
//         price: string;
//         description: string;
//         instructor: string;
//         image: string;
//     }>(null);
//     useEffect(() => {
//         const chartDom = document.getElementById('successRateChart');
//         if (chartDom) {
//             const myChart = echarts.init(chartDom);
//             const option = {
//                 animation: false,
//                 title: {
//                     text: 'Student Success Rate',
//                     left: 'center',
//                     textStyle: {
//                         color: '#333',
//                         fontSize: 16,
//                         fontWeight: 'normal'
//                     }
//                 },
//                 tooltip: {
//                     trigger: 'item'
//                 },
//                 series: [
//                     {
//                         name: 'Success Rate',
//                         type: 'pie',
//                         radius: ['50%', '70%'],
//                         avoidLabelOverlap: false,
//                         itemStyle: {
//                             borderRadius: 10,
//                             borderColor: '#fff',
//                             borderWidth: 2
//                         },
//                         label: {
//                             show: false,
//                             position: 'center'
//                         },
//                         emphasis: {
//                             label: {
//                                 show: true,
//                                 fontSize: 20,
//                                 fontWeight: 'bold'
//                             }
//                         },
//                         labelLine: {
//                             show: false
//                         },
//                         data: [
//                             { value: 95, name: 'Placement Rate' },
//                             { value: 5, name: 'Other' }
//                         ]
//                     }
//                 ]
//             };
//             myChart.setOption(option);
//         }
//     }, []);
//     const featuredCourses = [
//         {
//             title: 'Full Stack JavaScript Development',
//             price: '$149.99',
//             instructor: 'Dr. Sarah Anderson, Tech Lead at Google',
//             description: 'Master React, Node.js, and modern JavaScript frameworks. Build complete web applications from frontend to backend.',
//             image: 'https://public.readdy.ai/ai/img_res/336b5a7a9c9c8356174006a2481dc48f.jpg'
//         },
//         {
//             title: 'Mobile App Development Bundle',
//             price: '$199.99',
//             instructor: 'Prof. Michael Chen, Senior iOS Developer',
//             description: 'Comprehensive course covering Android SDK and iOS development with Xcode. Create professional mobile applications.',
//             image: 'https://public.readdy.ai/ai/img_res/fd966c7acba893de8f95757441d64f9e.jpg'
//         },
//         {
//             title: 'Game Development with Unity',
//             price: '$169.99',
//             instructor: 'Emily Rodriguez, Game Development Expert',
//             description: 'Learn game development using Unity and C#. Create immersive 3D games and interactive experiences.',
//             image: 'https://public.readdy.ai/ai/img_res/4c26a234f4952569f65930e1e982a1c9.jpg'
//         },
//         {
//             title: 'Enterprise Java Development',
//             price: '$179.99',
//             instructor: 'Dr. James Wilson, Enterprise Architect',
//             description: 'Master Spring Framework and enterprise Java development. Build scalable, secure business applications.',
//             image: 'https://public.readdy.ai/ai/img_res/855c803cf5df7dfb469a29f4e74373f4.jpg'
//         },
//         {
//             title: 'Python & Django Web Development',
//             price: '$159.99',
//             instructor: 'Dr. Lisa Thompson, Backend Development Expert',
//             description: 'Build powerful web applications with Python and Django. Learn database design, API development, and deployment.',
//             image: 'https://public.readdy.ai/ai/img_res/12b85ecd55b8fe98e7966231443a5ccd.jpg'
//         },
//         {
//             title: 'DevOps & Version Control',
//             price: '$139.99',
//             instructor: 'Alex Martinez, DevOps Engineer',
//             description: 'Master Git, CI/CD pipelines, and modern DevOps practices. Learn to manage and deploy applications effectively.',
//             image: 'https://public.readdy.ai/ai/img_res/ca0f7bc180ba9778120e2b168e4ceed2.jpg'
//         }
//     ];
//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <header className="bg-white shadow-sm">
//                 <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//                     <div className="flex items-center space-x-8">
//                         <h1 className="text-2xl font-bold text-blue-600">LearnTech</h1>
//                         <nav className="hidden md:flex space-x-6">
//                             <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer">Courses</a>
//                             <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer">Certificates</a>
//                             <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer">About Us</a>
//                         </nav>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 placeholder="Search courses..."
//                                 className="w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                             <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
//                         </div>
//                         <button
//                             onClick={() => setShowLoginModal(true)}
//                             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 !rounded-button hover:bg-blue-700 cursor-pointer whitespace-nowrap"
//                         >
//                             Sign In
//                         </button>
//                     </div>
//                 </div>
//             </header>
//             {/* Hero Section */}
//             <div className="relative h-[500px] bg-cover bg-center" style={{
//                 backgroundImage: `url('https://public.readdy.ai/ai/img_res/252ca0499b1d2fa8a57e31e56f377007.jpg')`
//             }}>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent">
//                     <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
//                         <div className="max-w-xl text-white">
//                             <h2 className="text-4xl font-bold mb-4">Explore Our Top Courses</h2>
//                             <p className="text-xl mb-8">Discover a wide range of courses, from Python to React. Start your journey today!</p>
//                             <button className="px-8 py-3 bg-blue-600 text-white font-medium !rounded-button hover:bg-blue-700 cursor-pointer whitespace-nowrap">
//                                 Browse Courses
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

            
//             {/* Featured Courses */}
//             <div className="max-w-7xl mx-auto px-4 py-16">
//                 <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {featuredCourses.map((course, index) => (
//                         <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer" onClick={() => setSelectedCourse(course)}>
//                             <img src={course.image} alt={course.title} className="w-full h-48 object-cover object-top" />
//                             <div className="p-6">
//                                 <h3 className="text-xl font-bold mb-2">{course.title}</h3>
//                                 <p className="text-gray-600 mb-4">{course.description}</p>
//                                 <div className="flex items-center mb-4">
//                                     <i className="fas fa-user-graduate text-blue-600 mr-2"></i>
//                                     <span className="text-sm text-gray-600">{course.instructor}</span>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                     <span className="text-2xl font-bold text-blue-600">{course.price}</span>
//                                     <button className="px-4 py-2 bg-blue-600 text-white !rounded-button hover:bg-blue-700 whitespace-nowrap">
//                                         Enroll Now
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {/* Success Rate Section */}
//             <div className="bg-white py-16">
//                 <div className="max-w-7xl mx-auto px-4">
//                     <h2 className="text-3xl font-bold text-center mb-12">Our Success Rate</h2>
//                     <div className="grid md:grid-cols-2 gap-8 items-center">
//                         <div id="successRateChart" style={{ height: '400px' }}></div>
//                         <div className="space-y-6">
//                             <div className="flex items-center space-x-4">
//                                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
//                                     <i className="fas fa-graduation-cap text-xl"></i>
//                                 </div>
//                                 <div>
//                                     <h3 className="text-xl font-bold">95% Placement Rate</h3>
//                                     <p className="text-gray-600">Our students get placed in top companies worldwide</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center space-x-4">
//                                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
//                                     <i className="fas fa-certificate text-xl"></i>
//                                 </div>
//                                 <div>
//                                     <h3 className="text-xl font-bold">IIT Certified Courses</h3>
//                                     <p className="text-gray-600">Get certified by top IIT professionals</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* Course Gallery */}
//             <div className="bg-gray-50 py-16">
//                 <div className="max-w-7xl mx-auto px-4">
//                     <h2 className="text-3xl font-bold text-center mb-12">Course Gallery</h2>
//                     <Swiper
//                         modules={[Pagination, Autoplay]}
//                         spaceBetween={30}
//                         slidesPerView={3}
//                         pagination={{ clickable: true }}
//                         autoplay={{ delay: 3000 }}
//                         className="pb-12"
//                     >
//                         {[...Array(6)].map((_, index) => (
//                             <SwiperSlide key={index}>
//                                 <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                                     <img
//                                         src={`https://readdy.ai/api/search-image?query=professional education workspace with modern computer setup, clean desk environment, soft lighting and tech elements&width=400&height=250&flag=cdc0f7ff36e99eab1c7664536548dee7&seq=${index + 5}&orientation=landscape`}
//                                         alt={`Course preview ${index + 1}`}
//                                         className="w-full h-48 object-cover object-top"
//                                     />
//                                     <div className="p-4">
//                                         <h3 className="font-bold mb-2">Advanced Web Development</h3>
//                                         <p className="text-sm text-gray-600">IIT Certified Course</p>
//                                     </div>
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>
//             </div>
//             {/* Footer */}
//             <footer className="bg-gray-900 text-white py-12">
//                 <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
//                     <div>
//                         <h3 className="text-xl font-bold mb-4">LearnTech</h3>
//                         <p className="text-gray-400">Empowering careers through quality education</p>
//                     </div>
//                     <div>
//                         <h4 className="font-bold mb-4">Quick Links</h4>
//                         <ul className="space-y-2">
//                             <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Courses</a></li>
//                             <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Certificates</a></li>
//                             <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">About Us</a></li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h4 className="font-bold mb-4">Contact</h4>
//                         <ul className="space-y-2">
//                             <li className="text-gray-400">Email: info@learntech.com</li>
//                             <li className="text-gray-400">Phone: +1 234 567 890</li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h4 className="font-bold mb-4">Newsletter</h4>
//                         <div className="flex">
//                             <input
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 className="px-4 py-2 text-gray-900 rounded-l-lg focus:outline-none"
//                             />
//                             <button className="px-4 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700 whitespace-nowrap">
//                                 Subscribe
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//             {/* Login Modal */}
//             {showLoginModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-xl p-8 max-w-md w-full">
//                         <div className="flex justify-between items-center mb-6">
//                             <h3 className="text-2xl font-bold">Sign In</h3>
//                             <button onClick={() => setShowLoginModal(false)} className="text-gray-500 hover:text-gray-700">
//                                 <i className="fas fa-times"></i>
//                             </button>
//                         </div>
//                         <form className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                                 <input
//                                     type="email"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     placeholder="Enter your email"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                                 <input
//                                     type="password"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     placeholder="Enter your password"
//                                 />
//                             </div>
//                             <button className="w-full px-4 py-2 bg-blue-600 text-white !rounded-button hover:bg-blue-700 whitespace-nowrap">
//                                 Sign In
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//             {/* Course Detail Modal */}
//             {selectedCourse && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//                         <div className="flex justify-between items-center mb-6">
//                             <h3 className="text-2xl font-bold">{selectedCourse.title}</h3>
//                             <button onClick={() => setSelectedCourse(null)} className="text-gray-500 hover:text-gray-700">
//                                 <i className="fas fa-times"></i>
//                             </button>
//                         </div>
//                         <div className="grid md:grid-cols-2 gap-8">
//                             <div>
//                                 <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-64 object-cover object-top rounded-lg mb-6" />
//                                 <div className="space-y-4">
//                                     <div className="flex items-center space-x-2">
//                                         <i className="fas fa-clock text-blue-600"></i>
//                                         <span>Duration: 12 weeks (4-6 hours/week)</span>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                         <i className="fas fa-signal text-blue-600"></i>
//                                         <span>Level: Intermediate</span>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                         <i className="fas fa-language text-blue-600"></i>
//                                         <span>Language: English</span>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                         <i className="fas fa-certificate text-blue-600"></i>
//                                         <span>Certificate: IIT Certified</span>
//                                     </div>
//                                 </div>
//                                 <div className="mt-6">
//                                     <h4 className="font-bold text-lg mb-2">Prerequisites</h4>
//                                     <ul className="list-disc list-inside space-y-2 text-gray-600">
//                                         <li>Basic programming knowledge</li>
//                                         <li>Understanding of web technologies</li>
//                                         <li>Laptop with minimum 8GB RAM</li>
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className="space-y-6">
//                                 <div>
//                                     <h4 className="font-bold text-lg mb-2">Course Description</h4>
//                                     <p className="text-gray-600">{selectedCourse.description}</p>
//                                 </div>
//                                 <div>
//                                     <h4 className="font-bold text-lg mb-2">What You'll Learn</h4>
//                                     <ul className="space-y-2">
//                                         <li className="flex items-start space-x-2">
//                                             <i className="fas fa-check-circle text-green-500 mt-1"></i>
//                                             <span>Master advanced programming concepts and best practices</span>
//                                         </li>
//                                         <li className="flex items-start space-x-2">
//                                             <i className="fas fa-check-circle text-green-500 mt-1"></i>
//                                             <span>Build real-world projects with industry standards</span>
//                                         </li>
//                                         <li className="flex items-start space-x-2">
//                                             <i className="fas fa-check-circle text-green-500 mt-1"></i>
//                                             <span>Learn system design and architecture patterns</span>
//                                         </li>
//                                         <li className="flex items-start space-x-2">
//                                             <i className="fas fa-check-circle text-green-500 mt-1"></i>
//                                             <span>Implement security best practices</span>
//                                         </li>
//                                     </ul>
//                                 </div>
//                                 <div>
//                                     <h4 className="font-bold text-lg mb-2">Instructor</h4>
//                                     <div className="flex items-center space-x-4">
//                                         <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
//                                             <i className="fas fa-user-tie text-2xl text-gray-600"></i>
//                                         </div>
//                                         <div>
//                                             <h5 className="font-bold">{selectedCourse.instructor}</h5>
//                                             <p className="text-gray-600">15+ years of industry experience</p>
//                                             <div className="flex items-center mt-1">
//                                                 <i className="fas fa-star text-yellow-400"></i>
//                                                 <i className="fas fa-star text-yellow-400"></i>
//                                                 <i className="fas fa-star text-yellow-400"></i>
//                                                 <i className="fas fa-star text-yellow-400"></i>
//                                                 <i className="fas fa-star text-yellow-400"></i>
//                                                 <span className="ml-2 text-sm text-gray-600">(4.9/5)</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mt-8 p-6 bg-gray-50 rounded-lg">
//                                     <div className="flex justify-between items-center mb-4">
//                                         <span className="text-3xl font-bold text-blue-600">{selectedCourse.price}</span>
//                                         <div className="flex items-center space-x-2">
//                                             <i className="fas fa-users text-gray-600"></i>
//                                             <span className="text-sm text-gray-600">526 enrolled</span>
//                                         </div>
//                                     </div>
//                                     <button className="w-full py-3 bg-blue-600 text-white !rounded-button hover:bg-blue-700 whitespace-nowrap">
//                                         Enroll Now
//                                     </button>
//                                     <p className="text-sm text-gray-500 text-center mt-4">30-day money-back guarantee</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
// export default Courses


// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
// Also, add Razorpay script in your index.html: <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import * as echarts from 'echarts';

const Courses: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<null | {
        title: string;
        price: string;
        description: string;
        instructor: string;
        image: string;
    }>(null);

    useEffect(() => {
        const chartDom = document.getElementById('successRateChart');
        if (chartDom) {
            const myChart = echarts.init(chartDom);
            const option = {
                animation: false,
                title: {
                    text: 'Student Success Rate',
                    left: 'center',
                    textStyle: {
                        color: '#333',
                        fontSize: 16,
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: 'Success Rate',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 20,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 95, name: 'Placement Rate' },
                            { value: 5, name: 'Other' }
                        ]
                    }
                ]
            };
            myChart.setOption(option);
        }
    }, []);

    const featuredCourses = [
        {
            title: 'Full Stack JavaScript Development',
            price: '$149.99',
            instructor: 'Dr. Sarah Anderson, Tech Lead at Google',
            description: 'Master React, Node.js, and modern JavaScript frameworks. Build complete web applications from frontend to backend.',
            image: 'https://public.readdy.ai/ai/img_res/336b5a7a9c9c8356174006a2481dc48f.jpg'
        },
        {
            title: 'Mobile App Development Bundle',
            price: '$199.99',
            instructor: 'Prof. Michael Chen, Senior iOS Developer',
            description: 'Comprehensive course covering Android SDK and iOS development with Xcode. Create professional mobile applications.',
            image: 'https://public.readdy.ai/ai/img_res/fd966c7acba893de8f95757441d64f9e.jpg'
        },
        {
            title: 'Game Development with Unity',
            price: '$169.99',
            instructor: 'Emily Rodriguez, Game Development Expert',
            description: 'Learn game development using Unity and C#. Create immersive 3D games and interactive experiences.',
            image: 'https://public.readdy.ai/ai/img_res/4c26a234f4952569f65930e1e982a1c9.jpg'
        },
        {
            title: 'Enterprise Java Development',
            price: '$179.99',
            instructor: 'Dr. James Wilson, Enterprise Architect',
            description: 'Master Spring Framework and enterprise Java development. Build scalable, secure business applications.',
            image: 'https://public.readdy.ai/ai/img_res/855c803cf5df7dfb469a29f4e74373f4.jpg'
        },
        {
            title: 'Python & Django Web Development',
            price: '$159.99',
            instructor: 'Dr. Lisa Thompson, Backend Development Expert',
            description: 'Build powerful web applications with Python and Django. Learn database design, API development, and deployment.',
            image: 'https://public.readdy.ai/ai/img_res/12b85ecd55b8fe98e7966231443a5ccd.jpg'
        },
        {
            title: 'DevOps & Version Control',
            price: '$139.99',
            instructor: 'Alex Martinez, DevOps Engineer',
            description: 'Master Git, CI/CD pipelines, and modern DevOps practices. Learn to manage and deploy applications effectively.',
            image: 'https://public.readdy.ai/ai/img_res/ca0f7bc180ba9778120e2b168e4ceed2.jpg'
        }
    ];

    const handlePayment = (course: { title: string; price: string }) => {
        const priceInINR = parseFloat(course.price.replace('$', '')) * 83 * 100; // Convert USD to INR paise (test mode)

        const options = {
            key: 'rzp_test_xxxxxxxxxxxxxx', // Replace with your actual Razorpay Test Mode Key ID
            amount: priceInINR,
            currency: 'INR',
            name: 'LearnTech',
            description: `Payment for ${course.title} (Test Mode)`,
            image: 'https://your-logo-url.com/logo.png',
            handler: function (response: any) {
                alert('Test Payment successful! Payment ID: ' + response.razorpay_payment_id);
                console.log('Test Payment Response:', response);
                // Simulate backend call or further processing here
            },
            prefill: {
                name: 'Test Student',
                email: 'test.student@example.com',
                contact: '9999999999'
            },
            notes: {
                course_title: course.title,
                mode: 'test'
            },
            theme: {
                color: '#2563eb'
            },
            modal: {
                ondismiss: function () {
                    console.log('Test Payment modal closed');
                }
            }
        };

        if (window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                alert('Test Payment failed. Please try again.');
                console.error('Test Payment Error:', response.error);
            });
            rzp.open();
        } else {
            alert('Razorpay SDK not loaded. Please check your internet connection and try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-2xl font-bold text-blue-600">LearnTech</h1>
                        <nav className="hidden md:flex space-x-6">
                            <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer">Courses</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer">Certificates</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer">About Us</a>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                        </div>
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 !rounded-button hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative h-[500px] bg-cover bg-center" style={{
                backgroundImage: `url('https://public.readdy.ai/ai/img_res/252ca0499b1d2fa8a57e31e56f377007.jpg')`
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent">
                    <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
                        <div className="max-w-xl text-white">
                            <h2 className="text-4xl font-bold mb-4">Explore Our Top Courses</h2>
                            <p className="text-xl mb-8">Discover a wide range of courses, from Python to React. Start your journey today!</p>
                            <button className="px-8 py-3 bg-blue-600 text-white font-medium !rounded-button hover:bg-blue-700 cursor-pointer whitespace-nowrap">
                                Browse Courses
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Courses */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredCourses.map((course, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer" onClick={() => setSelectedCourse(course)}>
                            <img src={course.image} alt={course.title} className="w-full h-48 object-cover object-top" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                                <p className="text-gray-600 mb-4">{course.description}</p>
                                <div className="flex items-center mb-4">
                                    <i className="fas fa-user-graduate text-blue-600 mr-2"></i>
                                    <span className="text-sm text-gray-600">{course.instructor}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePayment(course);
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white !rounded-button hover:bg-blue-700 whitespace-nowrap"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Success Rate Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Success Rate</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div id="successRateChart" style={{ height: '400px' }}></div>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                    <i className="fas fa-graduation-cap text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">95% Placement Rate</h3>
                                    <p className="text-gray-600">Our students get placed in top companies worldwide</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                    <i className="fas fa-certificate text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">IIT Certified Courses</h3>
                                    <p className="text-gray-600">Get certified by top IIT professionals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Gallery */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Course Gallery</h2>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={3}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        className="pb-12"
                    >
                        {[...Array(6)].map((_, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <img
                                        src={`https://readdy.ai/api/search-image?query=professional education workspace with modern computer setup, clean desk environment, soft lighting and tech elements&width=400&height=250&flag=cdc0f7ff36e99eab1c7664536548dee7&seq=${index + 5}&orientation=landscape`}
                                        alt={`Course preview ${index + 1}`}
                                        className="w-full h-48 object-cover object-top"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-bold mb-2">Advanced Web Development</h3>
                                        <p className="text-sm text-gray-600">IIT Certified Course</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">LearnTech</h3>
                        <p className="text-gray-400">Empowering careers through quality education</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Courses</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Certificates</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">About Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Contact</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-400">Email: info@learntech.com</li>
                            <li className="text-gray-400">Phone: +1 234 567 890</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Newsletter</h4>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 text-gray-900 rounded-l-lg focus:outline-none"
                            />
                            <button className="px-4 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700 whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold">Sign In</h3>
                            <button onClick={() => setShowLoginModal(false)} className="text-gray-500 hover:text-gray-700">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <button className="w-full px-4 py-2 bg-blue-600 text-white !rounded-button hover:bg-blue-700 whitespace-nowrap">
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Course Detail Modal */}
            {selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold">{selectedCourse.title}</h3>
                            <button onClick={() => setSelectedCourse(null)} className="text-gray-500 hover:text-gray-700">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-64 object-cover object-top rounded-lg mb-6" />
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <i className="fas fa-clock text-blue-600"></i>
                                        <span>Duration: 12 weeks (4-6 hours/week)</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <i className="fas fa-signal text-blue-600"></i>
                                        <span>Level: Intermediate</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <i className="fas fa-language text-blue-600"></i>
                                        <span>Language: English</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <i className="fas fa-certificate text-blue-600"></i>
                                        <span>Certificate: IIT Certified</span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h4 className="font-bold text-lg mb-2">Prerequisites</h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                                        <li>Basic programming knowledge</li>
                                        <li>Understanding of web technologies</li>
                                        <li>Laptop with minimum 8GB RAM</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Course Description</h4>
                                    <p className="text-gray-600">{selectedCourse.description}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">What You'll Learn</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start space-x-2">
                                            <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                            <span>Master advanced programming concepts and best practices</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                            <span>Build real-world projects with industry standards</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                            <span>Learn system design and architecture patterns</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                            <span>Implement security best practices</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Instructor</h4>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                            <i className="fas fa-user-tie text-2xl text-gray-600"></i>
                                        </div>
                                        <div>
                                            <h5 className="font-bold">{selectedCourse.instructor}</h5>
                                            <p className="text-gray-600">15+ years of industry experience</p>
                                            <div className="flex items-center mt-1">
                                                <i className="fas fa-star text-yellow-400"></i>
                                                <i className="fas fa-star text-yellow-400"></i>
                                                <i className="fas fa-star text-yellow-400"></i>
                                                <i className="fas fa-star text-yellow-400"></i>
                                                <i className="fas fa-star text-yellow-400"></i>
                                                <span className="ml-2 text-sm text-gray-600">(4.9/5)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-3xl font-bold text-blue-600">{selectedCourse.price}</span>
                                        <div className="flex items-center space-x-2">
                                            <i className="fas fa-users text-gray-600"></i>
                                            <span className="text-sm text-gray-600">526 enrolled</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handlePayment(selectedCourse)}
                                        className="w-full py-3 bg-blue-600 text-white !rounded-button hover:bg-blue-700 whitespace-nowrap"
                                    >
                                        Enroll Now
                                    </button>
                                    <p className="text-sm text-gray-500 text-center mt-4">30-day money-back guarantee</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;