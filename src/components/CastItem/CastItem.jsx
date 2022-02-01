import PropTypes from 'prop-types';
import defaultImgActor from '../../images/defaultImgActor.png';
import styles from './CastItem.module.css';
const CastItem = ({ name, profile, character }) => {
  return (
    <li className={styles.castItem}>
      {profile ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${profile}`}
          alt="actor"
          width={120}
          className={styles.castImg}
        />
      ) : (
        <img
          src={defaultImgActor}
          alt="actor"
          width={120}
          className={styles.castImg}
        />
      )}
      <div className={styles.castDescription}>
        <p className={styles.castName}>Name: {name} </p>
        <p>Character: {character}</p>
      </div>
    </li>
  );
};
CastItem.propTypes = {
  name: PropTypes.string.isRequired,
  profile: PropTypes.string,
  character: PropTypes.string.isRequired,
};
export default CastItem;
