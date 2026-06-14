import React, { useState, useEffect } from 'react';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setMovie({
      title: "Stranger Things",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      backdrop_path: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&q=80"
    });
  }, []);

  return (
    <header className="banner">
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {movie?.description}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
