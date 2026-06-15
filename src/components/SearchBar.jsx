import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="flex items-center">
      <AnimatePresence>
        {isExpanded ? (
          <motion.form
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            onSubmit={handleSearch}
            className="flex items-center bg-black/80 border border-white/40 px-2 py-1"
          >
            <Search size={20} className="text-gray-400 mr-2" />
            <input
              autoFocus
              type="text"
              placeholder="Titles, people, genres"
              className="bg-transparent text-white text-sm outline-none w-32 sm:w-64"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => !query && setIsExpanded(false)}
            />
            <X
              size={18}
              className="text-gray-400 cursor-pointer hover:text-white"
              onClick={() => { setIsExpanded(false); setQuery(''); }}
            />
          </motion.form>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            className="p-2"
          >
            <Search size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
