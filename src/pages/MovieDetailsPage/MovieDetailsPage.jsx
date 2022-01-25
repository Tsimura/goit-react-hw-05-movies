import { useState, useEffect } from 'react';
import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';
import * as moviesApi from 'services/movies-api';
import style from './MovieDetailsPage.module.css';
import outOfPoster from '../../images/outOfPoster.jpg';
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [currentMovie, setCurrentMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
          <div className={style.currentMovieWrapper}>
            <button className={style.goBackBtn} onClick={() => navigate(-1)}>
              Go back
            </button>
            {/* <button type="button">
            <Link to="/">Back</Link>
          </button> */}
            <div className={style.innerContainer}>
              <>
                {currentMovie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                    alt={currentMovie.original_title}
                    width={120}
                    className={style.currentMoviePoster}
                  />
                ) : (
                  <img
                    src={outOfPoster}
                    alt={currentMovie.original_title}
                    width={120}
                    className={style.currentMoviePoster}
                  />
                )}
              </>
              <div className={style.descriptionWrapper}>
                <h2 className={style.currentMovieTitle}>
                  {currentMovie.original_title}
                </h2>
                <p className={style.currentMovieRelease}>
                  Release date: {currentMovie.release_date}
                </p>
                <p className={style.currentMovieOverview}>
                  Overview: {currentMovie.overview}
                </p>
                <p className={style.currentMoviePopularity}>
                  User Score: {currentMovie.popularity}
                </p>
                <ul className={style.currentMovieGenres}>
                  Ganres:
                  {currentMovie.genres.map(genre => (
                    <li key={genre.id} className={style.currentMovieGenreItem}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={style.more}>
              <h2 className={style.additionalInformationTitle}>
                Additional Information
              </h2>
              <>
                <span className={style.additionalInformationBtn}>
                  <Link to="cast">Cast</Link>
                </span>
                <span className={style.additionalInformationBtn}>
                  <Link to="reviews">Reviews</Link>
                </span>
              </>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}
