import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import currentMovieAPI from 'services/getCurrentFilm';
import PageHeading from 'components/PageHeading/PageHeading';
export default function MovieDetailsPage() {
  let { movieId } = useParams();
  const [currentMovie, setCurrentMovie] = useState(null);
  useEffect(() => {
    currentMovieAPI.getCurrentFilm(movieId).then(resp => {
      console.log(resp);
      setCurrentMovie(resp);
    });
  }, [movieId]);
  // { original_title, poster_path, vote_average, overview, genre }

  return (
    <>
      <PageHeading text={`Movie: ${movieId}`} />
      {currentMovie && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
            alt={currentMovie.original_title}
          />
          <h2>{currentMovie.original_title}</h2>
          <p>{currentMovie.vote_average}</p>
          <p>Overview: {currentMovie.overview}</p>
          <ul>
            Ganres:
            {currentMovie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
