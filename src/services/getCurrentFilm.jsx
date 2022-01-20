import axios from 'axios';
async function getCurrentFilm(movieId) {
  const BASE_URL = `https://api.themoviedb.org/3`;
  const API_KEY = `api_key=221ed015def0321f18a85f3fc7b4d6fa`;
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}?${API_KEY}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
const api = { getCurrentFilm };
export default api;
