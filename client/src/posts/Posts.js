import PropTypes from 'prop-types';
import styles from  './Posts.module.scss';



const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Posts = () => {
    return (
        <div className={styles.posts}>
           posts
        </div>
    );
}

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;
// #endregion

export default Posts;