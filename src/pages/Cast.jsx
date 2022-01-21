import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import defaultImgActor from './defaultImgActor.png';
import { useState, useEffect } from 'react';
import * as moviesApi from 'services/movies-api';

export default function Cast() {
  const currentMovieId = useParams();
  const idMovie = Number(currentMovieId.movieId);
  console.log(idMovie);
  const [credits, setCredits] = useState(null);
  useEffect(() => {
    moviesApi.getCurrentFilmCredits(idMovie).then(resp => {
      console.log(resp);
      console.log(resp.id);
      setCredits(resp.cast);
    });
  }, [idMovie]);
  return (
    <>
      <ul>
        {credits &&
          credits.map(({ id, name, profile_path }) => (
            <li key={id}>
              {name}
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt="actor"
                  width={120}
                />
              ) : (
                <img src={defaultImgActor} alt="actor" width={120} />
              )}
            </li>
          ))}
      </ul>
    </>
  );
}
