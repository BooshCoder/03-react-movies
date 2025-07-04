import axios from 'axios';
import type { Movie } from '../types/movie';

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

export const fetchMovies = (query: string) => {
  return axios.request<MoviesResponse>({
    method: 'GET',
    url: BASE_URL,
    params: {
      include_adult: false,
      language: 'en-US',
      page: 1,
      query,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
};