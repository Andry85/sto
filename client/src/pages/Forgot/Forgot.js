import axios from "axios"
import { useState } from "react"
import styles from  './Forgot.module.scss';

/**
 * 
 */
const Forgot = () => {

    const [email, setEmail] = useState('');
    const [handleError, setHandleError] = useState(false);
    const [sucessMessage, setSucessMessage] = useState(false);
    


    const handleSubmit= (e) => {
        e.preventDefault();

        // Handle validations
        axios.post(`${process.env.REACT_APP_DOMAIN}/user/forgot`, {email})
        .then(response => {
            if (response) {
                    console.log(response.data.message);
                    setHandleError(false);
                    setSucessMessage(true);
                }
            }
        )
        .catch(error => {
            setHandleError(true);
            setSucessMessage(false);
        })
  
    }


    return (
        <div className={styles.page}>
            <form className={styles.pageForm} onSubmit={e => {handleSubmit(e)}}>
            
                <div className={styles.pageForm__row}>
                    <h2>Відновленя паролю</h2>
                    <p>Ввведіть електронну почту на яку вам буде відісланий ваш пароль</p>
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
                    <button className={styles.pageForm__register}>Відновити пароль</button>
                    {handleError && <p className={styles.pageForm__error}>Не корректні дані</p>}
                    {sucessMessage && <p className={styles.pageForm__sucess}>Новий пароль відправлений вам на почту</p>}
                </div>
            </form>
        </div>
    );
}

export default Forgot;