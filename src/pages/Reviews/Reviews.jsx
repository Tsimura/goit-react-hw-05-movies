import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReviewsItem from '../../components/ReviewsItem/ReviewsItem';
import style from './Reviews.module.css';
import * as moviesApi from 'services/movies-api';
export default function Reviews() {
  const currentMovieId = useParams();
  const idMovie = Number(currentMovieId.movieId);
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    moviesApi
      .getReviews(idMovie)
      .then(resp => setReviews(resp.results))
      .catch(error => setError(error));
  }, [idMovie]);
  return (
    <>
      <ul className={style.reviews}>
        {reviews &&
          (reviews.length > 0 ? (
            reviews.map(({ id, author, content }) => (
              <ReviewsItem key={id} id={id} author={author} content={content} />
            ))
          ) : (
            <p className={style.sorry}>
              We don't have any reviews for this movie.
            </p>
          ))}
      </ul>
    </>
  );
}
