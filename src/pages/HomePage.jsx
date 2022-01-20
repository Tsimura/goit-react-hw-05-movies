import moviesListAPI from '../services/getTrendingFilms';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeading from 'components/PageHeading/PageHeading';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesListAPI.getTrendingFilms().then(res => {
      const results = res.results;
      console.log(results);
      setMovies(results);
    });
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />

      {movies &&
        movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
          </li>
        ))}
    </>
  );
}

// useRouteMatch;
// https://youtu.be/IY_btZ2pYpw?t=2709   можливі помиллки
