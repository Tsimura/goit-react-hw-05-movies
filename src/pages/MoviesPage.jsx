import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as moviesApi from 'services/movies-api';
import PageHeading from 'components/PageHeading/PageHeading';
import Searchbar from '../components/Searchbar/Searchbar';
export default function MoviesPage() {
  const [moviesArr, setMoviesArr] = useState(null);
  const [movieValue, setMovieValue] = useState('');
  const navigation = useNavigate();
  const location = useLocation();

  const handleFormSubmit = newRequest => {
    if (movieValue === newRequest) {
      return;
    }
    setMovieValue(newRequest);
    navigation({ ...location, search: `?query=${newRequest}` });
    // console.log('movieValue:', movieValue);
    // console.log('useNavigation:', navigation);
    // console.log('useLocation:', location);
    // console.log('location:', location);
    // console.log('newRequest:', newRequest);

    // setMovieValue(newRequest);
    // setMoviesArr([]);
  };

  useEffect(() => {
    if (location.search === '') {
      return;
    }
    const newRequest = new URLSearchParams(location.search).get('query');
    setMovieValue(newRequest);
  }, [location.search]);

  useEffect(() => {
    if (!movieValue) return;
    const fetchArrMovies = () => {
      moviesApi.getSearchFilm(movieValue).then(movies => {
        if (movies.results.length === 0) {
          console.log('There is no result for your request!');
        }
        const result = movies.results;
        console.log(`Наши фильмы за поиском: ${movieValue}`, result);
        setMoviesArr(result);
      });
    };
    fetchArrMovies();
  }, [movieValue]);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <PageHeading text="This is MoviesPage" />
      <p>Search</p>
      {moviesArr &&
        moviesArr.map(({ id, original_title, poster_path }) => (
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
    </>
  );
}
