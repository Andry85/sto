import React, { useEffect} from 'react';
import styles from  './Login.module.scss';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';



/**
 * 
 */
const Login = () => {


    const clientId="58800646258-eq8uhldgmpvhvenfd73cuu12o95b9brc.apps.googleusercontent.com";

    useEffect(() => {
       gapi.load("client:auth2", () => {
        gapi.auth2.init({
            clientId: clientId
        })
       });
    }, [])

    const responseSuccessGoogle = (response) => {

        axios.post(`${process.env.REACT_APP_DOMAIN}/auth/login/success`, {
            idToken: response.tokenId
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
          });
        window.location.replace('/');
    }

    const responseErrorGoogle = (response) => {
        console.log(response);
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__alternative}>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
            />
            </div>
        </div>
    );
}

export default Login;