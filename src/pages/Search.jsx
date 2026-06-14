import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import tmdb, { requests } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        try {
          const response = await tmdb.get(requests.searchMulti(query));
          setResults(response.data.results);
        } catch (error) {
          console.error("Error searching:", error);
        }
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="pt-24 md:pt-32 px-4 md:px-12 pb-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Results for: <span className="text-gray-400">"{query}"</span>
      </h1>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No results found for your search.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
