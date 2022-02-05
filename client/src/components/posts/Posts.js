import PropTypes from 'prop-types';
import Post from '../post/Post';
import styles from  './Posts.module.scss';




const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Posts = ({posts}) => {


    return (
        <div className={styles.postsCom}>
            {posts.map((p) =>(
                <Post post={p}/>
            ))}      
        </div>
    );
}

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;
// #endregion

export default Posts;