import React, { useState, useEffect } from 'react';
import tmdb, { requests } from '../services/tmdb';
import Modal from './Modal';
import { Play, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonBanner } from './Skeletons';

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannerMovie = async () => {
      try {
        const response = await tmdb.get(requests.getTrending);
        const movies = response.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerMovie();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  if (loading) return <SkeletonBanner />;
  if (!movie) return null;

  return (
    <header
      className="relative h-[448px] md:h-[600px] text-white overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title || movie?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-12 space-y-4 max-w-2xl">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold"
        >
          {movie?.title || movie?.name || movie?.original_name}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm md:text-lg text-gray-200 line-clamp-3 md:line-clamp-4 leading-relaxed"
        >
          {movie?.overview}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center space-x-3"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-white text-black px-6 py-2.5 rounded hover:bg-gray-200 font-bold transition duration-300"
          >
            <Play fill="currentColor" size={24} />
            <span>Play</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-gray-500/50 text-white px-6 py-2.5 rounded hover:bg-gray-500/40 font-bold transition duration-300 backdrop-blur-md"
          >
            <Info size={24} />
            <span>More Info</span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            movie={movie}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Banner;
