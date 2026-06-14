import React, { useState, useEffect } from 'react';
import tmdb, { requests } from '../services/tmdb';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 transition-opacity duration-300">
      <div className="relative bg-netflix-black w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-netflix-black/60 rounded-full hover:bg-white hover:text-black transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative pt-[56.25%]">
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Movie Trailer"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}`}
                alt={movie?.title}
                className="w-full h-full object-cover opacity-50"
              />
              <p className="absolute text-xl font-bold">No Trailer Available</p>
            </div>
          )}
        </div>

        <div className="p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-bold">
              {movie?.title || movie?.name || movie?.original_name}
            </h2>
            <button
              onClick={handleMyList}
              className={`flex items-center space-x-2 px-4 py-2 border rounded font-semibold transition duration-300 ${
                isInList ? 'bg-white text-black border-white' : 'text-white border-white hover:bg-white/10'
              }`}
            >
              <span>{isInList ? '✓ In My List' : '+ My List'}</span>
            </button>
          </div>

          <div className="flex items-center space-x-4 text-sm font-semibold">
            <span className="text-green-400">{Math.round(movie?.vote_average * 10)}% Match</span>
            <span>{movie?.release_date?.split('-')[0] || movie?.first_air_date?.split('-')[0]}</span>
            <span className="border px-1.5 py-0.5 rounded text-xs border-white/40">HD</span>
          </div>

          <p className="text-lg leading-relaxed text-gray-300">
            {movie?.overview}
          </p>

          <div className="text-sm text-gray-400">
             {movie?.genre_ids && (
               <p><span className="text-gray-500">Genres:</span> {movie.genre_ids.join(', ')}</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
