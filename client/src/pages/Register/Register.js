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
            <h2 className={styles.register__title}>Реєстрація</h2>
            <form className={styles.register__form} onSubmit={handleSubmit}>
                <label>Ім'я користувача:</label>
                <input type="text" 
                    placeholder="Введіть ваше ім'я..." 
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Email:</label>
                <input type="email" 
                    placeholder="Введіть ваш email..." 
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Пароль:</label>
                <input type="password" 
                    placeholder="Введіть ваш пароль..." 
                    onChange={e => setPassword(e.target.value)}
                />
                <button className={styles.register__registrBtn} type="submit">реєстрація</button>
            </form>
            <button className={styles.register__loginBtn}>
                <Link to="/login">Логін</Link>
            </button>
            {error && <span style={{color: 'red'}}>Щось пішло не так</span>}
        </div>
    );
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;
// #endregion

export default Register;