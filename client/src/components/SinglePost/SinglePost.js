import PropTypes from 'prop-types';
import styles from  './SinglePost.module.scss';
import pic from './img/post.jpg';




const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const SinglePost = () => {
    return (
        <div className={styles.singlePost}>
            <div className={styles.singlePost__inner}>
                <img className={styles.singlePost__pic} src={pic} />
                <div className={styles.singlePost__title}>
                    <h1>Кар сервіс Лтд</h1>
                    <div className={styles.singlePost__action}>
                        <span className={styles.singlePost__edit}>
                            <i className="far fa-edit"></i>
                        </span>
                        <span className={styles.singlePost__delete}>
                        <i className="fal fa-trash-alt"></i>
                        </span>
                        
                    </div>
                </div>
                <div className={styles.singlePost__text}>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

    Why do we use it?
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

    </p>
                </div>
                <div className={styles.singlePost__info}>
                    <span className={styles.singlePost__authot}>
                        Автор: <i>Peter Pen</i>
                    </span>
                    <span className={styles.singlePost__date}>
                        1 час назад
                    </span>
                </div>
                
                
            </div>
        </div>
    );
}

SinglePost.propTypes = propTypes;
SinglePost.defaultProps = defaultProps;
// #endregion

export default SinglePost;