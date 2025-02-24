'use client';

import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '../../../components/footer';

const BlogDetail: React.FC = () => {
  const { documentId } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (documentId) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`https://blogsite-h50s.onrender.com/api/blogs/${documentId}?populate=*`);
          setBlog(response.data.data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching the blog details.');
          setLoading(false);
          console.error('Error fetching the blog details:', err);
        }
      };
      fetchBlog();
    }
  }, [documentId]);

  // Memoize blog title and content to avoid unnecessary recalculations
  const blogTitle = useMemo(() => blog?.title, [blog]);
  const blogDescription = useMemo(() => blog?.blog_description?.blog_description, [blog]);

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
      <main className="container mx-auto px-6 py-8">
        <article className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{blogTitle}</h1>
          <div className="relative">
            <img
              src={`http://localhost:1337${blog.img?.formats.thumbnail?.url}` || 'https://via.placeholder.com/600x400'}
              alt={blogTitle}
              className="w-full h-64 rounded-lg mb-6 object-cover transition-all duration-500 ease-in-out transform hover:scale-110"
              loading="lazy" // Lazy loading for better performance
            />
          </div>
          <p className="text-gray-600 leading-relaxed">{blogDescription}</p>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(BlogDetail); // Memoize the component to prevent unnecessary re-renders
