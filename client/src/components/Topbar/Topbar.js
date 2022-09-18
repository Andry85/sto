import React, {useContext, useState, useEffect} from 'react';
import styles from  './Topbar.module.scss';
import {Link} from 'react-router-dom';
import {GoogleContext} from '../../context/Context';
import {axiosInstance} from '../../config';
import { GoogleLogout } from 'react-google-login';


/**
 * 
 */
const Topbar = () => {
    const user = useContext(GoogleContext);
    const [posts, setPosts] = useState([]);

    const clientId="58800646258-eq8uhldgmpvhvenfd73cuu12o95b9brc.apps.googleusercontent.com";

    

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

    



    const logout = (response) => {
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
                            <Link to={`/?user=${user.sub}`}>Мої оголошення</Link>
                        )}
                    </li>
                    <li className={styles.topbar__logout}>
                        {user && 
                            <GoogleLogout
                                clientId={clientId}
                                buttonText="Logout"
                                onLogoutSuccess={logout}
                            >
                            </GoogleLogout>
                        }
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