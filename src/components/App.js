import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Container from './Container/Container';
import AppBar from './AppBar/AppBar';
const HomePage = lazy(() => import('pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() =>
  import('pages/MovieDetailsPage/MovieDetailsPage.jsx'),
);
const Cast = lazy(() => import('../pages/Cast/Cast.jsx'));
const Reviews = lazy(() => import('../pages/Reviews/Reviews.jsx'));
export default function App() {
  return (
    <Container>
      <AppBar />
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
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </Container>
  );
}
