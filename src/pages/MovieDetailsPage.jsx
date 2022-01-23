import { useState, useEffect } from 'react';
import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';
import * as moviesApi from 'services/movies-api';
import outOfPoster from '../images/outOfPoster.jpg';
// import PageHeading from 'components/PageHeading/PageHeading';
export default function MovieDetailsPage() {
  // const urlMain = useLocation();
  // console.log('urlMain:', urlMain);
  const { movieId } = useParams();
  const [currentMovie, setCurrentMovie] = useState(null);
  const navigate = useNavigate();

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
          <button onClick={() => navigate(-1)}>Go back</button>
          {/* <button type="button">
            <Link to="/">Back</Link>
          </button> */}

          <div>
            {currentMovie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                alt={currentMovie.original_title}
                width={120}
              />
            ) : (
              <img
                src={outOfPoster}
                alt={currentMovie.original_title}
                width={120}
              />
            )}

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

// resp - прибрати зайве сміття!
