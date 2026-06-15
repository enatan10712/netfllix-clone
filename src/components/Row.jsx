import React, { useState, useEffect, useRef } from 'react';
import tmdb from '../services/tmdb';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SkeletonRow } from './Skeletons';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  if (loading) return <SkeletonRow />;

  return (
    <div className="space-y-4 px-4 md:px-12 my-10 group relative">
      <motion.h2
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-xl md:text-3xl font-bold text-white/90 hover:text-white transition duration-300 cursor-pointer inline-block"
      >
        {title}
      </motion.h2>

      <div className="relative">
        <button
          className="absolute top-0 bottom-0 left-0 z-40 m-auto h-full w-12 cursor-pointer opacity-0 transition group-hover:opacity-100 bg-black/60 hover:bg-black/80 flex items-center justify-center -ml-4 md:-ml-12 backdrop-blur-sm"
          onClick={() => scroll('left')}
        >
          <ChevronLeft size={48} />
        </button>

        <motion.div
          ref={rowRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center space-x-3 md:space-x-5 overflow-x-scroll no-scrollbar py-4"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </motion.div>

        <button
          className="absolute top-0 bottom-0 right-0 z-40 m-auto h-full w-12 cursor-pointer opacity-0 transition group-hover:opacity-100 bg-black/60 hover:bg-black/80 flex items-center justify-center -mr-4 md:-mr-12 backdrop-blur-sm"
          onClick={() => scroll('right')}
        >
          <ChevronRight size={48} />
        </button>
      </div>
    </div>
  );
};

export default Row;
