import React, {useContext, useState, useEffect} from 'react';
import styles from  './Topbar.module.scss';
import {Link} from 'react-router-dom';
import {axiosInstance} from '../../config';
import {useDispatch } from 'react-redux';
import allActions from '../../actions';

/**
 * 
 */
const Topbar = () => {

    const user = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {

        const fetchPosts = async () => {
            const res = await axiosInstance.get('/posts');
            setPosts(res.data);
            
        };
        fetchPosts();

    }, [])


    let numberOfPosts = 0;
    const maximumLimit = 11;

    if (userName) {
        for (const post of posts) {
            if (userName === post.username) {
                numberOfPosts++
            }
        }
    }




    const handleLogout = () => {
        dispatch(allActions.userActions.logOut());
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        window.location.replace('/');
    }

    const handleMuPosts = (e) => {
        e.preventDefault();
        window.location.replace(`/?user=${userName}`);
    }

    const handleMainPage = () => {
        window.location.replace('/');
    }


    

    return (
        <div className={styles.topbar}>
            <div className={styles.topbar__colCenter}>
                <ul>
                    <li>
                        <div onClick={handleMainPage}>
                            <span className={styles.logo}></span>
                        </div>
                    </li>
                    <li>

                        {user && numberOfPosts < maximumLimit ? (<Link to="/write">Додати авто</Link>) : (
                            ''
                        )}

                    </li>
                    <li>
                        {user && (
                            <button  className={styles.myPosts}  onClick={handleMuPosts}>Мої оголошення</button>
                        )}
                    </li>
                </ul>
            </div>
            <div className={styles.topbar__colRight}>
                {user ? (
                    <>
                        <i className={styles.topbar__userName}>{userName}</i>
                        <span className={styles.topbar__logout} onClick={handleLogout}>{user && "Вийти"}</span>
                    </>
                ): (
                    <ul>
                         <li>
                            <Link to="/login">Логін</Link>
                         </li>
                         <li>
                            <Link to="/register">Реєстрація</Link>
                         </li>
                    </ul>    
                )}
            </div>
        </div>
    );
}


export default Topbar;