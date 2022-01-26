import defaultImgActor from '../../images/defaultImgActor.png';
import styles from './CastItem.module.css';
const CastItem = ({ id, name, profile, character }) => {
  return (
    <li key={id} className={styles.castItem}>
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
export default CastItem;
