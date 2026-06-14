import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';

const MyList = () => {
  const [movies, setMovies] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, 'users', currentUser.uid, 'myList'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMovies(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="pt-24 md:pt-32 px-4 md:px-12 pb-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">My List</h1>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">You haven't added anything to your list yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyList;
