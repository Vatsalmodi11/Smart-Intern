// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import Video from "../video/codevideo.mp4"
import Banner from "../images/career images/carreer.webp"
import { Link } from "react-router-dom";

const Careerpage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const popularityChartRef = useRef<HTMLDivElement>(null);
  const trendsChartRef = useRef<HTMLDivElement>(null);
  const jobsChartRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", name: "All Technologies" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "mobile", name: "Mobile" },
    { id: "database", name: "Database" },
    { id: "devops", name: "DevOps" },
  ];

  const technologies = [
    {
      id: "javascript",
      name: "JavaScript",
      icon: "fa-js",
      category: "frontend",
      popularity: 92,
      difficulty: "medium",
      description:
        "A high-level, interpreted programming language that conforms to the ECMAScript specification.",
      yearCreated: 1995,
      creator: "Brendan Eich",
      jobsAvailable: 124500,
      averageSalary: "$112,000",
      githubRepos: "17.2M",
      topFrameworks: ["React", "Vue", "Angular", "Svelte"],
      learningResources: [
        "MDN Web Docs",
        "JavaScript.info",
        "Eloquent JavaScript",
      ],
    },
    {
      id: "python",
      name: "Python",
      icon: "fa-python",
      category: "backend",
      popularity: 95,
      difficulty: "easy",
      description:
        "An interpreted, high-level, general-purpose programming language with design philosophy that emphasizes code readability.",
      yearCreated: 1991,
      creator: "Guido van Rossum",
      jobsAvailable: 98700,
      averageSalary: "$120,000",
      githubRepos: "14.8M",
      topFrameworks: ["Django", "Flask", "FastAPI", "Pyramid"],
      learningResources: ["Python.org", "Real Python", "Python Crash Course"],
    },
    {
      id: "java",
      name: "Java",
      icon: "fa-java",
      category: "backend",
      popularity: 85,
      difficulty: "hard",
      description:
        "A class-based, object-oriented programming language designed to have as few implementation dependencies as possible.",
      yearCreated: 1995,
      creator: "James Gosling",
      jobsAvailable: 87300,
      averageSalary: "$104,000",
      githubRepos: "10.5M",
      topFrameworks: ["Spring", "Hibernate", "Struts", "JavaFX"],
      learningResources: ["Oracle Java Tutorials", "Baeldung", "Java Brains"],
    },
    {
      id: "react",
      name: "React",
      icon: "fa-react",
      category: "frontend",
      popularity: 90,
      difficulty: "medium",
      description:
        "A JavaScript library for building user interfaces, particularly single-page applications.",
      yearCreated: 2013,
      creator: "Jordan Walke (Facebook)",
      jobsAvailable: 78500,
      averageSalary: "$118,000",
      githubRepos: "8.7M",
      topFrameworks: ["Next.js", "Gatsby", "Create React App", "Remix"],
      learningResources: ["React Docs", "React for Beginners", "Epic React"],
    },
    {
      id: "android",
      name: "Android",
      icon: "fa-android",
      category: "mobile",
      popularity: 82,
      difficulty: "hard",
      description:
        "A mobile operating system based on a modified version of the Linux kernel, designed primarily for touchscreen mobile devices.",
      yearCreated: 2008,
      creator: "Android Inc. (acquired by Google)",
      jobsAvailable: 65200,
      averageSalary: "$107,000",
      githubRepos: "7.3M",
      topFrameworks: [
        "Jetpack Compose",
        "Flutter",
        "React Native",
        "Kotlin Multiplatform",
      ],
      learningResources: [
        "Android Developers",
        "Udacity Android Courses",
        "Ray Wenderlich",
      ],
    },
    {
      id: "nodejs",
      name: "Node.js",
      icon: "fa-node-js",
      category: "backend",
      popularity: 88,
      difficulty: "medium",
      description:
        "An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.",
      yearCreated: 2009,
      creator: "Ryan Dahl",
      jobsAvailable: 72400,
      averageSalary: "$114,000",
      githubRepos: "9.1M",
      topFrameworks: ["Express", "Nest.js", "Koa", "Fastify"],
      learningResources: [
        "Node.js Docs",
        "Node School",
        "Node.js Design Patterns",
      ],
    },
    {
      id: "sql",
      name: "SQL",
      icon: "fa-database",
      category: "database",
      popularity: 87,
      difficulty: "medium",
      description:
        "A domain-specific language used in programming and designed for managing data held in a relational database management system.",
      yearCreated: 1974,
      creator: "Donald D. Chamberlin and Raymond F. Boyce",
      jobsAvailable: 89600,
      averageSalary: "$98,000",
      githubRepos: "5.2M",
      topFrameworks: ["MySQL", "PostgreSQL", "SQL Server", "Oracle"],
      learningResources: ["W3Schools SQL", "SQL Zoo", "Mode Analytics"],
    },
    {
      id: "docker",
      name: "Docker",
      icon: "fa-docker",
      category: "devops",
      popularity: 84,
      difficulty: "medium",
      description:
        "A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.",
      yearCreated: 2013,
      creator: "Solomon Hykes",
      jobsAvailable: 58700,
      averageSalary: "$125,000",
      githubRepos: "6.8M",
      topFrameworks: [
        "Docker Compose",
        "Docker Swarm",
        "Kubernetes",
        "Portainer",
      ],
      learningResources: [
        "Docker Docs",
        "Docker for Beginners",
        "Docker Deep Dive",
      ],
    },
  ];

  useEffect(() => {
    if (popularityChartRef.current) {
      const chart = echarts.init(popularityChartRef.current);
      const option = {
        animation: false,
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
        xAxis: { type: "value", max: 100 },
        yAxis: { type: "category", data: technologies.map((tech) => tech.name) },
        series: [
          {
            name: "Popularity",
            type: "bar",
            data: technologies.map((tech) => tech.popularity),
            itemStyle: {
              color: function (params: any) {
                const colorList = [
                  "#5470c6",
                  "#91cc75",
                  "#fac858",
                  "#ee6666",
                  "#73c0de",
                  "#3ba272",
                  "#fc8452",
                  "#9a60b4",
                ];
                return colorList[params.dataIndex % colorList.length];
              },
            },
          },
        ],
      };
      chart.setOption(option);
    }
    if (trendsChartRef.current) {
      const chart = echarts.init(trendsChartRef.current);
      const option = {
        animation: false,
        tooltip: { trigger: "axis" },
        legend: { data: ["JavaScript", "Python", "Java", "React", "Node.js"] },
        grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
        },
        yAxis: { type: "value", name: "Popularity Index" },
        series: [
          { name: "JavaScript", type: "line", data: [82, 85, 87, 89, 90, 91, 92] },
          { name: "Python", type: "line", data: [78, 83, 88, 90, 92, 94, 95] },
          { name: "Java", type: "line", data: [90, 88, 87, 86, 85, 85, 85] },
          { name: "React", type: "line", data: [75, 80, 84, 86, 88, 89, 90] },
          { name: "Node.js", type: "line", data: [76, 79, 82, 84, 86, 87, 88] },
        ],
      };
      chart.setOption(option);
    }
    if (jobsChartRef.current) {
      const chart = echarts.init(jobsChartRef.current);
      const option = {
        animation: false,
        tooltip: { trigger: "item" },
        legend: { orient: "vertical", left: "left" },
        series: [
          {
            name: "Job Market Share",
            type: "pie",
            radius: "70%",
            data: technologies.map((tech) => ({
              value: tech.jobsAvailable,
              name: tech.name,
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      chart.setOption(option);
    }
  }, []);

  const filteredTechnologies = technologies.filter(
    (tech) =>
      (selectedCategory === "all" || tech.category === selectedCategory) &&
      (searchQuery === "" || tech.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Hero Section */}
      <div
        className="relative w-full max-w-screen-2xl h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${Banner})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/70 flex items-center justify-center">
          <div className="text-center px-6 py-20 max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">Programming Languages & Technologies</h1>
            <p className="text-xl text-blue-100 mb-8">
              Comprehensive data and insights on the most popular programming languages and frameworks
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search technologies..."
                className="w-full px-6 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-screen-2xl px-6 py-12 flex flex-col items-center">
        {/* Meet Our Founder Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center mb-16 w-full max-w-5xl">
          <div className="space-y-6 text-center lg:text-left">
            <h3 className="text-xl font-semibold text-gray-900">Technical Round & Practice Round Overview</h3>
            <p className="text-gray-600 leading-relaxed">
            The Technical Round is designed to assess a candidate's problem-solving abilities, coding skills, and understanding of core technical concepts related to the job role. It typically includes data structures, algorithms, system design, databases, object-oriented programming, and domain-specific questions. Candidates may face coding challenges on platforms like LeetCode, HackerRank, or CodeSignal and be required to write optimized and efficient code.
            </p>
            <p className="text-gray-600 leading-relaxed">
            The Practice Round helps candidates familiarize themselves with the test environment before the actual assessment. It includes sample questions similar to the main test, ensuring that participants understand the interface, constraints, and time management strategies. Practicing beforehand improves confidence and performance in the real test.
            </p>
            <p className="text-gray-600 leading-relaxed">
            🔗 Start Practicing Here: <Link to={"http://localhost:5175/"} target="_blank" style={{ color: "blue" }}> Code practise Practice Problems </Link>
            </p>
          </div>
          <div className="relative h-[300px] w-full max-w-[600px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src= {Video}
              title="Owner Name - Founder of Karma Dude"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-12 w-full max-w-5xl">
          <div className="flex flex-wrap gap-4 mb-6 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg cursor-pointer whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 w-full max-w-5xl">
          {filteredTechnologies.map((tech) => (
            <div key={tech.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">{tech.name}</h2>
                  <i className={`fab ${tech.icon} text-3xl`}></i>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-sm opacity-80">Popularity: {tech.popularity}%</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm opacity-80">Difficulty: {tech.difficulty}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{tech.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium">{tech.yearCreated}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Creator</p>
                    <p className="font-medium">{tech.creator}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Jobs Available</p>
                    <p className="font-medium">{tech.jobsAvailable.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg. Salary</p>
                    <p className="font-medium">{tech.averageSalary}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Top Frameworks/Libraries</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.topFrameworks.map((framework, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs"
                      >
                        {framework}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => window.open(`#${tech.id}-details`, "_self")}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors whitespace-nowrap"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Details Section */}
        <div className="mb-12 w-full max-w-5xl">
          {filteredTechnologies.map((tech) => (
            <div
              id={`${tech.id}-details`}
              key={`${tech.id}-details`}
              className="bg-white rounded-lg shadow-sm p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
                  <i className={`fab ${tech.icon} text-indigo-600 mr-4 text-4xl`}></i>
                  {tech.name} Details
                </h2>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full">
                  {categories.find((cat) => cat.id === tech.category)?.name}
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Overview</h3>
                  <p className="text-gray-600 mb-6">{tech.description}</p>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-medium text-lg">{tech.yearCreated}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Creator</p>
                      <p className="font-medium text-lg">{tech.creator}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Jobs Available</p>
                      <p className="font-medium text-lg">{tech.jobsAvailable.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Avg. Salary</p>
                      <p className="font-medium text-lg">{tech.averageSalary}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">GitHub Repositories</p>
                      <p className="font-medium text-lg">{tech.githubRepos}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Difficulty Level</p>
                      <p className="font-medium text-lg capitalize">{tech.difficulty}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Top Frameworks & Libraries</h3>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {tech.topFrameworks.map((framework, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full"
                      >
                        {framework}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Learning Resources</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {tech.learningResources.map((resource, index) => (
                      <li key={index} className="mb-2">{resource}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Popularity Metrics</h3>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Overall Popularity</span>
                      <span className="font-medium">{tech.popularity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${tech.popularity}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-4 text-gray-700">Job Market Comparison</h4>
                      <div className="flex items-center justify-center">
                        <div className="w-1/3 text-center">
                          <div className="text-3xl font-bold text-indigo-600">
                            {tech.jobsAvailable.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">Jobs Available</div>
                        </div>
                        <div className="w-1/3 text-center">
                          <div className="text-3xl font-bold text-indigo-600">{tech.averageSalary}</div>
                          <div className="text-sm text-gray-500">Avg. Salary</div>
                        </div>
                        <div className="w-1/3 text-center">
                          <div className="text-3xl font-bold text-indigo-600">{tech.githubRepos}</div>
                          <div className="text-sm text-gray-500">GitHub Repos</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-4 text-gray-700">Industry Adoption</h4>
                      <div className="flex flex-col space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-500">Startups</span>
                            <span className="text-sm text-gray-500">85%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-green-500 h-1.5 rounded-full"
                              style={{ width: "85%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-500">Enterprise</span>
                            <span className="text-sm text-gray-500">72%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-500 h-1.5 rounded-full"
                              style={{ width: "72%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-500">Education</span>
                            <span className="text-sm text-gray-500">68%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-purple-500 h-1.5 rounded-full"
                              style={{ width: "68%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors whitespace-nowrap mt-4">
                    <i className="fas fa-graduation-cap mr-2"></i> Start Learning {tech.name}
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6 text-center">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center justify-center"
                >
                  <i className="fas fa-arrow-up mr-2"></i> Back to Top
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Data Visualization Section */}
        <div className="mb-12 w-full max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Technology Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Technology Popularity</h3>
              <div ref={popularityChartRef} style={{ height: "400px" }}></div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Popularity Trends (2019-2025)</h3>
              <div ref={trendsChartRef} style={{ height: "400px" }}></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Job Market Distribution</h3>
            <div ref={jobsChartRef} style={{ height: "400px" }}></div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-12 w-full max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-book text-indigo-600 text-2xl mr-4"></i>
                <h3 className="text-xl font-semibold">Documentation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Official documentation and reference guides for all major programming languages and frameworks.
              </p>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors whitespace-nowrap">
                Browse Documentation
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-video text-indigo-600 text-2xl mr-4"></i>
                <h3 className="text-xl font-semibold">Video Tutorials</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Comprehensive video courses and tutorials for beginners to advanced developers.
              </p>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors whitespace-nowrap">
                Watch Tutorials
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-code text-indigo-600 text-2xl mr-4"></i>
                <h3 className="text-xl font-semibold">Practice Projects</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Hands-on projects and exercises to improve your coding skills and build your portfolio.
              </p>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors whitespace-nowrap">
                Start Coding
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-white w-full max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Technology Trends</h2>
            <p className="text-lg mb-6">
              Subscribe to our newsletter to receive the latest updates on programming languages, frameworks, and industry trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-white text-gray-700"
              />
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 w-full">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-4">TechStack</h3>
              <p className="text-gray-400">
                Comprehensive data and insights on programming languages and technologies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-center md:text-left">Categories</h4>
              <ul className="space-y-2 text-center md:text-left">
                <li><a href="#" className="text-gray-400 hover:text-white">Frontend</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Backend</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Mobile</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Database</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">DevOps</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-center md:text-left">Resources</h4>
              <ul className="space-y-2 text-center md:text-left">
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-center md:text-left">Connect</h4>
              <div className="flex space-x-4 mb-4 justify-center md:justify-start">
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter text-xl"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-github text-xl"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin text-xl"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-youtube text-xl"></i></a>
              </div>
              <p className="text-gray-400 text-center md:text-left">© 2025 TechStack. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Careerpage;