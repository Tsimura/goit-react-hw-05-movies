import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReviewsList from 'components/ReviewsList/ReviewsList';
import * as moviesApi from 'services/movies-api';
export default function Reviews() {
  const currentMovieId = useParams();
  const idMovie = Number(currentMovieId.movieId);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    moviesApi
      .getReviews(idMovie)
      .then(resp => setReviews(resp.results))
      .catch(error => setError(error));
  }, [idMovie]);
  return (
    <>
      <ReviewsList reviews={reviews} />
    </>
  );
}
