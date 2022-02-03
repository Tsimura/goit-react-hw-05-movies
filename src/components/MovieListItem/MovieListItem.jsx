import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import outOfPoster from '../../images/outOfPoster.jpg';
import styles from './MovieListItem.module.css';
const MovieListItem = ({ id, title, poster }) => {
  const location = useLocation();
  return (
    <li className={styles.movieItemItem}>
      <Link to={`/movies/${id}`} state={{ from: location }}>
        <h3 className={styles.movieItemTitle}>{title}</h3>
        {poster ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt={title}
            width={120}
            className={styles.movieItemImg}
          />
        ) : (
          <img
            src={outOfPoster}
            alt={title}
            width={120}
            className={styles.movieItemImg}
          />
        )}
      </Link>
    </li>
  );
};
MovieListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string,
};
export default MovieListItem;
