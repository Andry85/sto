import React, {useContext, useState, useEffect} from 'react';
import styles from  './Topbar.module.scss';
import {Link} from 'react-router-dom';
import {GoogleContext} from '../../context/Context';
import {axiosInstance} from '../../config';


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

    for (const post of posts) {
        if (user.id === post.username) {
            numberOfPosts++
        }
    }

    

    const handleLogout = () => {
        window.open(`${process.env.REACT_APP_DOMAIN}/auth/logout`, '_self');
    }


    return (
        <div className={styles.topbar}>
            <div className={styles.topbar__colCenter}>
                <ul>
                    <li>
                        <Link to="/">Головна</Link>
                    </li>
                    <li>

                        {user && numberOfPosts < maximumLimit ? (<Link to="/write">Додати авто</Link>) : (
                            <Link to="/rules">Правила</Link>
                        )}

                    </li>
                    <li>
                        {user && (
                            <Link to={`/?user=${user.id}`}>Мої оголошення</Link>
                        )}
                    </li>
                    <li className={styles.topbar__logout} onClick={handleLogout}>
                        {user && "Вийти"}
                    </li>
                </ul>
            </div>
            <div className={styles.topbar__colRight}>
                {user ? (
                    <img src={user.photos[0].value} />
                    
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