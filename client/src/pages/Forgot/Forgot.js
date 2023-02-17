import axios from "axios"
import { useState } from "react"
import styles from  './Forgot.module.scss';
import { Oval } from  'react-loader-spinner';

/**
 * 
 */
const Forgot = () => {

    const [email, setEmail] = useState('');
    const [handleError, setHandleError] = useState(false);
    const [sucessMessage, setSucessMessage] = useState(false);
    const [isLoadind, setIsLoadind] = useState(false);
    


    const handleSubmit= (e) => {
        e.preventDefault();
        setIsLoadind(true);

        // Handle validations
        axios.post(`${process.env.REACT_APP_DOMAIN}/user/forgot`, {email})
        .then(response => {
            if (response) {
                    console.log(response.data.message);
                    setHandleError(false);
                    setSucessMessage(true);
                    setIsLoadind(false);
                }
            }
        )
        .catch(error => {
            setHandleError(true);
            setSucessMessage(false);
            setIsLoadind(false);
        })
  
    }


    return (
        <div className={styles.page}>
            {isLoadind && (
                <div className={styles.page__loader}>
                    <Oval
                        height={80}
                        width={80}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    />
                </div>)
            }
                

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