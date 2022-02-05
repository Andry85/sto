import PropTypes from 'prop-types';
import styles from  './Post.module.scss';
import {Link} from 'react-router-dom';



const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Post = ({post}) => {

    const PF = "http://localhost:5000/images/";
    

    return (
        <div className={styles.post}>
            <div className={styles.post__inner}>
                {post.photo && (
                    <img className={styles.post__pic} src={PF + post.photo} />
                )}
                <div className={styles.post__cat}>
                    {post.categories.map((c)=> (
                        <span>{c.name}</span>
                    ))} 
                </div>
            </div>
            
            <h2 className={styles.post__title}><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
            <div className={styles.post__info}>{post.description}</div>
        </div>
    );
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;
// #endregion

export default Post;