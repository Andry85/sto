import PropTypes from 'prop-types';
import styles from  './Footer.module.scss';


const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Footer = () => {
    return (
        <footer className={styles.footer}>
             <div className={styles.footer__container}>
                <div className={styles.footer__text}>parkovka.in.ua</div>
            </div>           
        </footer>
    );
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;
// #endregion

export default Footer;