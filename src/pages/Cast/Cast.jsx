import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CastItem from '../../components/CastItem/CastItem';
import * as moviesApi from 'services/movies-api';
import styles from './Cast.module.css';
export default function Cast() {
  const currentMovieId = useParams();
  const idMovie = Number(currentMovieId.movieId);
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    moviesApi
      .getCurrentFilmCredits(idMovie)
      .then(response => setCredits(response.cast))
      .catch(error => {
        console.log('error:', error);
        setError(error);
      });
  }, [idMovie]);
  return (
    <>
      <ul className={styles.cast}>
        {credits.length > 0 ? (
          credits.map(({ id, name, profile_path, character }) => (
            <CastItem
              key={id}
              id={id}
              name={name}
              profile={profile_path}
              character={character}
            />
          ))
        ) : (
          <p>Sorry...</p>
        )}
      </ul>
    </>
  );
}
