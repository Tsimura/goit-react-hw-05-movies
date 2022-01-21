import { useState } from 'react';
// import PageHeading from 'components/PageHeading/PageHeading';

export default function Searchbar({ onSubmit }) {
  const [movieValue, setMovieValue] = useState('');
  //   const [value, setValue] = useState(null);

  const handleNameChange = event =>
    setMovieValue(event.currentTarget.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();
    if (movieValue.trim() === '') {
      console.log('Enter the value of the request!');
      return;
    }
    onSubmit(movieValue);
    setMovieValue('');
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="movieValue"
            value={movieValue}
            onChange={handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search"
          />
          <button type="submit">
            <span>Search</span>
          </button>
        </form>
      </header>
    </>
  );
}
