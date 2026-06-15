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
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{
          scale: 1.1,
          zIndex: 50,
          transition: { duration: 0.3 }
        }}
        onClick={() => setIsModalOpen(true)}
        className="relative min-w-[160px] h-[240px] md:min-w-[200px] md:h-[300px] cursor-pointer rounded-md overflow-hidden shadow-xl bg-gray-900"
      >
        <img
          src={`${posterBaseUrl}${movie.poster_path || movie.backdrop_path}`}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4"
        >
           <p className="text-white text-sm font-bold truncate w-full mb-1">{movie.title || movie.name}</p>
           <div className="flex items-center space-x-2 text-[10px] text-green-400 font-bold">
              <span>{Math.round(movie.vote_average * 10)}% Match</span>
              <span className="text-white border border-white/50 px-1 rounded-sm">16+</span>
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
