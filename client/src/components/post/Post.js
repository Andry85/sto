import PropTypes from 'prop-types';
import styles from  './Post.module.scss';
import pic from './img/post.jpg';



const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Post = () => {
    return (
        <div className={styles.post}>
            <div className={styles.post__inner}>
                <img className={styles.post__pic} src={pic} />
                <div className={styles.post__cat}>
                    <span>Київ</span>
                </div>
            </div>
            <h2 className={styles.post__title}>Кар сервіс Лтд</h2>
            <div className={styles.post__info}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
        </div>
    );
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;
// #endregion

export default Post;