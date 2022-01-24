import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as moviesApi from 'services/movies-api';
// import PageHeading from 'components/PageHeading/PageHeading';
import Searchbar from '../../components/Searchbar/Searchbar';
import MyLoader from 'components/Loader/Loader';
import Button from 'components/LoadMoreBtn/LoadMoreBtn';
import styles from '../MoviesPage/MoviesPage.module.css';
export default function MoviesPage() {
  const [moviesArr, setMoviesArr] = useState([]);
  const [movieValue, setMovieValue] = useState('');
  const [currentPage, setСurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigate();
  const location = useLocation();

  const handleFormSubmit = newRequest => {
    console.log('movieValue:', movieValue);
    console.log('newRequest:', newRequest);
    if (movieValue === newRequest) {
      return;
    }
    setMovieValue(newRequest);
    navigation({ ...location, search: `?query=${newRequest}` });
    setError(null);
    // console.log('movieValue:', movieValue);
    // console.log('useNavigation:', navigation);
    // console.log('useLocation:', location);
    // console.log('location:', location);
    // console.log('newRequest:', newRequest);
    setMoviesArr([]);
  };

  useEffect(() => {
    if (location.search === '') {
      return;
    }
    console.log('useWEffect whith newRequest');
    const newRequest = new URLSearchParams(location.search).get('query');
    setMovieValue(newRequest);
  }, [location.search]);

  useEffect(() => {
    if (!movieValue) return;
    setLoading(true);
    const fetchArrMovies = () => {
      moviesApi
        .getSearchFilm(movieValue, currentPage)
        .then(movies => {
          if (movies.results.length === 0) {
            console.log('There is no result for your request!');
          }
          const result = movies.results;
          console.log(`Наши фильмы за поиском: ${movieValue}`, result);
          setMoviesArr(prevMovie => [...prevMovie, ...result]);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    };
    fetchArrMovies();
  }, [currentPage, movieValue]);

  const onLoadMore = () => {
    setLoading(true);
    setСurrentPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {/* <PageHeading text="This is MoviesPage" /> */}
      <Searchbar onSubmit={handleFormSubmit} />
      <ul className={styles.moviesPageList}>
        {moviesArr &&
          moviesArr.map(({ id, original_title, poster_path }) => (
            <li key={id} className={styles.moviesPageItem}>
              <Link to={`/movies/${id}`}>
                <h3 className={styles.moviesPageItemTitle}>{original_title}</h3>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={original_title}
                  width={120}
                  className={styles.moviesPageImg}
                />
              </Link>
            </li>
          ))}
      </ul>

      {error && <h2>Sorry, something went wrong: {error.message}</h2>}
      {loading && (
        <MyLoader style={{ marginRight: 'auto', marginLeft: 'auto' }} />
      )}
      {!loading && moviesArr.length > 0 && !error && (
        <Button onClick={onLoadMore} />
      )}
    </>
  );
}
