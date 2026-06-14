import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Titles, people, genres"
        className="bg-black/60 border border-white/40 text-white px-3 py-1 outline-none focus:border-white transition-all duration-300 w-32 sm:w-64"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
