import React, { useState, useEffect } from 'react';
import tmdb, { requests } from '../services/tmdb';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { X, Play, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Modal = ({ movie, isOpen, onClose }) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isInList, setIsInList] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (isOpen && movie) {
      const fetchTrailer = async () => {
        try {
          const type = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
          const response = await tmdb.get(requests.getVideos(movie.id, type));
          const trailer = response.data.results.find(
            (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
          );
          if (trailer) {
            setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`);
          }
        } catch (error) {
          console.error("Error fetching trailer:", error);
        }
      };

      const checkMyList = async () => {
        if (!currentUser) return;
        const movieDoc = doc(db, 'users', currentUser.uid, 'myList', movie.id.toString());
        const docSnap = await getDoc(movieDoc);
        setIsInList(docSnap.exists());
      };

      fetchTrailer();
      checkMyList();
    }
  }, [isOpen, movie, currentUser]);

  const handleMyList = async () => {
    if (!currentUser) return;
    const movieDoc = doc(db, 'users', currentUser.uid, 'myList', movie.id.toString());

    try {
      if (isInList) {
        await deleteDoc(movieDoc);
        setIsInList(false);
      } else {
        await setDoc(movieDoc, movie);
        setIsInList(true);
      }
    } catch (error) {
      console.error("Error updating My List:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative bg-[#181818] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl no-scrollbar"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-black/60 rounded-full hover:bg-white/20 transition duration-300"
        >
          <X size={24} />
        </button>

        <div className="relative pt-[56.25%] bg-black">
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Movie Trailer"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}`}
                alt={movie?.title}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
            </div>
          )}
          <div className="absolute bottom-10 left-10 space-x-4 flex">
              <button className="flex items-center space-x-2 bg-white text-black px-8 py-2 rounded font-bold hover:bg-gray-200 transition">
                  <Play fill="black" size={24} />
                  <span>Play</span>
              </button>
              <button
                onClick={handleMyList}
                className="p-2 border-2 border-gray-400 rounded-full hover:border-white transition group"
              >
                  {isInList ? <Check size={24} className="text-white" /> : <Plus size={24} className="text-white" />}
              </button>
          </div>
        </div>

        <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3 text-sm font-semibold">
              <span className="text-green-400">{Math.round(movie?.vote_average * 10)}% Match</span>
              <span>{movie?.release_date?.split('-')[0] || movie?.first_air_date?.split('-')[0]}</span>
              <span className="border px-1.5 py-0.5 rounded text-xs border-gray-500">HD</span>
            </div>

            <h2 className="text-3xl font-bold">
              {movie?.title || movie?.name || movie?.original_name}
            </h2>

            <p className="text-lg leading-relaxed text-gray-300">
              {movie?.overview}
            </p>
          </div>

          <div className="space-y-4 text-sm">
             {movie?.genre_ids && (
               <p><span className="text-gray-500">Genres:</span> <span className="text-gray-300">Action, Adventure, Sci-Fi</span></p>
             )}
             <p><span className="text-gray-500">Rating:</span> <span className="text-gray-300">{movie?.vote_average} / 10</span></p>
             <p><span className="text-gray-500">Language:</span> <span className="text-gray-300 uppercase">{movie?.original_language}</span></p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
