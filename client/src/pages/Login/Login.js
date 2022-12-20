import React, { useEffect} from 'react';
import styles from  './Login.module.scss';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';





/**
 * 
 */
const Login = () => {



   const google = () => {
        //window.open(`${process.env.REACT_APP_DOMAIN}/auth/google`, "_self");
        window.location.replace(`${process.env.REACT_APP_DOMAIN}/auth/google`);
   }

   const facebook = () => {
    //window.open(`${process.env.REACT_APP_DOMAIN}/auth/facebook`, "_self");
    window.location.replace(`${process.env.REACT_APP_DOMAIN}/auth/facebook`);
}


    return (
        <div className={styles.login}>
            <div className={styles.login__alternative}>
                <div className={styles.loginBtnGoogle} onClick={google}>
                        <FcGoogle/>
                        <i>Google</i>
                </div>
                <div className={styles.loginBtnFacebook} onClick={facebook}>
                        <FaFacebook/>
                        <i>Facebook</i>
                </div>
            </div>
        </div>
    );
}

export default Login;