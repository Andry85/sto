import axios from "axios"
import { useState } from "react"
import styles from  './Register.module.scss';
import { AiOutlineEyeInvisible,  AiOutlineEye} from "react-icons/ai";


/**
 * 
 */
const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSubmit= (e) => {
        e.preventDefault();

        // Handle validations
        axios.post(`${process.env.REACT_APP_DOMAIN}/user/register`, {username, email, password, withCredentials: true })
        .then(response => {
            console.log(response);
            window.location.replace('/login');
        // Handle response
        })
  
    }

    const changePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }


    return (
        <div className={styles.page}>

            <form className={styles.pageForm} onSubmit={e => {handleSubmit(e)}}>
                <div className={styles.pageForm__row}>
                    <label>Введіть ваше ім'я</label>
                    <input 
                        type="text" 
                        placeholder="ваше ім'я" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        />
                </div>
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
                    <button className={styles.pageForm__register}>Зареєструватись</button>
                </div>
            </form>
        </div>
    );
}

export default Register;