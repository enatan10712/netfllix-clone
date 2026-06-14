import React from 'react';
import Banner from '../components/Banner';
import Row from '../components/Row';
import { requests } from '../services/tmdb';

const Browse = () => {
  return (
    <div className="pb-20">
      <Banner />
      <div className="-mt-12 md:-mt-32 relative z-20">
        <Row title="Trending Now" fetchUrl={requests.getTrending} />
        <Row title="Top Rated" fetchUrl={requests.getTopRated} />
        <Row title="Action" fetchUrl={requests.getActionMovies} />
        <Row title="Comedy" fetchUrl={requests.getComedyMovies} />
        <Row title="Horror" fetchUrl={requests.getHorrorMovies} />
      </div>
    </div>
  );
};

export default Browse;
