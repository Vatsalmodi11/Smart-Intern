
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

interface Post {
  _id: string;
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
    <div className="flex min-h-screen bg-white">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        selectedNav={selectedNav}
        setSelectedNav={setSelectedNav}
      />

      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300 p-6`}>
        {/* Header */}
        <header className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <h3 className="text-lg font-medium text-gray-800">Posts</h3>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </header>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Form Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Post</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                  placeholder="Company Name"
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500 text-gray-700"
                  required
                />
              </div>

              <div>
                <input
                  type="file"
                  id="companyProfile"
                  accept=".pdf,.doc,.docx,.txt,image/*"
                  onChange={(e) => handleFileChange(e, setCompanyProfile, setCompanyProfilePreview)}
                  className="w-full p-2 border-b border-gray-300 text-gray-700"
                />
                {companyProfilePreview && (
                  <p className="text-gray-500 text-sm mt-1">File uploaded</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500 text-gray-700"
                  required
                />
              </div>

              <div>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  placeholder="Description"
                  rows={3}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500 text-gray-700 resize-none"
                  required
                />
              </div>

              <div>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setImage, setPreview)}
                  className="w-full p-2 border-b border-gray-300 text-gray-700"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-4 w-full max-h-48 object-contain"
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-gray-900 transition-colors"
              >
                Post
              </button>
            </form>
          </section>

          {/* Posts Section */}
          <section className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-gray-500 text-center">No posts yet</p>
            ) : (
              posts.map((post) => (
                <article key={post._id} className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{post.companyName}</p>
                  <p className="text-gray-600 text-sm mb-1">
                    {post.companyProfile ? (
                      <a
                        href={post.companyProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 underline hover:text-gray-900"
                      >
                        View Profile
                      </a>
                    ) : (
                      'No profile'
                    )}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">{post.description}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full max-h-40 object-contain"
                    />
                  )}
                </article>
              ))
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostUpload;