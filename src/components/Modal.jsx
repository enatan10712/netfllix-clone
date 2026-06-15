import React, { useState, useEffect } from 'react';
import tmdb, { requests } from '../services/tmdb';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { X, Play, Plus, Check, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{
          scale: 1,
          y: 0,
          opacity: 1,
          transition: { type: "spring", damping: 25, stiffness: 300 }
        }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        className="relative bg-[#181818] w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-xl shadow-2xl no-scrollbar overflow-x-hidden"
      >
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-black/60 rounded-full text-white transition duration-300"
        >
          <X size={24} />
        </motion.button>

        <div className="relative pt-[56.25%] bg-black group/video">
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

          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-20">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-white text-black px-10 py-3 rounded-md font-bold text-xl hover:bg-gray-200 transition"
              >
                  <Play fill="black" size={28} />
                  <span>Play</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, borderColor: "white" }}
                whileTap={{ scale: 0.9 }}
                onClick={handleMyList}
                className="p-3 border-2 border-gray-500 rounded-full transition group/btn"
              >
                  {isInList ? <Check size={28} className="text-white" /> : <Plus size={28} className="text-white" />}
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 border-2 border-gray-500 rounded-full hover:border-white transition"
            >
              {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
            </motion.button>
          </div>

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-100" />
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-3 space-y-8">
            <div className="flex items-center space-x-4 text-lg font-semibold">
              <span className="text-green-400 font-bold">{Math.round(movie?.vote_average * 10)}% Match</span>
              <span className="text-gray-400">{movie?.release_date?.split('-')[0] || movie?.first_air_date?.split('-')[0]}</span>
              <span className="border-2 px-2 py-0.5 rounded text-xs border-gray-600 text-gray-400">4K Ultra HD</span>
              <span className="border-2 px-2 py-0.5 rounded text-xs border-gray-600 text-gray-400">5.1</span>
            </div>

            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-black tracking-tight"
            >
              {movie?.title || movie?.name || movie?.original_name}
            </motion.h2>

            <p className="text-xl leading-relaxed text-gray-200 font-light">
              {movie?.overview}
            </p>
          </div>

          <div className="space-y-6 text-sm md:text-base border-l border-gray-800 pl-6">
             <div>
               <span className="text-gray-500 block mb-1">Genres:</span>
               <span className="text-gray-200 hover:underline cursor-pointer">Action, Adventure, Sci-Fi, Thriller</span>
             </div>
             <div>
               <span className="text-gray-500 block mb-1">Maturity Rating:</span>
               <span className="border border-gray-500 px-2 py-0.5 rounded text-xs">TV-MA</span>
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

        {/* Similar Content Placeholder */}
        <div className="px-8 md:px-12 pb-12">
            <h3 className="text-2xl font-bold mb-6">More Like This</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map(n => (
                    <div key={n} className="aspect-video bg-gray-800 rounded animate-pulse" />
                ))}
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
