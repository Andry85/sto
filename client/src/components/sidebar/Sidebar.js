import PropTypes from 'prop-types';
import styles from  './Sidebar.module.scss';

const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
           <h2 className={styles.sidebar__title}>Model</h2>
            <ul className={styles.sidebarList}>
                <li><a href="">BMW</a></li>
                <li>Mazda</li>
                <li>Mersedes</li>
                <li>Audi</li>
            </ul>
        </div>
    );
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
// #endregion

export default Sidebar;