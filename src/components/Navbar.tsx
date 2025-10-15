"use client";

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { NAV_LINKS, LOGO_LINKS, NavItem } from '@/types/constants';

// Define the colors as constants
const PRIMARY_TEAL = '#00918D';
const DARK_TEAL = '#003B3D';

// 1. Set the CSS Variables in the root element (or a parent)
const navStyle = {
    '--primary-teal': PRIMARY_TEAL,
    '--dark-teal': DARK_TEAL,
    fontFamily: '"Hind Siliguri", sans-serif',
} as React.CSSProperties;

const NavLink: React.FC<{ item: NavItem, onClick: () => void }> = ({ item, onClick }) => (
    <Link
        href={item.href}
        onClick={onClick}
        className={`
            text-lg font-medium text-[color:var(--dark-teal)] hover:text-[color:var(--primary-teal)] transition-colors 
            py-2 md:py-0 px-4 w-full md:w-auto text-center
            border-b md:border-b-0 border-gray-100
        `}
    >
        {item.name}
    </Link>
);

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
    const closeMenu = useCallback(() => setIsOpen(false), []);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md" style={navStyle}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                {/* LOGOS / TITLE Section - Left Side */}
                <div className="flex items-center space-x-4 lg:space-x-8 h-full">
                    {/* Logo 1: 'সমন্বিত শিক্ষা জোট' */}
                    <Link href="/" className="flex items-center">
                        <div className='relative w-12 h-12 md:w-16 md:h-16'>
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

                    {/* Logo 2: 'জাকসু নির্বাচন ২০২৫' (Using Primary Teal) */}
                    <Link href="/" className="hidden md:block">
                        {/* Reference using text-[color:var(--primary-teal)] */}
                        <h1 className="text-xl lg:text-2xl font-bold text-[color:var(--primary-teal)]">
                            জাকসু নির্বাচন ২০২৫
                        </h1>
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
                    {NAV_LINKS.map((item) => (
                        <NavLink key={item.id} item={item} onClick={closeMenu} />
                    ))}
                </div>

                {/* Mobile Menu Button (Using Dark Teal) */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle navigation menu"
                        // Reference using text-[color:var(--dark-teal)]
                        className="p-2 text-[color:var(--dark-teal)] hover:text-[color:var(--primary-teal)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-teal)] rounded-md"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* --- Mobile Sidebar Navigation --- */}
            <div
                className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden 
                ${isOpen ? 'translate-x-0' : 'translate-x-full hidden'}`
                }
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={closeMenu}
                />

                {/* Sidebar Panel */}
                <div className="relative ml-auto h-full w-64 max-w-xs bg-white shadow-xl flex flex-col p-4">

                    {/* Close Button (Using Dark Teal) */}
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={closeMenu}
                            aria-label="Close navigation menu"
                            // Reference using text-[color:var(--dark-teal)]
                            className="p-2 text-[color:var(--dark-teal)] hover:text-[color:var(--primary-teal)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-teal)] rounded-md"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Mobile Links (Uses the NavLink component which is already fixed) */}
                    <div className="flex flex-col space-y-2">
                        {NAV_LINKS.map((item) => (
                            <NavLink key={item.id} item={item} onClick={closeMenu} />
                        ))}
                    </div>

                    {/* Election Title for Mobile (Using Primary Teal) */}
                    <div className="mt-8 pt-4 border-t border-gray-100">
                        <Link href="/" onClick={closeMenu}>
                            {/* Reference using text-[color:var(--primary-teal)] */}
                            <h1 className="text-lg font-bold text-[color:var(--primary-teal)]">
                                জাকসু নির্বাচন ২০২৫
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;