'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const Nav: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-300 shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-all duration-300 cursor-pointer">
            <Link href="/">Blogs</Link>
          </div>

          {/* Menu (Desktop) */}
          <ul className="hidden md:flex space-x-10">
            <li>
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-500 transition-all duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-blue-500 transition-all duration-300"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/create"
                className="text-gray-600 hover:text-blue-500 transition-all duration-300"
              >
                Create
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div
            className="md:hidden text-gray-600 hover:text-blue-500 cursor-pointer"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18v2H3V6zm0 6h18v2H3v-2zm0 6h18v2H3v-2z" />
            </svg>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Toggle Visibility) */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-gray-300 p-4`}
      >
        <ul className="space-y-4">
          <li>
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-500 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu after click
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-blue-500 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu after click
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/create"
              className="text-gray-600 hover:text-blue-500 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu after click
            >
              Create
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
