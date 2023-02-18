import axios from "axios"
import { useState } from "react"
import {useDispatch } from 'react-redux'
import styles from  './Login.module.scss';
import allActions from '../../actions';
import {Link} from 'react-router-dom';
import { AiOutlineEyeInvisible,  AiOutlineEye} from "react-icons/ai";


/**
 * 
 */
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [handleError, setHandleError] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    
    const dispatch = useDispatch();


    const handleSubmit= (e) => {
        e.preventDefault();

        // Handle validations
        axios.post(`${process.env.REACT_APP_DOMAIN}/user/login`, {email, password })
        .then(response => {
            if (response) {

                    console.log(response);

                    dispatch(allActions.userActions.setUser({
                        name: response.data.username 
                    }));
                    localStorage.setItem("userEmail", response.data.email);
                    localStorage.setItem("userName", response.data.username);
                    window.location.replace('/');
                }
            }
        )
        .catch(error => {
            setHandleError(true);
        })
  
    }

    const changePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }


    return (
        <div className={styles.page}>
            <form className={styles.pageForm} onSubmit={e => {handleSubmit(e)}}>
                <div className={styles.pageForm__row}>
                    <label>Введіть ваш emal</label>
                    <input 
                        type="email" 
                        placeholder="ваш email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.pageForm__row}>
                    <label>Введіть ваш пароль</label>
                    <input 
                        type={isPasswordVisible ? 'text': 'password'}
                        placeholder="ваш пароль" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className={styles.pageForm__eye} onClick={changePasswordVisibility}>
                        {isPasswordVisible ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }
                    </div>
                </div>
                <div className={styles.pageForm__row}>
                    <Link className={styles.pageForm__forgot} to="/forgot">забули пароль</Link>
                </div>
                <div className={styles.pageForm__row}>
                    <button className={styles.pageForm__register}>Вхід</button>
                </div>
                {handleError && <p className={styles.pageForm__error}>Не корректні дані</p>}
            </form>
        </div>
    );
}

export default Login;