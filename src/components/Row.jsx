import React, { useState, useEffect, useRef } from 'react';
import tmdb from '../services/tmdb';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SkeletonRow } from './Skeletons';

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tmdb.get(fetchUrl);
        setMovies(response.data.results.filter(m => m.poster_path || m.backdrop_path));
      } catch (error) {
        console.error(`Error fetching data for row ${title}:`, error);
      } finally {
        setLoading(false);
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

  if (loading) return <SkeletonRow />;

  return (
    <div className="space-y-2 px-4 md:px-12 my-8 group relative">
      <h2 className="text-lg md:text-2xl font-semibold text-white/90 hover:text-white transition duration-300 cursor-pointer inline-block">
        {title}
      </h2>

      <div className="relative">
        <button
          className="absolute top-0 bottom-0 left-0 z-40 m-auto h-full w-12 cursor-pointer opacity-0 transition group-hover:opacity-100 bg-black/40 hover:bg-black/60 flex items-center justify-center -ml-4 md:-ml-12"
          onClick={() => scroll('left')}
        >
          <ChevronLeft size={40} />
        </button>

        <div
          ref={rowRef}
          className="flex items-center space-x-2.5 overflow-x-scroll no-scrollbar md:space-x-4 py-2"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          className="absolute top-0 bottom-0 right-0 z-40 m-auto h-full w-12 cursor-pointer opacity-0 transition group-hover:opacity-100 bg-black/40 hover:bg-black/60 flex items-center justify-center -mr-4 md:-mr-12"
          onClick={() => scroll('right')}
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default Row;
