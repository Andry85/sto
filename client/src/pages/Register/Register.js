import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from  './Register.module.scss';



const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Register = () => {
    return (
        <div className={styles.register}>
            <h2 className={styles.register__title}>Register</h2>
            <form className={styles.register__form}>
                <label>User name</label>
                <input type="text" placeholder="Enter your user name..." />
                <label>Email</label>
                <input type="email" placeholder="Enter your email..." />
                <label>Password</label>
                <input type="password" placeholder="Enter your password..." />
                <button className={styles.register__registrBtn}>Register</button>
            </form>
            <button className={styles.register__loginBtn}>
                <Link to="/login">Login</Link>
            </button>
        </div>
    );
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;
// #endregion

export default Register;