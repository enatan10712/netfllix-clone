import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const requests = {
  getTrending: `/trending/all/week`,
  getNetflixOriginals: `/discover/tv?with_networks=213`,
  getTopRated: `/movie/top_rated`,
  getActionMovies: `/discover/movie?with_genres=28`,
  getComedyMovies: `/discover/movie?with_genres=35`,
  getHorrorMovies: `/discover/movie?with_genres=27`,
  getRomanceMovies: `/discover/movie?with_genres=10749`,
  getDocumentaries: `/discover/movie?with_genres=99`,
  getPopularMovies: `/movie/popular`,
  getUpcomingMovies: `/movie/upcoming`,
  getPopularTV: `/tv/popular`,
  getTopRatedTV: `/tv/top_rated`,
  getActionTV: `/discover/tv?with_genres=10759`,
  getComedyTV: `/discover/tv?with_genres=35`,
  searchMulti: (query) => `/search/multi?query=${query}`,
  getVideos: (id, type = 'movie') => `/${type}/${id}/videos`,
  getDetails: (id, type = 'movie') => `/${type}/${id}`,
};

export const fetchMovies = async (url) => {
  try {
    const response = await tmdb.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies from TMDB:", error);
    return [];
  }
};

export default tmdb;
