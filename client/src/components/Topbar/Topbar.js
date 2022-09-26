import React, {useContext, useState, useEffect} from 'react';
import styles from  './Topbar.module.scss';
import {Link} from 'react-router-dom';
import {GoogleContext} from '../../context/Context';
import {axiosInstance} from '../../config';
import axios from "axios";


/**
 * 
 */
const Topbar = () => {
    const user = useContext(GoogleContext);
    const [posts, setPosts] = useState([]);


    useEffect(() => {

        const fetchPosts = async () => {
            const res = await axiosInstance.get('/posts');
            setPosts(res.data);
            
        };
        fetchPosts();

    }, [])


    let numberOfPosts = 0;
    const maximumLimit = 11;

    if (user) {
        for (const post of posts) {
            if (user.sub === post.username) {
                numberOfPosts++
            }
        }
    }

    



    const handleLogout = () => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/auth/logout`, {
            withCredentials: true 
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        window.location.replace('/');
    }


    

    return (
        <div className={styles.topbar}>
            <div className={styles.topbar__colCenter}>
                <ul>
                    <li>
                        <Link to="/">
                            <span className={styles.logo}></span>
                        </Link>
                    </li>
                    <li>

                        {user && numberOfPosts < maximumLimit ? (<Link to="/write">Додати авто</Link>) : (
                            <Link to="/rules">Правила</Link>
                        )}

                    </li>
                    <li>
                        {user && (
                            <Link to={`/?user=${user.sub}`}>Мої оголошення</Link>
                        )}
                    </li>
                    <li className={styles.topbar__logout} onClick={handleLogout}>
                        {user && "Вийти"}
                    </li>
                </ul>
            </div>
            <div className={styles.topbar__colRight}>
                {user ? (
                    <img src={user.picture} />
                    
                ): (
                    <ul>
                         <li>
                            <Link to="/login">Логін</Link>
                         </li>
                    </ul>    
                )}
            </div>
        </div>
    );
}


export default Topbar;