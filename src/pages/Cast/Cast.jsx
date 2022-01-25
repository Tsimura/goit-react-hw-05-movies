import { useParams } from 'react-router-dom';
import defaultImgActor from '../../images/defaultImgActor.png';
import { useState, useEffect } from 'react';
import * as moviesApi from 'services/movies-api';
import style from './Cast.module.css';

export default function Cast() {
  const currentMovieId = useParams();
  const idMovie = Number(currentMovieId.movieId);
  console.log(idMovie);
  const [credits, setCredits] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    moviesApi
      .getCurrentFilmCredits(idMovie)
      .then(resp => {
        console.log(resp);
        console.log(resp.id);
        setCredits(resp.cast);
      })
      .catch(error => setError(error));
  }, [idMovie]);
  return (
    <>
      <ul className={style.cast}>
        {credits &&
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
          ))}
      </ul>
    </>
  );
}
