import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav>
    <NavLink
      to="/"
      className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
    >
      Home
    </NavLink>

    <NavLink
      to="/movies/:id"
      className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
