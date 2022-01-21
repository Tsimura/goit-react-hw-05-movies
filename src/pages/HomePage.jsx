import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moviesApi from 'services/movies-api';
import PageHeading from 'components/PageHeading/PageHeading';
export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesApi.getTrendingFilms().then(res => {
      const results = res.results;
      console.log(results);
      setMovies(results);
    });
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />

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

// useRouteMatch;
// https://youtu.be/IY_btZ2pYpw?t=2709   можливі помиллки
