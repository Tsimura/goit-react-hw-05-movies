import { useState, useEffect } from 'react';
import * as moviesApi from 'services/movies-api';
import PageHeading from 'components/PageHeading/PageHeading';
import Searchbar from '../components/Searchbar/Searchbar';
export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [movieValue, setMovieValue] = useState('');
  const [error, setError] = useState(null);

  const handleFormSubmit = movieValue => {
    setMovieValue(movieValue);
    setMovies([]);
    setError(null);
  };
  useEffect(() => {
    if (!movieValue) return;
    const fetchArrMovies = () => {
      moviesApi
        .getSearchFilm(movieValue)
        .then(movies => {
          if (movies.results.length === 0) {
            console.log('There is no result for your request!');
          }
          console.log(movies.results);
          return movies.results;
        })
        .then(respMovies => {
          setMovies(prevMovie => [...prevMovie, ...respMovies]);
        })
        .catch(error => setError(error));
    };
    fetchArrMovies();
  }, [movieValue]);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <PageHeading text="This is MoviesPage" />
      <p>Search</p>
      <ul></ul>
    </>
  );
}
