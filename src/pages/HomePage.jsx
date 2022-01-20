import moviesAPI from '../services/getFilms';
import { useState, useEffect } from 'react';
import PageHeading from 'components/PageHeading/PageHeading';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesAPI.getFilms().then(res => {
      const results = res.results;
      console.log(results);
      setMovies(results);
    });
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />
      <ul>
        {movies &&
          movies.map(movie => <li key={movie.id}>{movie.original_title}</li>)}
      </ul>
    </>
  );
}
