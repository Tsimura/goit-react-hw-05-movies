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
  // =======================
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log('location:', location);
  // const loc = window.location;
  // const ref = useRef(window.location.href);

  // const goBack = () => {
  //   console.log('navigate:', navigate);
  //   console.log('location:', location);
  //   console.log('useParams:', movieId);
  //   console.log('location.pathname:', location.pathname);
  //   console.log('state:', window.history.state);
  //   console.log('loc:', loc);
  //   console.log('ref:', ref);
  // };
  // =======================

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
            <button className={styles.goBackBtn} onClick={() => navigate(-1)}>
              Go back
            </button>
            {/* <button type="button" onClick={() => goBack()}>
              Back
            </button> */}
            <MovieDetails
              poster={currentMovie.poster_path}
              title={currentMovie.original_title}
              releaseDate={currentMovie.release_date}
              overview={currentMovie.overview}
              popularity={currentMovie.popularity}
              genres={currentMovie.genres}
            />
            <NavInMovieDetailsPage />
          </div>
        </>
      )}
    </>
  );
}
