import { NavLink } from 'react-router-dom';
import styles from './MainNavigation.module.css';
const MainNavigation = () => {
  const setActive = ({ isActive }) =>
    isActive ? styles.activeLink : styles.link;
  return (
    <nav className={styles.headerNavigation}>
      <div className={styles.btn}>
        <NavLink to="/" className={setActive}>
          <span>Home</span>
        </NavLink>
      </div>
      <div className={styles.btn}>
        <NavLink to="/movies" className={setActive}>
          <span>Movies</span>
        </NavLink>
      </div>
    </nav>
  );
};
export default MainNavigation;
