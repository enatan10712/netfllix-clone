import React, { useState, useEffect, useRef } from 'react';
import tmdb from '../services/tmdb';
import MovieCard from './MovieCard';

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tmdb.get(fetchUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error(`Error fetching data for row ${title}:`, error);
      }
    };

    fetchData();
  }, [fetchUrl, title]);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0.5 md:space-y-2 px-4 md:px-12 my-8">
      <h2 className="text-sm md:text-2xl font-semibold text-white/90 hover:text-white transition duration-300 cursor-pointer inline-block">
        {title}
      </h2>

      <div className="group relative">
        <button
          className="absolute top-0 bottom-0 left-0 z-40 m-auto h-12 w-12 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125 md:h-16 md:w-16 bg-black/50 rounded-full flex items-center justify-center ml-2"
          onClick={() => scroll('left')}
        >
          <span className="text-2xl">{"<"}</span>
        </button>

        <div
          ref={rowRef}
          className="flex items-center space-x-2.5 overflow-x-scroll no-scrollbar md:space-x-4 md:p-2"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          className="absolute top-0 bottom-0 right-0 z-40 m-auto h-12 w-12 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125 md:h-16 md:w-16 bg-black/50 rounded-full flex items-center justify-center mr-2"
          onClick={() => scroll('right')}
        >
          <span className="text-2xl">{">"}</span>
        </button>
      </div>
    </div>
  );
};

export default Row;
