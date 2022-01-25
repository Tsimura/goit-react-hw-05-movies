import { Link } from 'react-router-dom';
import styles from './MovieListItem.module.css';
const MovieListItem = ({ id, title, poster }) => {
  return (
    <li className={styles.movieItemItem}>
      <Link to={`/movies/${id}`}>
        <h3 className={styles.movieItemTitle}>{title}</h3>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={title}
          width={120}
          className={styles.movieItemImg}
        />
      </Link>
    </li>
  );
};
export default MovieListItem;
