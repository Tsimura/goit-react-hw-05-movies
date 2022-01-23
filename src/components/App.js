import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from './Container/Container';
import AppBar from './AppBar/AppBar';
// import MyLoader from 'components/Loader/Loader';
// import HomePage from 'pages/HomePage';
// import MoviesPage from 'pages/MoviesPage';
// import MovieDetailsPage from 'pages/MovieDetailsPage';
// import Cast from '../pages/Cast';
// import Reviews from '../pages/Reviews';
import './App.css';

const HomePage = lazy(() => import('pages/HomePage.jsx'));
const MoviesPage = lazy(() => import('pages/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('pages/MovieDetailsPage.jsx'));
const Cast = lazy(() => import('../pages/Cast.jsx'));
const Reviews = lazy(() => import('../pages/Reviews.jsx'));

export default function App() {
  return (
    <Container>
      <AppBar />

      {/* <Suspense fallback={<></>}> */}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<></>}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/movies"
          element={
            <Suspense fallback={<></>}>
              <MoviesPage />
            </Suspense>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <Suspense fallback={<></>}>
              <MovieDetailsPage />
            </Suspense>
          }
        >
          <Route
            path="cast"
            element={
              <Suspense fallback={<p>Loader for cast</p>}>
                <Cast />
              </Suspense>
            }
          />
          <Route
            path="reviews"
            element={
              <Suspense fallback={<p>Loader for reviews</p>}>
                <Reviews />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<></>}>
              <HomePage />
            </Suspense>
          }
        />
      </Routes>
      {/* </Suspense> */}
    </Container>
  );
}
