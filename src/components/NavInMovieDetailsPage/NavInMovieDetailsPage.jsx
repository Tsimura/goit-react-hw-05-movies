import { NavLink, Outlet } from 'react-router-dom';
import styles from './NavInMovieDetailsPage.module.css';
const NavInMovieDetailsPage = () => {
  const setActive = ({ isActive }) =>
    isActive ? styles.activeLink : styles.link;
  return (
    <div className={styles.more}>
      <h2 className={styles.additionalInformationTitle}>
        Additional Information
      </h2>
      <NavLink to="cast" className={setActive}>
        <span>Cast</span>
      </NavLink>
      <NavLink to="reviews" className={setActive}>
        <span>Reviews</span>
      </NavLink>
      <Outlet />
    </div>
  );
};
export default NavInMovieDetailsPage;
