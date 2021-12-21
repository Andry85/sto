import PropTypes from 'prop-types';
import Post from '../post/Post';
import styles from  './Posts.module.scss';




const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Posts = () => {
    return (
        <div className={styles.posts}>
           <Post/>
           <Post/>
           <Post/>
           <Post/>
           <Post/>
           <Post/>
        </div>
    );
}

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;
// #endregion

export default Posts;