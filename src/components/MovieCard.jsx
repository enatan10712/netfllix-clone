import React, { useState } from 'react';
import Modal from './Modal';
import { motion, AnimatePresence } from 'framer-motion';

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Responsive image sizes for optimization
  const posterBaseUrl = window.innerWidth < 768
    ? "https://image.tmdb.org/t/p/w342"
    : "https://image.tmdb.org/t/p/w500";

  if (!movie?.poster_path && !movie?.backdrop_path) return null;

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{
          scale: 1.08,
          zIndex: 50,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        onClick={() => setIsModalOpen(true)}
        className="relative min-w-[140px] h-[210px] sm:min-w-[160px] sm:h-[240px] md:min-w-[200px] md:h-[300px] cursor-pointer rounded-md overflow-hidden shadow-2xl bg-gray-900 group"
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
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3 md:p-4"
        >
           <p className="text-white text-xs md:text-sm font-bold truncate w-full mb-1">{movie.title || movie.name}</p>
           <div className="flex items-center space-x-2 text-[8px] md:text-[10px] text-green-400 font-black">
              <span>{Math.round(movie.vote_average * 10)}% Match</span>
              <span className="text-white border border-white/50 px-1 rounded-sm uppercase">HD</span>
           </div>
        </motion.div>
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
