import PropTypes from 'prop-types';
import CastItem from 'components/CastItem/CastItem';
import styles from './CastList.module.css';
const CastList = ({ credits }) => {
  return (
    <ul className={styles.cast}>
      {credits.length > 0 ? (
        credits.map(({ id, name, profile_path, character }) => (
          <CastItem
            key={id}
            id={id}
            name={name}
            profile={profile_path}
            character={character}
          />
        ))
      ) : (
        <p className={styles.sorry}>Sorry, something goes wrong.</p>
      )}
    </ul>
  );
};
CastList.propTypes = {
  credits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};
export default CastList;
