import React from 'react';
import Banner from '../components/Banner';
import Row from '../components/Row';
import { requests } from '../services/tmdb';

const Home = () => {
  return (
    <div className="pb-20">
      <Banner />
      <div className="-mt-12 md:-mt-32 relative z-20">
        <Row title="Trending Now" fetchUrl={requests.getTrending} />
        <Row title="Netflix Originals" fetchUrl={requests.getNetflixOriginals} />
        <Row title="Top Rated" fetchUrl={requests.getTopRated} />
        <Row title="Action Movies" fetchUrl={requests.getActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.getComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.getHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.getRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.getDocumentaries} />
      </div>
    </div>
  );
};

export default Home;
