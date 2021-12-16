import PropTypes from 'prop-types';
import styles from  './Topbar.module.scss';


const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Topbar = () => {
    return (
        <div className={styles.topbar}>
            <div  className={styles.topbar__colLeft}>
                <ul>
                    <li><a href="#"><i class="fab fa-twitter-square"></i></a></li>
                    <li><a href="#"><i class="fab fa-facebook-square"></i></a></li>
                    <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                </ul>
            </div>
            <div  className={styles.topbar__colCenter}>
                2
            </div>
            <div  className={styles.topbar__colRight}>
                3
            </div>
        </div>
    );
}

Topbar.propTypes = propTypes;
Topbar.defaultProps = defaultProps;
// #endregion

export default Topbar;