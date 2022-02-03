import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from  './Register.module.scss';
import axios from 'axios';



const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)

        try {
           
            const res = await axios.post('/auth/register', {
                username,
                email,
                password
            });

            res.data && window.location.replace('/login');

        } catch (err) {
            setError(true)
            console.log(err);
        }

       

       

    }

    return (
        <div className={styles.register}>
            <h2 className={styles.register__title}>Register</h2>
            <form className={styles.register__form} onSubmit={handleSubmit}>
                <label>User name</label>
                <input type="text" 
                    placeholder="Enter your user name..." 
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input type="email" 
                    placeholder="Enter your email..." 
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input type="password" 
                    placeholder="Enter your password..." 
                    onChange={e => setPassword(e.target.value)}
                />
                <button className={styles.register__registrBtn} type="submit">Register</button>
            </form>
            <button className={styles.register__loginBtn}>
                <Link to="/login">Login</Link>
            </button>
            {error && <span style={{color: 'red'}}>Someting went wrong</span>}
        </div>
    );
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;
// #endregion

export default Register;