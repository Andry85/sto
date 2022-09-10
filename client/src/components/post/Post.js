import styles from  './Post.module.scss';
import {Link} from 'react-router-dom';
import {REACT_APP_DOMAIN_VAR} from '../../host';



const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Post = ({post}) => {

    const PF = `${REACT_APP_DOMAIN_VAR}/images/`;

    return (
        <div className={styles.post}>
            <div className={styles.post__inner}>
                <header className={styles.post__header}>
                    <h2 className={styles.post__title}><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
                    {post.locationName && (
                         <div className={styles.post__location}>{post.locationName}</div>
                    )}
                </header>
                {post.files && (
                    <img className={styles.post__pic} src={PF + post.files[0]} />
                )}
                <footer className={styles.post__entry}>
                    {post.price && (
                        <div className={styles.post__price}>ціна: <span>{post.price} $</span></div>
                    )}
                    {post.race && (
                        <div className={styles.post__race}>пробіг: <b>{post.race}</b> тис. км</div>
                    )}
                </footer>
            </div>
            
            
            
        </div>
    );
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;
// #endregion

export default Post;