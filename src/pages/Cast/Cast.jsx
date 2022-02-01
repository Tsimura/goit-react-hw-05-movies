import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CastList from 'components/CastList/CastList';
import * as moviesApi from 'services/movies-api';
export default function Cast() {
  const currentMovieId = useParams();
  const idMovie = Number(currentMovieId.movieId);
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    moviesApi
      .getCurrentFilmCredits(idMovie)
      .then(response => setCredits(response.cast))
      .catch(error => setError(error));
  }, [idMovie]);
  return (
    <>
      <CastList credits={credits} />
      {error && <h2>Sorry, something went wrong: {error.message}</h2>}
    </>
  );
}
