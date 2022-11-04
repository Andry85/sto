import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
             <div className={styles.footer__container}>
                <div className={styles.footer__text}>parkovka.in.ua</div>
            </div>           
        </footer>
    );
}
export default Footer;