'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Importing the required icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow mt-8">
      <div className="container mx-auto px-6 py-8 text-center">
        {/* Footer Text */}
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          &copy; 2024 My Blog developed by Akshay. All rights reserved.
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          <Link
            href="https://www.facebook.com"
            target="_blank"
            className="group"
          >
            <div className="p-3 rounded-full bg-gray-100 hover:bg-blue-600 transition-all duration-500 transform hover:scale-110">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="text-gray-600 group-hover:text-white text-lg md:text-xl"
              />
            </div>
          </Link>
          <Link
            href="https://www.twitter.com"
            target="_blank"
            className="group"
          >
            <div className="p-3 rounded-full bg-gray-100 hover:bg-blue-400 transition-all duration-500 transform hover:scale-110">
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-gray-600 group-hover:text-white text-lg md:text-xl"
              />
            </div>
          </Link>
          <Link
            href="https://www.linkedin.com"
            target="_blank"
            className="group"
          >
            <div className="p-3 rounded-full bg-gray-100 hover:bg-blue-700 transition-all duration-500 transform hover:scale-110">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="text-gray-600 group-hover:text-white text-lg md:text-xl"
              />
            </div>
          </Link>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            className="group"
          >
            <div className="p-3 rounded-full bg-gray-100 hover:bg-pink-500 transition-all duration-500 transform hover:scale-110">
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-gray-600 group-hover:text-white text-lg md:text-xl"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Subtle animation on hover */}
      <style jsx>{`
        footer:hover {
          background: linear-gradient(to bottom, #f9f9f9, #ffffff);
          transition: background 0.5s ease-in-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
