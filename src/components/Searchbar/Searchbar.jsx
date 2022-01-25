import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../Searchbar/Searchbar.module.css';
// import PageHeading from 'components/PageHeading/PageHeading';

export default function Searchbar({ onSubmit }) {
  const [movieValue, setMovieValue] = useState('');
  //   const [value, setValue] = useState(null);

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
        {/* <button type="submit" className={styles.searchBtn}>
          <span className={styles.span}>Search</span>
        </button> */}

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
