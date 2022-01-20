import axios from 'axios';
async function getFilms() {
  const BASE_URL = `https://api.themoviedb.org/3`;
  const API_KEY = `api_key=221ed015def0321f18a85f3fc7b4d6fa`;
  try {
    const { data } = await axios.get(
      `${BASE_URL}/trending/movie/week?${API_KEY}&page=1`,
    );
    // console.log(data);
    // console.log(data.results);
    return data;
  } catch (error) {
    console.log(error);
  }
}
const api = { getFilms };
export default api;
