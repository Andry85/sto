import styles from  './Post.module.scss';
import {Link} from 'react-router-dom';


/**
 * 
 */
const Post = ({post}) => {

    const PF = `${process.env.REACT_APP_DOMAIN}/images/`;

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
                    <img className={styles.post__pic} src={PF + post.files[0]} alt="" />
                )}
                <footer className={styles.post__entry}>
                    {post.price && (
                        <div className={styles.post__price}>price: <span>{post.price} $</span></div>
                    )}
                    {post.race && (
                        <div className={styles.post__race}>race: <b>{post.race}</b> tkm.</div>
                    )}
                </footer>
            </div>
            
            
            
        </div>
    );
}

export default Post;