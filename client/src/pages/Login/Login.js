import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
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
            <h2 className={styles.login__title}>Login</h2>
            <form className={styles.login__form} onSubmit={handleSubmit}>
                <label>Username:</label>
                <input 
                    type="text" 
                    placeholder="Enter your username..." 
                    ref={userRef}
                />
                <label>Password:</label>
                <input 
                    type="password" 
                    placeholder="Enter your password..." 
                    ref={passwordRef}
                />
                <button className={styles.login__loginBtn} type="submit" disabled={isFetching}>Login</button>
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