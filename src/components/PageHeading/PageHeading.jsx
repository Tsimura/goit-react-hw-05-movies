import PropTypes from 'prop-types';
import styles from '../PageHeading/PageHeading.module.css';
export default function PageHeading({ text }) {
  return <h2 className={styles.pageHeadingTitle}>{text}</h2>;
}
PageHeading.propTypes = {
  text: PropTypes.string.isRequired,
};
