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
                    <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
                    <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
                    <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                </ul>
            </div>
            <div  className={styles.topbar__colCenter}>
                <ul>
                    <li>
                        <a href="#">Головна</a>
                    </li>
                    <li>
                        <a href="#">Додати СТО</a>
                    </li>
                    <li>
                        <a href="#">Вийти</a>
                    </li>
                </ul>
            </div>
            <div  className={styles.topbar__colRight}>
                <i class="fas fa-search"></i>
            </div>
        </div>
    );
}

Topbar.propTypes = propTypes;
Topbar.defaultProps = defaultProps;
// #endregion

export default Topbar;