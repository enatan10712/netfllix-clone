import React from 'react';
import Banner from '../components/Banner';
import Row from '../components/Row';
import { requests } from '../services/tmdb';

const Latest = () => {
  return (
    <div className="pb-20">
      <Banner />
      <div className="-mt-12 md:-mt-32 relative z-20">
        <Row title="Upcoming Movies" fetchUrl={requests.getUpcomingMovies} />
        <Row title="Now Trending" fetchUrl={requests.getTrending} />
        <Row title="Popular on Netflix" fetchUrl={requests.getPopularMovies} />
        <Row title="New on TV" fetchUrl={requests.getPopularTV} />
      </div>
    </div>
  );
};

export default Latest;
