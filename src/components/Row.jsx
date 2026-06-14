import React, { useState, useEffect } from 'react';
import './Row.css';

function Row({ title, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  const moviePosters = [
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&q=80",
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&q=80",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&q=80",
    "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&q=80",
    "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&q=80",
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&q=80",
    "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&q=80",
    "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=300&q=80",
  ];

  useEffect(() => {
    setMovies(moviePosters);
  }, []);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((poster, index) => (
          <img
            key={index}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={poster}
            alt="Movie poster"
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
