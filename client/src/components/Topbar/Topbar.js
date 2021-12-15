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
                1
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