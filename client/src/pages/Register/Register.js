import axios from "axios"
import { useState } from "react"
import styles from  './Register.module.scss';


/**
 * 
 */
const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit= (e) => {
        e.preventDefault();

        // Handle validations
        axios.post(`${process.env.REACT_APP_DOMAIN}/user/register`, {username, email, password })
        .then(response => {
            console.log(response)
        // Handle response
        })
  
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
                        type="password" 
                        placeholder="ваш пароль" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.pageForm__row}>
                    <button className={styles.pageForm__register}>Зареєструватись</button>
                </div>
            </form>
        </div>
    );
}

export default Register;