import { Routes, Route } from 'react-router-dom';
import Container from './Container/Container';
import AppBar from './AppBar/AppBar';
import HomePage from '../pages/HomePage';
import MoviesPage from 'pages/MoviesPage';
// import NotFoundPage from 'pages/NotFoundPage';==================!
// подумати...можливо переадресувати після 5 секунд...
import MovieDetailsPage from 'pages/MovieDetailsPage';
import Cast from '../pages/Cast';
import Reviews from '../pages/Reviews';
import './App.css';

export default function App() {
  return (
    <Container>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />

        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Container>
  );
}
