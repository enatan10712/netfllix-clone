import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-500 ${isScrolled ? 'bg-netflix-black' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 py-4 md:px-12 md:py-6">
        <div className="flex items-center space-x-2 md:space-x-10">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix"
              className="h-5 md:h-8"
            />
          </Link>
          <ul className="hidden md:flex space-x-4">
            <li><Link to="/" className="text-sm font-light hover:text-gray-300 transition duration-300">Home</Link></li>
            <li><Link to="/browse" className="text-sm font-light hover:text-gray-300 transition duration-300">TV Shows</Link></li>
            <li><Link to="/browse" className="text-sm font-light hover:text-gray-300 transition duration-300">Movies</Link></li>
            <li><Link to="/my-list" className="text-sm font-light hover:text-gray-300 transition duration-300">My List</Link></li>
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <SearchBar />
          <div className="relative group">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Profile"
              className="h-8 w-8 rounded cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-32 bg-netflix-black border border-gray-700 hidden group-hover:block rounded shadow-lg overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
