import { useParams } from 'react-router-dom';
import defaultImgActor from '../../images/defaultImgActor.png';
import { useState, useEffect } from 'react';
import * as moviesApi from 'services/movies-api';
import style from './Cast.module.css';
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
      <ul className={style.cast}>
        {credits.length > 0 ? (
          credits.map(({ id, name, profile_path, character }) => (
            <li key={id} className={style.castItem}>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt="actor"
                  width={120}
                  className={style.castImg}
                />
              ) : (
                <img
                  src={defaultImgActor}
                  alt="actor"
                  width={120}
                  className={style.castImg}
                />
              )}
              <div className={style.castDescription}>
                <p className={style.castName}>Name: {name} </p>
                <p>Character: {character}</p>
              </div>
            </li>
          ))
        ) : (
          <p>Sorry...</p>
        )}
      </ul>
    </>
  );
}
