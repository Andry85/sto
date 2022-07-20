import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import GoogleButton from 'react-google-button'
import styles from  './Login.module.scss';
import axios from 'axios';



const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Login = () => {

    const userRef = useRef();
    const passwordRef = useRef();
    const {user, dispatch, isFetching} = useContext(Context);

    const google = () => {
        window.open("http://localhost:5000/api/auth/google", '_self');
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});

        try {
            const res = await axios.post('/auth/login/', {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });

            dispatch({type: "LOGIN_SUCCESS", payload: res.data});

        } catch(error) {
            dispatch({type: "LOGIN_FAILURE"});
        }

    }

    return (
        <div className={styles.login}>
            <h2 className={styles.login__title}>Логін</h2>
            <form className={styles.login__form} onSubmit={handleSubmit}>
                <label>Ім'я користувача:</label>
                <input 
                    type="text" 
                    placeholder="Введіть ваше ім'я..." 
                    ref={userRef}
                />
                <label>Пароль:</label>
                <input 
                    type="password" 
                    placeholder="Введіть ваш пароль..." 
                    ref={passwordRef}
                />
                <button className={styles.login__loginBtn} type="submit" disabled={isFetching}>Логін</button>
            </form>

            <div className={styles.login__alternative}>
                <span className={styles.login__alternativeTitle}>або</span>
                <GoogleButton
                onClick={google}
                />
            </div>

            <button className={styles.login__registrBtn}>
                <Link to="/register">Реєстрація</Link>
            </button>
        </div>
    );
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
// #endregion

export default Login;