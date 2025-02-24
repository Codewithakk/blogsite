'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Nav from '@/components/Nav';
import Link from 'next/link';
import Footer from '@/components/footer';

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentBlog, setCurrentBlog] = useState<any>(null); // Store current blog for editing

  // Fetching the blog data
  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get('https://blogsite-h50s.onrender.com/api/blogs?populate=*');
      setBlogs(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching blogs.');
      setLoading(false);
      console.error('Error fetching blogs:', err);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const deleteBlog = async (documentId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:1337/api/blogs/${documentId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.documentId !== documentId)); // Optimized state update
      alert('Blog deleted successfully!');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog');
    }
  };

  // Open Edit Modal with blog data
  const openEditModal = (blog: any) => {
    setCurrentBlog(blog);
    setIsModalOpen(true);
  };

  // Close Edit Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBlog(null);
  };

  // Handle changes in the modal form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentBlog({ ...currentBlog, [e.target.name]: e.target.value });
  };

  // Submit the edited blog data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Log the data being submitted to check its structure
      console.log('Submitting blog data:', {
        title: currentBlog?.title,
        Description: currentBlog?.Description,
        blog_description: currentBlog?.blog_description?.blog_description, // Ensure this is a string
      });

      // Send the PUT request
      await axios.put(`http://localhost:1337/api/blogs/${currentBlog?.documentId}`, {
        data: {
          title: currentBlog?.title,
          Description: currentBlog?.Description,
          blog_description: currentBlog?.blog_description?.blog_description, // Send the blog_description directly as a string
        },
      });

      // Update the state after successful submission
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.documentId === currentBlog?.documentId ? { ...blog, ...currentBlog } : blog  
        )
      );

      closeModal();
      alert('Blog updated successfully!');
    } catch (error) {
      setError('Error updating blog.');
      console.error('Error updating blog:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <p className="text-gray-600">Insights, stories, and ideas</p>
        </div>
      </header>

      {/* Blog Posts */}
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src={`http://localhost:1337${blog.img?.formats?.thumbnail?.url}` || 'https://via.placeholder.com/600x400'}
                alt={blog.title}
                className="w-full h-48 object-cover transition-all duration-500 ease-in-out transform hover:scale-110"
                loading="lazy" // Lazy loading for better performance
              />
              <div className="p-6">
                <h2 className="text-lg font-semibold text-black hover:text-blue-500 transition-all duration-300">
                  {blog.title}
                </h2>
                <p className="text-sm text-black mt-2">{blog.Description}</p>
                <Link
                  href={`/blog/${blog.documentId}`}
                  className="block mt-4 text-blue-500 hover:underline text-sm font-medium transition-all duration-300"
                >
                  Read more
                </Link>

                {/* Edit and Delete Buttons */}
                <div className="mt-4 flex justify-between space-x-4">
                  <button
                    onClick={() => openEditModal(blog)} // Open the modal for editing
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBlog(blog.documentId)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Full-Screen Edit Modal */}
      {isModalOpen && currentBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-black mb-4">Edit Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-black font-bold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentBlog.title || ''} // Ensure it's not null
                  onChange={handleChange}
                  className="w-full p-4 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-black font-bold">Description</label>
                <textarea
                  name="Description"
                  value={currentBlog?.Description || ''} // Ensure it's not null
                  onChange={handleChange}
                  className="w-full p-4 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-black font-bold">Content</label>
                <textarea
  name="blog_description"
  value={currentBlog?.blog_description   || ''} // Access blog_description directly (ensure it’s a string)
  onChange={handleChange}
  className="w-full p-4 border rounded text-black"
/>

              </div>

              <div className="flex justify-between">
                <button type="button" onClick={closeModal} className="bg-gray-500 text-white p-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default React.memo(BlogPage); // Memoizing the component to avoid unnecessary re-renders
