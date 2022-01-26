import { useState, useEffect } from 'react';
import { useParams, Outlet, NavLink, useNavigate } from 'react-router-dom';
import * as moviesApi from 'services/movies-api';
import styles from './MovieDetailsPage.module.css';
import outOfPoster from '../../images/outOfPoster.jpg';
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [currentMovie, setCurrentMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const setActive = ({ isActive }) =>
    isActive ? styles.activeLink : styles.link;

  useEffect(() => {
    moviesApi
      .getCurrentFilm(movieId)
      .then(response => setCurrentMovie(response))
      .catch(error => {
        console.log('error:', error);
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
            {/* <button type="button">
            <Link to="/">Back</Link>
          </button> */}
            <div className={styles.innerContainer}>
              <>
                {currentMovie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                    alt={currentMovie.original_title}
                    width={120}
                    className={styles.currentMoviePoster}
                  />
                ) : (
                  <img
                    src={outOfPoster}
                    alt={currentMovie.original_title}
                    width={120}
                    className={styles.currentMoviePoster}
                  />
                )}
              </>
              <div className={styles.descriptionWrapper}>
                <h2 className={styles.currentMovieTitle}>
                  {currentMovie.original_title}
                </h2>
                <p className={styles.currentMovieRelease}>
                  Release date: {currentMovie.release_date}
                </p>
                <p className={styles.currentMovieOverview}>
                  Overview: {currentMovie.overview}
                </p>
                <p className={styles.currentMoviePopularity}>
                  User Score: {currentMovie.popularity}
                </p>
                <ul className={styles.currentMovieGenres}>
                  Ganres:
                  {currentMovie.genres.map(genre => (
                    <li key={genre.id} className={styles.currentMovieGenreItem}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.more}>
              <h2 className={styles.additionalInformationTitle}>
                Additional Information
              </h2>
              <>
                <NavLink to="cast" className={setActive}>
                  <span>Cast</span>
                </NavLink>

                <NavLink to="reviews" className={setActive}>
                  <span>Reviews</span>
                </NavLink>
              </>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}
