import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from  './Login.module.scss';



const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Login = () => {
    return (
        <div className={styles.login}>
            <h2 className={styles.login__title}>Login</h2>
            <form className={styles.login__form}>
                <label>Email</label>
                <input type="email" placeholder="Enter your email..." />
                <label>PAssword</label>
                <input type="password" placeholder="Enter your password..." />
                <button className={styles.login__loginBtn}>Login</button>
            </form>
            <button className={styles.login__registrBtn}>
                <Link to="/register">Register</Link>
            </button>
        </div>
    );
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
// #endregion

export default Login;