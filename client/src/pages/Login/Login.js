import React from 'react';
import GoogleButton from 'react-google-button'
import styles from  './Login.module.scss';



/**
 * 
 */
const Login = () => {


    // const google = () => {
    //     window.open(`${process.env.REACT_APP_DOMAIN}/auth/google`, '_self');
    // }

    return (
        <div className={styles.login}>
            <div className={styles.login__alternative}>
                <a href={`${process.env.REACT_APP_DOMAIN}/auth/google`}>
                    <GoogleButton/>
                </a>
            </div>
        </div>
    );
}

export default Login;