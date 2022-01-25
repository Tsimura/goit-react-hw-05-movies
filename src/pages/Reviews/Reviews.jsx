import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './Reviews.module.css';
import * as moviesApi from 'services/movies-api';
export default function Reviews() {
  const currentMovieId = useParams();
  const idMovie = Number(currentMovieId.movieId);
  //   console.log(idMovie);
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    moviesApi
      .getReviews(idMovie)
      .then(resp => {
        console.log(resp);
        console.log(resp.results);
        setReviews(resp.results);
      })
      .catch(error => setError(error));
  }, [idMovie]);
  return (
    <>
      <ul className={style.reviews}>
        {reviews &&
          (reviews.length > 0 ? (
            reviews.map(({ id, author, content }) => (
              <li key={id} className={style.review}>
                <h3 className={style.author}> {author}</h3>

                <p>{content}</p>
              </li>
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
