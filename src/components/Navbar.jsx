import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!currentUser) return null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'TV Shows', path: '/tv-shows' },
    { name: 'Movies', path: '/movies' },
    { name: 'New & Popular', path: '/latest' },
    { name: 'My List', path: '/my-list' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[80] transition-all duration-500 ${isScrolled ? 'bg-[#141414] py-3' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent py-5'}`}>
      <div className="flex items-center justify-between px-4 md:px-12">
        <div className="flex items-center space-x-10">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix"
              className="h-6 md:h-8"
            />
          </Link>
          <ul className="hidden lg:flex space-x-5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm transition duration-300 hover:text-gray-300 ${location.pathname === link.path ? 'font-bold' : 'font-light text-gray-200'}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-6">
          <SearchBar />
          <div className="relative group">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Profile"
                className="h-8 w-8 rounded"
              />
              <motion.div
                animate={{ rotate: 0 }}
                className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white group-hover:rotate-180 transition-transform duration-300"
              />
            </div>

            <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-gray-800 hidden group-hover:block rounded-sm shadow-2xl overflow-hidden backdrop-blur-md">
               <Link to="/profiles" className="block px-4 py-3 text-sm hover:bg-white/10 transition">Manage Profiles</Link>
               <div className="h-[1px] bg-gray-800 mx-2" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition"
              >
                Sign out of Netflix
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
