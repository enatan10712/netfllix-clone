import React, { useState } from 'react';
import Modal from './Modal';
import { motion, AnimatePresence } from 'framer-motion';

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  if (!movie?.poster_path && !movie?.backdrop_path) return null;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="relative min-w-[160px] h-[240px] md:min-w-[200px] md:h-[300px] cursor-pointer rounded-sm overflow-hidden shadow-lg"
      >
        <img
          src={`${posterBaseUrl}${movie.poster_path || movie.backdrop_path}`}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <p className="text-white text-sm font-bold truncate w-full">{movie.title || movie.name}</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            movie={movie}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MovieCard;
