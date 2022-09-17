import React from 'react';
import styles from  './Login.module.scss';
import { GoogleLogin } from '@react-oauth/google';




/**
 * 
 */
const Login = () => {

    return (
        <div className={styles.login}>
            <div className={styles.login__alternative}>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    window.open(`${process.env.REACT_APP_DOMAIN}/auth/google`, '_self');
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            </div>
        </div>
    );
}

export default Login;