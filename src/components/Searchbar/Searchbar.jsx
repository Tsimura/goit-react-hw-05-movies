import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from '../Searchbar/Searchbar.module.css';
export default function Searchbar({ onSubmit }) {
  const [movieValue, setMovieValue] = useState('');
  const handleNameChange = event =>
    setMovieValue(event.currentTarget.value.toLowerCase());
  const handleSubmit = event => {
    event.preventDefault();
    if (movieValue.trim() === '') {
      toast.error('Enter the value of the request!');
      return;
    }
    onSubmit(movieValue);
    setMovieValue('');
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <input
          type="text"
          name="movieValue"
          value={movieValue}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search"
          className={styles.searchInput}
        />
      </form>
    </>
  );
}
Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
