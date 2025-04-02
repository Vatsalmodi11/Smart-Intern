  import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Sidebar from './Sidebar';

  interface Post {
    _id: string; // Changed from 'id' to '_id'
    companyName: string;
    companyProfile: string | null;
    title: string;
    description: string;
    image: string | null;
  }

  const PostUpload: React.FC = () => {
    const navigate = useNavigate();

    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const [selectedNav, setSelectedNav] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [companyProfile, setCompanyProfile] = useState<File | null>(null);
    const [companyProfilePreview, setCompanyProfilePreview] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/posts');
          if (response.ok) {
            const result = await response.json();
            setPosts(result.data);
          } else {
            setError('Failed to fetch posts');
          }
        } catch (err) {
          setError('Error fetching posts: ' + (err as Error).message);
        }
      };
      fetchPosts();
    }, []);

    const handleFileChange = (
      e: ChangeEvent<HTMLInputElement>,
      setFile: React.Dispatch<React.SetStateAction<File | null>>,
      setPreview: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (companyName.trim() && title.trim() && description.trim()) {
        const formData = new FormData();
        formData.append('companyName', companyName.trim());
        formData.append('title', title.trim());
        formData.append('description', description.trim());
        if (companyProfile) {
          formData.append('companyProfile', companyProfile);
        }
        if (image) {
          formData.append('image', image);
        }

        try {
          const response = await fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const result = await response.json();
            setPosts([result.data, ...posts]);
            setCompanyName('');
            setCompanyProfile(null);
            setCompanyProfilePreview(null);
            setTitle('');
            setDescription('');
            setImage(null);
            setPreview(null);
            setError(null);
          } else {
            const errorData = await response.json();
            setError(errorData.message || 'Failed to create post');
          }
        } catch (err) {
          setError('Error submitting post: ' + (err as Error).message);
        }
      } else {
        setError('Please fill in all required fields');
      }
    };

    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          selectedNav={selectedNav}
          setSelectedNav={setSelectedNav}
        />

        <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white h-16 flex items-center justify-between px-6 shadow-sm">
              <div className="flex items-center flex-1">
                <h3 className="text-blue-500 font-bold text-lg">Smart Intern</h3>
              </div>
            </header>

            <main className="flex-1 p-6">
              <div className="mb-6">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors focus:outline-none"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              </div>

              <div className="max-w-4xl mx-auto space-y-8">
                <section className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-center mb-6">Create a Post</h2>
                  {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="companyName" className="block font-semibold mb-1 text-gray-700">
                        Company Name:
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                        placeholder="Enter company name"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="companyProfile" className="block font-semibold mb-1 text-gray-700">
                        Company Profile (File):
                      </label>
                      <input
                        type="file"
                        id="companyProfile"
                        accept=".pdf,.doc,.docx,.txt,image/*"
                        onChange={(e) => handleFileChange(e, setCompanyProfile, setCompanyProfilePreview)}
                        className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                      />
                      {companyProfilePreview && (
                        <div className="mt-4 text-center">
                          <p className="text-gray-600">Company Profile Preview Available (File Uploaded)</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="title" className="block font-semibold mb-1 text-gray-700">
                        Title:
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block font-semibold mb-1 text-gray-700">
                        Description:
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        placeholder="Enter post description"
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="image" className="block font-semibold mb-1 text-gray-700">
                        Select Image:
                      </label>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setImage, setPreview)}
                        className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                      />
                      {preview && (
                        <div className="mt-4 text-center">
                          <img
                            src={preview}
                            alt="Image Preview"
                            className="max-w-full max-h-[300px] object-contain mx-auto rounded-md"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Post
                    </button>
                  </form>
                </section>

                <section className="space-y-6">
                  {posts.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No posts yet</p>
                  ) : (
                    posts.map((post) => (
                      <article
                        key={post._id} // Changed from 'post.id' to 'post._id'
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                      >
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h3>
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">Company Name:</span> {post.companyName}
                        </p>
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">Company Profile:</span>{' '}
                          {post.companyProfile ? (
                            <a
                              href={post.companyProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View Uploaded File
                            </a>
                          ) : (
                            'No file uploaded'
                          )}
                        </p>
                        <p className="text-gray-600 mb-4">
                          <span className="font-semibold">Description:</span> {post.description}
                        </p>
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="max-w-full h-auto rounded-md"
                          />
                        )}
                      </article>
                    ))
                  )}
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  };

  export default PostUpload;