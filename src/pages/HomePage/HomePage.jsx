import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moviesApi from 'services/movies-api';
import PageHeading from 'components/PageHeading/PageHeading';
import MyLoader from 'components/Loader/Loader';
import Button from 'components/LoadMoreBtn/LoadMoreBtn';
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
        console.log(results);
        setMovies(prevMovie => [...prevMovie, ...results]);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [currentPage]);

  const onLoadMore = () => {
    setLoading(true);
    setСurrentPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <PageHeading text="Trending today" />
      <ul>
        {movies &&
          movies.map(({ id, original_title, poster_path }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>
                {original_title}
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={original_title}
                  width={120}
                />
              </Link>
            </li>
          ))}
      </ul>

      {error && <h2>Sorry, something went wrong: {error.message}</h2>}
      {loading && (
        <MyLoader style={{ marginRight: 'auto', marginLeft: 'auto' }} />
      )}
      {!loading && movies.length > 0 && !error && (
        <Button onClick={onLoadMore} />
      )}
    </>
  );
}
