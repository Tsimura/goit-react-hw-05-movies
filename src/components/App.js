import { Routes, Route } from 'react-router-dom';
import AppBar from './AppBar/AppBar';
import HomePage from '../pages/HomePage';
import MoviesPage from 'pages/MoviesPage';
import NotFoundPage from 'pages/NotFoundPage';
import Container from './Container/Container';
import './App.css';

function App() {
  return (
    <Container>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
  );
}

export default App;

// ==================================

// <Route path="/">
//   <HomePage />
// </Route>;
// <Route path="/">
//   <MoviesPage />
// </Route>;

//  <Routes>
//    <Route path="/" element={<HomePage />} />
//    <Route path="/movies" element={<MoviesPage />} />
//  </Routes>;
