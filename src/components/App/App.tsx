import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './App.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [error, setError] = useState(false);

  const handleSearch = async (query: string) => {
    setMovies([]); // Очищення колекції фільмів при новому пошуку
    setError(false);
    setLoading(true);
    try {
      const { data } = await fetchMovies(query);
      if (!data.results.length) {
        toast('No movies found for your request.');
        setMovies([]);
      } else {
        setMovies(data.results);
      }
    } catch {
      setError(true);
      setMovies([]);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
