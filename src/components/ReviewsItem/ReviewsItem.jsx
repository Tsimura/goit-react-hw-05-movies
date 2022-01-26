import PropTypes from 'prop-types';
import styles from './ReviewsItem.module.css';
const ReviewsItem = ({ id, author, content }) => {
  return (
    <li key={id} className={styles.review}>
      <h3 className={styles.author}> {author}</h3>
      <p>{content}</p>
    </li>
  );
};
ReviewsItem.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string,
  content: PropTypes.string,
};
export default ReviewsItem;
