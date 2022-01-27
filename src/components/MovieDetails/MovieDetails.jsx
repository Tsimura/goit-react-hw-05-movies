import PropTypes from 'prop-types';
import styles from './MovieDetails.module.css';
import outOfPoster from '../../images/outOfPoster.jpg';
const MovieDetails = ({
  poster,
  title,
  releaseDate,
  overview,
  popularity,
  genres,
}) => {
  return (
    <div className={styles.innerContainer}>
      <>
        {poster ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt={title}
            width={120}
            className={styles.currentMoviePoster}
          />
        ) : (
          <img
            src={outOfPoster}
            alt={title}
            width={120}
            className={styles.currentMoviePoster}
          />
        )}
      </>
      <div className={styles.descriptionWrapper}>
        <h2 className={styles.currentMovieTitle}>{title}</h2>
        <p className={styles.currentMovieRelease}>
          Release date: {releaseDate}
        </p>
        <p className={styles.currentMovieOverview}>Overview: {overview}</p>
        <p className={styles.currentMoviePopularity}>
          User Score: {popularity}
        </p>
        <ul className={styles.currentMovieGenres}>
          Ganres:
          {genres.map(genre => (
            <li key={genre.id} className={styles.currentMovieGenreItem}>
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
MovieDetails.propTypes = {
  poster: PropTypes.string,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};
export default MovieDetails;
