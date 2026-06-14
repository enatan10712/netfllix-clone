import React, { useState } from 'react';
import Modal from './Modal';

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  if (!movie?.poster_path && !movie?.backdrop_path) return null;

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="relative min-w-[160px] h-[240px] md:min-w-[200px] md:h-[300px] cursor-pointer transition duration-300 transform hover:scale-105 hover:z-10"
      >
        <img
          src={`${posterBaseUrl}${movie.poster_path || movie.backdrop_path}`}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover rounded-sm shadow-md"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
           <p className="text-white text-xs font-bold truncate w-full">{movie.title || movie.name}</p>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          movie={movie}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default MovieCard;
