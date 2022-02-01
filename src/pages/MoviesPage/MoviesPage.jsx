import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as moviesApi from 'services/movies-api';
import MovieList from 'components/MovieList/MovieList';
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
    if (movieValue === newRequest) {
      return;
    }
    setMovieValue(newRequest);
    navigation({ ...location, search: `?query=${newRequest}` });
    setError(null);
    setMoviesArr([]);
  };
  useEffect(() => {
    if (location.search === '') {
      return;
    }
    const newRequest = new URLSearchParams(location.search).get('query');
    setMovieValue(newRequest);
  }, [location.pathname, location.search]);
  useEffect(() => {
    if (!movieValue) return;
    setLoading(true);
    const fetchArrMovies = () => {
      moviesApi
        .getSearchFilm(movieValue, currentPage)
        .then(movies => {
          if (movies.results.length === 0) {
            toast.error('There is no result for your request!');
          }
          const result = movies.results;
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
      <Searchbar onSubmit={handleFormSubmit} />
      {moviesArr.length > 0 && <MovieList movies={moviesArr} />}
      {error && <h2>Sorry, something went wrong: {error.message}</h2>}
      {loading && (
        <div className={styles.loader}>
          <MyLoader style={{ marginRight: 'auto', marginLeft: 'auto' }} />
        </div>
      )}
      {!loading && moviesArr.length > 0 && !error && (
        <Button onClick={onLoadMore} />
      )}
    </>
  );
}
