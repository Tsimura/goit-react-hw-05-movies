import PropTypes from 'prop-types';
import MovieListItem from 'components/MovieListItem/MovieListItem';
import styles from './MovieList.module.css';
const MovieList = ({ movies }) => {
  return (
    <ul className={styles.movieList}>
      {movies.map(({ id, original_title, poster_path }) => (
        <MovieListItem
          key={id}
          id={id}
          title={original_title}
          poster={poster_path}
        />
      ))}
    </ul>
  );
};
MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};
export default MovieList;
