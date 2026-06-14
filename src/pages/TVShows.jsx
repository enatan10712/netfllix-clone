import React from 'react';
import Banner from '../components/Banner';
import Row from '../components/Row';
import { requests } from '../services/tmdb';

const TVShows = () => {
  return (
    <div className="pb-20">
      <Banner />
      <div className="-mt-12 md:-mt-32 relative z-20">
        <Row title="Netflix Originals" fetchUrl={requests.getNetflixOriginals} />
        <Row title="Trending TV Shows" fetchUrl={requests.getTrending} />
        <Row title="Popular on TV" fetchUrl={requests.getPopularTV} />
        <Row title="Top Rated TV" fetchUrl={requests.getTopRatedTV} />
        <Row title="Action & Adventure" fetchUrl={requests.getActionTV} />
        <Row title="Comedy TV" fetchUrl={requests.getComedyTV} />
      </div>
    </div>
  );
};

export default TVShows;
