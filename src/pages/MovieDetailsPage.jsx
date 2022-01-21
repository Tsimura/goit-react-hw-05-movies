import { useState, useEffect } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import * as moviesApi from 'services/movies-api';
// import PageHeading from 'components/PageHeading/PageHeading';
export default function MovieDetailsPage() {
  // const urlMain = useLocation();
  // console.log('urlMain:', urlMain);
  const { movieId } = useParams();
  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    moviesApi.getCurrentFilm(movieId).then(resp => {
      // console.log(resp);
      setCurrentMovie(resp);
    });
  }, [movieId]);

  return (
    <>
      {/* <PageHeading text={`Movie: ${movieId}`} /> */}
      {currentMovie && (
        <>
          <button type="button">
            <Link to="/">Back</Link>
          </button>

          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
              alt={currentMovie.original_title}
              width={120}
            />
            <h2>{currentMovie.original_title}</h2>
            <p>User Score: {currentMovie.popularity}</p>
            <p>Overview: {currentMovie.overview}</p>
            <ul>
              Ganres:
              {currentMovie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
          <ul>
            <hr />
            <h2>Additional Information</h2>

            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
            <Outlet />
          </ul>
        </>
      )}
    </>
  );
}
