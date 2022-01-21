import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
const Navigation = () => {
  const setActive = ({ isActive }) =>
    isActive ? styles.activeLink : styles.link;
  return (
    <nav>
      <NavLink to="/" className={setActive}>
        Home
      </NavLink>
      <NavLink to="/movies" className={setActive}>
        Movies
      </NavLink>
    </nav>
  );
};
export default Navigation;
