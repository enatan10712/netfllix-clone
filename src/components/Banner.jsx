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

  if (loading) return <SkeletonBanner />;
  if (!movie) return null;

  return (
    <header className="relative h-[80vh] md:h-[95vh] text-white overflow-hidden bg-black">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <motion.img
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title || movie?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent opacity-60" />
      </motion.div>

      <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-12 space-y-6 max-w-3xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>
        </motion.div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-base md:text-xl text-gray-100 line-clamp-3 md:line-clamp-4 leading-relaxed max-w-2xl drop-shadow-md"
        >
          {movie?.overview}
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex items-center space-x-4 pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#e6e6e6" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-3 bg-white text-black px-8 py-3 rounded-md font-bold text-lg shadow-lg"
          >
            <Play fill="black" size={28} />
            <span>Play</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(107, 114, 128, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-3 bg-gray-500/50 text-white px-8 py-3 rounded-md font-bold text-lg backdrop-blur-md shadow-lg"
          >
            <Info size={28} />
            <span>More Info</span>
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-netflix-black to-transparent z-10" />

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
