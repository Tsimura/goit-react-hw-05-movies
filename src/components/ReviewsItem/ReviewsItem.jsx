import PropTypes from 'prop-types';
import styles from './ReviewsItem.module.css';
const ReviewsItem = ({ author, content }) => {
  return (
    <li className={styles.review}>
      <h3 className={styles.author}> {author}</h3>
      <p>{content}</p>
    </li>
  );
};
ReviewsItem.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
};
export default ReviewsItem;
