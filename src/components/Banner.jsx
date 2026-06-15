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
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title || movie?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-60" />
      </motion.div>

      <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-12 space-y-4 md:space-y-6 max-w-3xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight drop-shadow-2xl leading-[1.1]">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>
        </motion.div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-sm md:text-xl text-gray-200 line-clamp-3 md:line-clamp-4 leading-relaxed max-w-2xl drop-shadow-md font-light"
        >
          {movie?.overview}
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-row items-center space-x-3 md:space-x-4 pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 md:space-x-3 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-md font-bold text-base md:text-lg shadow-lg transition-colors"
          >
            <Play fill="black" size={24} className="md:w-7 md:h-7" />
            <span>Play</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(107, 114, 128, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 md:space-x-3 bg-gray-500/50 text-white px-6 md:px-8 py-2 md:py-3 rounded-md font-bold text-base md:text-lg backdrop-blur-md shadow-lg transition-colors"
          >
            <Info size={24} className="md:w-7 md:h-7" />
            <span>More Info</span>
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#141414] to-transparent z-10" />

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
