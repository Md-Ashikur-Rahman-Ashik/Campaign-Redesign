// Navbar.tsx
"use client";

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Icons for the Hamburger and Close button
import Image from 'next/image';
// import { NAV_LINKS, LOGO_LINKS, NavItem } from './constants'; // Import Nav Data
import { NAV_LINKS, LOGO_LINKS, NavItem } from '@/types/constants';

// --- Performance and Best Practices ---
// 1. Time/Space Complexity: O(N) where N is the number of links, mainly for rendering the map, which is efficient.
// 2. State Management: Uses local state (useState) for simple UI logic (menu open/close).
// 3. Accessibility: Uses <button> for controls and ARIA attributes for screen readers.
// 4. Clean Code: Separates data (constants.ts) from presentation (Navbar.tsx).

const NavLink: React.FC<{ item: NavItem, onClick: () => void }> = ({ item, onClick }) => (
  <Link 
    href={item.href}
    onClick={onClick}
    className="
      text-lg font-medium text-dark-teal hover:text-primary-teal transition-colors 
      py-2 md:py-0 px-4 w-full md:w-auto text-center
      border-b md:border-b-0 border-gray-100
    "
    // Use the primary-teal for hover state, extracted visually
  >
    {item.name}
  </Link>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Use useCallback for handler functions for performance and stability
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGOS / TITLE Section - Left Side */}
        <div className="flex items-center space-x-4 lg:space-x-8 h-full">
          {/* Logo 1: 'সমন্বিত শিক্ষা জোট' (Jaksue Logo) */}
          <Link href="/" className="flex items-center">
            <div className='relative w-12 h-12 md:w-16 md:h-16'>
              {/* NOTE: You will need to adjust the priority and size props based on your actual logo image */}
              <Image 
                src={LOGO_LINKS.jaksue} 
                alt="সমন্বিত শিক্ষা জোট লোগো" 
                fill 
                className="object-contain" 
                sizes="(max-width: 768px) 48px, 64px"
                priority
              />
            </div>
          </Link>

          {/* Logo 2: 'জাকসু নির্বাচন ২০২১' (Election Title) */}
          <Link href="/" className="hidden md:block">
            <h1 className="text-xl lg:text-2xl font-bold text-primary-teal">
              জাকসু নির্বাচন ২০২১
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation Links - Centered/Right */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
          {NAV_LINKS.map((item) => (
            <NavLink key={item.id} item={item} onClick={closeMenu} />
          ))}
        </div>

        {/* Mobile Menu Button - Right Side */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            className="p-2 text-dark-teal hover:text-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* --- Mobile Sidebar Navigation --- */}
      <div 
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop (Darkens content) */}
        <div 
          className="absolute inset-0 bg-black/50" 
          onClick={closeMenu}
        />

        {/* Sidebar Panel - Sliding in from the Right */}
        <div className="relative ml-auto h-full w-64 max-w-xs bg-white shadow-xl flex flex-col p-4">
          
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={closeMenu}
              aria-label="Close navigation menu"
              className="p-2 text-dark-teal hover:text-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal rounded-md"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Mobile Links */}
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((item) => (
              <NavLink key={item.id} item={item} onClick={closeMenu} />
            ))}
          </div>

          {/* Election Title for Mobile (since it was hidden in the header) */}
          <div className="mt-8 pt-4 border-t border-gray-100">
             <Link href="/" onClick={closeMenu}>
                <h1 className="text-lg font-bold text-primary-teal">
                    জাকসু নির্বাচন ২০২১
                </h1>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;