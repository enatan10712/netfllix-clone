import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import { motion, AnimatePresence } from 'framer-motion';

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
    <nav className={`fixed top-0 w-full z-[80] transition-all duration-500 ${isScrolled ? 'bg-[#141414] py-3 shadow-2xl' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent py-5'}`}>
      <div className="flex items-center justify-between px-4 md:px-12">
        <div className="flex items-center space-x-10">
          <Link to="/">
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix"
              className="h-6 md:h-8"
            />
          </Link>
          <ul className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`text-sm transition duration-300 hover:text-white ${location.pathname === link.path ? 'font-bold text-white' : 'font-light text-gray-300'}`}
                >
                  {link.name}
                </Link>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-netflix-red"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-6">
          <SearchBar />
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Profile"
                className="h-8 w-8 rounded"
              />
              <motion.div
                animate={{ rotate: 0 }}
                className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white group-hover:rotate-180 transition-transform duration-300"
              />
            </motion.div>

            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                whileHover={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute right-0 mt-2 w-56 bg-black/95 border border-gray-800 hidden group-hover:block rounded-sm shadow-2xl overflow-hidden backdrop-blur-xl"
              >
                 <Link to="/profiles" className="flex items-center space-x-3 px-4 py-3 text-sm hover:bg-white/10 transition group/item">
                    <img src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" className="w-8 h-8 rounded" alt="avatar" />
                    <span className="group-hover/item:underline">User 2</span>
                 </Link>
                 <Link to="/profiles" className="block px-4 py-3 text-sm hover:bg-white/10 transition border-t border-gray-800">Manage Profiles</Link>
                 <div className="h-[1px] bg-gray-800 mx-2" />
                 <button
                   onClick={handleLogout}
                   className="w-full text-left px-4 py-4 text-sm hover:bg-white/10 transition font-bold"
                 >
                   Sign out of Netflix
                 </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
