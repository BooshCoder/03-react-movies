import axios from 'axios';
import type { Movie } from '../types/movie';

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1',
  params: {
    // ваші параметри
  },
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
  }
};

export const fetchMovies = () => axios.request<MoviesResponse>(options);