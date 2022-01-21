import { Link, useParams, useLocation, Outlet } from 'react-router-dom';

import { useState, useEffect } from 'react';
import * as moviesApi from 'services/movies-api';

export default function Reviews() {
  const currentMovieId = useParams();
  const idMovie = Number(currentMovieId.movieId);
  //   console.log(idMovie);
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    moviesApi.getReviews(idMovie).then(resp => {
      console.log(resp);
      console.log(resp.results);
      setReviews(resp.results);
    });
  }, [idMovie]);
  return (
    <>
      <h2>Reviews</h2>

      <ul>
        {reviews &&
          reviews.map(({ id, author, content }) => (
            <li key={id}>
              {author}
              <p>{content}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
