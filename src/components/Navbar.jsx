import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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
    <>
      <nav className={`fixed top-0 w-full z-[80] transition-all duration-500 ${isScrolled ? 'bg-[#141414] py-2 shadow-2xl' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent py-4'}`}>
        <div className="flex items-center justify-between px-4 md:px-12">
          <div className="flex items-center space-x-4 md:space-x-10">
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            <Link to="/">
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix"
                className="h-5 md:h-8"
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

          <div className="flex items-center space-x-3 md:space-x-6">
            <SearchBar />
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                  alt="Profile"
                  className="h-7 w-7 md:h-8 md:w-8 rounded"
                />
                <motion.div
                  className="hidden md:block w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white group-hover:rotate-180 transition-transform duration-300"
                />
              </motion.div>

              {/* Desktop Dropdown */}
              <div className="absolute right-0 mt-2 w-56 bg-black/95 border border-gray-800 hidden md:group-hover:block rounded-sm shadow-2xl overflow-hidden backdrop-blur-xl">
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
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 bottom-0 left-0 w-3/4 max-w-sm bg-netflix-black shadow-2xl flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                  alt="Netflix"
                  className="h-6"
                />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={28} />
                </button>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-md mb-8">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" className="w-12 h-12 rounded" alt="avatar" />
                 <div>
                    <p className="font-bold">User 1</p>
                    <p className="text-xs text-gray-400">Switch Profile</p>
                 </div>
                 <ChevronRight size={20} className="ml-auto text-gray-500" />
              </div>

              <ul className="flex flex-col space-y-6 text-lg font-medium">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`${location.pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-4 border-t border-gray-800 pt-6">
                 <button className="text-gray-400 hover:text-white">Account</button>
                 <button className="text-gray-400 hover:text-white block">Help Center</button>
                 <button
                  onClick={handleLogout}
                  className="text-white font-bold block pt-4"
                >
                  Sign Out of Netflix
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
