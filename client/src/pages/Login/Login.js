import React from 'react';
import GoogleButton from 'react-google-button'
import styles from  './Login.module.scss';
import {REACT_APP_DOMAIN_VAR} from '../../host';



/**
 * 
 */
const Login = () => {


    const google = () => {
        window.open(`${REACT_APP_DOMAIN_VAR}/auth/google`, '_self');
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__alternative}>
                <GoogleButton
                onClick={google}
                />
            </div>
        </div>
    );
}

export default Login;