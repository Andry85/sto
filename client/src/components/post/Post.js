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
                <h2 className={styles.post__title}><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
                {post.photo && (
                    <img className={styles.post__pic} src={PF + post.photo} />
                )}
                 {post.marka && (
                    <div className={styles.post__cat}>
                        {post.marka.map((m)=> (
                            <span>{m.name}</span>
                        ))} 
                    </div>
                )}
                <div className={styles.post__entry}>
                    {post.price && (
                        <div className={styles.post__price}>{post.price}</div>
                    )}
                    {post.race && (
                        <div className={styles.post__race}>Race: {post.race}</div>
                    )}
                </div>
            </div>
            
            
            
        </div>
    );
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;
// #endregion

export default Post;