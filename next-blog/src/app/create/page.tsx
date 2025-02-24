'use client'; 

import { useState, useCallback } from 'react';
import axios from 'axios';
import Nav from '@/components/Nav';
import Footer from '@/components/footer';
import { useRouter } from 'next/navigation';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [blogData, setBlogData] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter(); // Use Next.js router for navigation

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    // Client-side validation
    if (!title || !Description || !blogData) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('data[title]', title);
    formData.append('data[Slug]', title);  // Assuming the Slug is same as title, you can modify as needed
    formData.append('data[Description]', Description);
    
    // Setting the blog description structure correctly
    formData.append('data[blog_description][title]', title);  // Using title for the blog description title
    formData.append('data[blog_description][blog_description]', blogData);
     console.log(formData);
     console.log(blogData);
    // If an image is selected, append it to the form data
    if (image) {
      formData.append('files', image);
    }

    try {
      const response = await axios.post('https://blogsite-h50s.onrender.com/api/blogs', formData, {
        headers: {
          // Axios automatically handles Content-Type for FormData
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Blog created successfully!');
        setTitle('');
        setDescription('');
        setBlogData('');
        setImage(null); // Clear image after successful upload

        // Redirect to /blogs page after successful creation
        router.push('/blogs');
      }
    } catch (error: any) {
      // Check if the error has a response object from Axios
      if (error.response) {
        console.error('Error creating blog:', error.response.data);

        if (error.response.data?.error?.details?.errors) {
          const errorMessages = error.response.data.error.details.errors.map((err: any) => err.message).join(' ');
          setError(errorMessages || 'An error occurred while creating the blog.');
        } else {
          setError(error.response?.data?.message || 'An error occurred while creating the blog.');
        }
      } else {
        console.error('Error creating blog:', error);
        setError('An error occurred while creating the blog. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [title, Description, blogData, image, router]);

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <Nav />
      <div className="p-8 pb-16 bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create a New Blog Post</h1>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black"
              rows={4}
              placeholder="Enter a short description"
              required
            />
          </div>

          {/* Blog Content */}
          <div className="flex flex-col">
            <label htmlFor="blogData" className="text-lg font-semibold text-gray-700 mb-2">Blog Content</label>
            <textarea
              id="blogData"
              value={blogData}
              onChange={(e) => setBlogData(e.target.value)}
              className="p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black"
              rows={6}
              placeholder="Write your blog content here"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label htmlFor="image" className="text-lg font-semibold text-gray-700 mb-2">Upload Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className={`w-full ${loading ? 'bg-gray-500' : 'bg-blue-600'} text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Blog'
              )}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateBlog;
