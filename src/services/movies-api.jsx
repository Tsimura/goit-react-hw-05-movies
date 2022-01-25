const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `api_key=221ed015def0321f18a85f3fc7b4d6fa`;
async function fetchWithErrorHandlling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('404 Page not found :('));
}
export function getTrendingFilms(currentPage) {
  return fetchWithErrorHandlling(
    `${BASE_URL}/trending/movie/day?${API_KEY}&page=${currentPage}`,
  );
}
export function getCurrentFilm(movieId) {
  return fetchWithErrorHandlling(`${BASE_URL}/movie/${movieId}?${API_KEY}`);
}
export function getCurrentFilmCredits(movieId) {
  return fetchWithErrorHandlling(
    `${BASE_URL}/movie/${movieId}/credits?${API_KEY}`,
  );
}
export function getReviews(movieId) {
  return fetchWithErrorHandlling(
    `${BASE_URL}/movie/${movieId}/reviews?${API_KEY}`,
  );
}
export function getSearchFilm(value, currentPage) {
  return fetchWithErrorHandlling(
    `${BASE_URL}/search/movie?${API_KEY}&language=en-US&query=${value}&page=${currentPage}&include_adult=false`,
  );
}
