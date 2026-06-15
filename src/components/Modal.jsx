import React, { useState, useEffect } from 'react';
import tmdb, { requests } from '../services/tmdb';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { X, Play, Plus, Check, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const Modal = ({ movie, isOpen, onClose }) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isInList, setIsInList] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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
            setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1`);
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
  }, [isOpen, movie, currentUser, isMuted]);

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 100, opacity: 0 }}
        animate={{
          scale: 1,
          y: 0,
          opacity: 1,
          transition: { type: "spring", damping: 25, stiffness: 300 }
        }}
        exit={{ scale: 0.9, y: 100, opacity: 0 }}
        className="relative bg-[#181818] w-full h-full md:h-auto md:max-w-5xl md:max-h-[95vh] overflow-y-auto md:rounded-xl shadow-2xl no-scrollbar overflow-x-hidden"
      >
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-black/60 rounded-full text-white transition duration-300"
        >
          <X size={24} />
        </motion.button>

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
            <div className="absolute inset-0">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}`}
                alt={movie?.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex items-center justify-between z-20">
            <div className="flex items-center space-x-2 md:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-white text-black px-6 md:px-10 py-2 md:py-3 rounded-md font-bold text-lg md:text-xl hover:bg-gray-200 transition"
              >
                  <Play fill="black" size={24} className="md:w-7 md:h-7" />
                  <span>Play</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, borderColor: "white" }}
                whileTap={{ scale: 0.9 }}
                onClick={handleMyList}
                className="p-2 md:p-3 border-2 border-gray-500 rounded-full transition group/btn"
              >
                  {isInList ? <Check size={20} className="md:w-7 md:h-7 text-white" /> : <Plus size={20} className="md:w-7 md:h-7 text-white" />}
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 md:p-3 border-2 border-gray-500 rounded-full hover:border-white transition"
            >
              {isMuted ? <VolumeX size={20} className="md:w-7 md:h-7" /> : <Volume2 size={20} className="md:w-7 md:h-7" />}
            </motion.button>
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
        </div>

        <div className="p-6 md:p-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          <div className="md:col-span-3 space-y-4 md:space-y-8">
            <div className="flex items-center space-x-3 md:space-x-4 text-sm md:text-lg font-semibold">
              <span className="text-green-400 font-black">{Math.round(movie?.vote_average * 10)}% Match</span>
              <span className="text-gray-400">{movie?.release_date?.split('-')[0] || movie?.first_air_date?.split('-')[0]}</span>
              <span className="border px-1.5 py-0.5 rounded text-[10px] md:text-xs border-gray-600 text-gray-400 uppercase">HD</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
              {movie?.title || movie?.name || movie?.original_name}
            </h2>

            <p className="text-base md:text-xl leading-relaxed text-gray-300 font-light">
              {movie?.overview}
            </p>
          </div>

          <div className="space-y-4 md:space-y-6 text-xs md:text-sm border-t md:border-t-0 md:border-l border-gray-800 pt-6 md:pt-0 md:pl-6">
             <div>
               <span className="text-gray-500 block mb-1">Genres:</span>
               <span className="text-gray-200">Action, Adventure, Sci-Fi</span>
             </div>
             <div>
               <span className="text-gray-500 block mb-1">Original Language:</span>
               <span className="text-gray-200 uppercase">{movie?.original_language}</span>
             </div>
             <div>
               <span className="text-gray-500 block mb-1">Total Votes:</span>
               <span className="text-gray-200">{movie?.vote_count?.toLocaleString()}</span>
             </div>
          </div>
        </div>

        <div className="px-6 md:px-12 pb-12">
            <h3 className="text-xl md:text-2xl font-bold mb-6">More Like This</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map(n => (
                    <div key={n} className="aspect-video bg-gray-800/50 rounded-md animate-pulse" />
                ))}
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
