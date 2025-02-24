'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/footer';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const BlogHomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch blog data from the API
    axios
      .get('https://blogsite-h50s.onrender.com/api/blogs?populate=*')
      .then((response) => {
        setBlogs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the blogs:', error);
        setError('Failed to load blogs. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Nav />

      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
            Welcome to My Blog
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Sharing insights, stories, and ideas to inspire and inform.
          </p>
        </div>
      </header>

      {/* Blog Posts */}
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Latest Posts
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="loader"></div> {/* Implement a loader component or use a spinner here */}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Display only the first 3 blogs */}
            {blogs.slice(0, 3).map((blog) => (
              <article
                key={blog.documentId}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl hover:bg-gray-100"
              >
                <img
                  src={`https://blogsite-h50s.onrender.com/${blog.img?.formats?.thumbnail?.url}` || 'https://via.placeholder.com/600x400'}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-green-500 transition-all duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">{blog.Description}</p>
                  <Link
                    href={`/blog/${blog.documentId}`}
                    className="block mt-4 text-green-500 hover:underline text-sm font-medium transition-all duration-300"
                  >
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default React.memo(BlogHomePage);
