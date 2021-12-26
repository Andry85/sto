import PropTypes from 'prop-types';
import styles from  './Topbar.module.scss';
import avatar from './img/avatar.jpeg';

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
                        <a href="#">Main</a>
                    </li>
                    <li>
                        <a href="#">Add auto</a>
                    </li>
                    <li>
                        <a href="#">Sing out</a>
                    </li>
                </ul>
            </div>
            <div className={styles.topbar__colRight}>
                <img src={avatar} />
                <i className="fas fa-search"></i>
            </div>
        </div>
    );
}

Topbar.propTypes = propTypes;
Topbar.defaultProps = defaultProps;
// #endregion

export default Topbar;