import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moviesApi from 'services/movies-api';
import PageHeading from 'components/PageHeading/PageHeading';
import Searchbar from '../components/Searchbar/Searchbar';
export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [movieValue, setMovieValue] = useState('');

  const handleFormSubmit = movieValue => {
    setMovieValue(movieValue);
    setMovies([]);
  };
  useEffect(() => {
    if (!movieValue) return;
    const fetchArrMovies = () => {
      moviesApi.getSearchFilm(movieValue).then(movies => {
        if (movies.results.length === 0) {
          console.log('There is no result for your request!');
        }
        const result = movies.results;
        console.log(result);
        setMovies(result);
      });
    };
    fetchArrMovies();
  }, [movieValue]);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <PageHeading text="This is MoviesPage" />
      <p>Search</p>
      {movies &&
        movies.map(({ id, original_title, poster_path }) => (
          <li key={id}>
            <Link to={`/movies/${id}`}>
              {original_title}
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={original_title}
                width={120}
              />
            </Link>
          </li>
        ))}
    </>
  );
}
