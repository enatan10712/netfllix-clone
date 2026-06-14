import React, { useState, useEffect } from 'react';
import tmdb, { requests } from '../services/tmdb';
import Modal from './Modal';

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBannerMovie = async () => {
      try {
        const response = await tmdb.get(requests.getTrending);
        const movies = response.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      }
    };

    fetchBannerMovie();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  if (!movie) return <div className="h-[448px] bg-netflix-black" />;

  return (
    <header
      className="relative h-[448px] md:h-[600px] text-white object-contain"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="flex flex-col justify-center h-full px-4 md:px-12 bg-gradient-to-r from-netflix-black/80 via-netflix-black/20 to-transparent">
        <h1 className="text-3xl md:text-5xl font-extrabold pb-4">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="flex space-x-3 mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black px-5 py-2 md:px-8 md:py-3 rounded hover:bg-white/70 font-bold transition duration-300"
          >
            Play
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-500/50 text-white px-5 py-2 md:px-8 md:py-3 rounded hover:bg-gray-500/30 font-bold transition duration-300"
          >
            More Info
          </button>
        </div>

        <h2 className="w-full md:max-w-md text-sm md:text-base h-20 overflow-hidden leading-relaxed">
          {truncate(movie?.overview, 150)}
        </h2>
      </div>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-netflix-black to-transparent" />

      {isModalOpen && (
        <Modal
          movie={movie}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </header>
  );
};

export default Banner;
