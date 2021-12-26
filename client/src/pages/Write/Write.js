import PropTypes from 'prop-types';
import styles from  './Write.module.scss';
import pic from './img/post.jpg';




const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Write = () => {
    return (
        <div className={styles.write}>
            <form className={styles.write__form}>
                <img className={styles.write__pic} src={pic} />
                <div className={styles.write__formGroup}>
                    <label className={styles.write__add} htmlFor="fileInput">
                        <i className="far fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display: "none"}}/>
                    <input className={styles.write__text} type="text" placeholder="Auto name" autoFocus={true} />
                </div>
                <div className={styles.write__formGroup}>
                    <textarea className={styles.write__textArea} rows="5" placeholder="Describe your auto"></textarea>
                </div>
                <button className={styles.write__submit}>Add</button>
            </form>
        </div>
    );
}

Write.propTypes = propTypes;
Write.defaultProps = defaultProps;
// #endregion

export default Write;