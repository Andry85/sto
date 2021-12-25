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
           <h2 className={styles.sidebar__title}>Міста</h2>
            <ul className={styles.sidebarList}>
                <li><a href="">Київ</a></li>
                <li>Харків</li>
                <li>Одеса</li>
                <li>Вінниця</li>
            </ul>
        </div>
    );
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
// #endregion

export default Sidebar;