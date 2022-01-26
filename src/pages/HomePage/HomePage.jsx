import { useState, useEffect } from 'react';
import * as moviesApi from 'services/movies-api';
import PageHeading from 'components/PageHeading/PageHeading';
import MovieList from 'components/MovieList/MovieList';
import MyLoader from 'components/Loader/Loader';
import Button from 'components/LoadMoreBtn/LoadMoreBtn';
import { addBackToTop } from 'vanilla-back-to-top';
import styles from './HomePage.module.css';
export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setСurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    moviesApi
      .getTrendingFilms(currentPage)
      .then(res => {
        const results = res.results;
        setMovies(prevMovie => [...prevMovie, ...results]);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [currentPage]);
  useEffect(() => {
    addBackToTop({
      diameter: 50,
      backgroundColor: 'rgb(14, 21, 56)',
      textColor: '#aaaaaa',
      innerHTML:
        '<svg viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>',
      scrollDuration: 1000,
    });
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    setСurrentPage(prevPage => prevPage + 1);
  };
  return (
    <>
      <PageHeading text="Trending today" />
      {movies.length > 0 && <MovieList movies={movies} />}
      {error && <h2>Sorry, something went wrong: {error.message}</h2>}
      {loading && (
        <div className={styles.loader}>
          <MyLoader style={{ marginRight: 'auto', marginLeft: 'auto' }} />
        </div>
      )}
      {!loading && movies.length > 0 && !error && (
        <Button onClick={onLoadMore} />
      )}
    </>
  );
}
