import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import * as moviesApi from 'services/movies-api';
import MovieDetails from 'components/MovieDetails/MovieDetails';
import NavInMovieDetailsPage from '../../components/NavInMovieDetailsPage/NavInMovieDetailsPage';
import styles from './MovieDetailsPage.module.css';
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [currentMovie, setCurrentMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const currentLocation = useRef(location);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(currentLocation?.current?.state?.from ?? '/');
  };
  useEffect(() => {
    moviesApi
      .getCurrentFilm(movieId)
      .then(response => setCurrentMovie(response))
      .catch(error => {
        setError(error);
      });
  }, [movieId]);
  return (
    <>
      {currentMovie && (
        <>
          <div className={styles.currentMovieWrapper}>
            <button className={styles.goBackBtn} onClick={goBack}>
              Go back
            </button>
            <MovieDetails
              poster={currentMovie.poster_path}
              title={currentMovie.original_title}
              releaseDate={currentMovie.release_date}
              overview={currentMovie.overview}
              popularity={currentMovie.popularity}
              genres={currentMovie.genres}
            />
            {error && <h2>Sorry, something went wrong: {error.message}</h2>}
            <NavInMovieDetailsPage />
          </div>
        </>
      )}
    </>
  );
}
