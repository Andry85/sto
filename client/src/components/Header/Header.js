import PropTypes from 'prop-types';
import styles from  './Header.module.scss';
import headerPic from './img/bg.jpg'


const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Header = () => {
    return (
        <div className={styles.header}>
             <div className={styles.header__container}>
                <div className={styles.header__title}>СТО твого міста</div>
                <img src={headerPic} />
            </div>           
        </div>
    );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
// #endregion

export default Header;