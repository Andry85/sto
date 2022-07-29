import React, {useContext } from 'react';
import styles from  './Topbar.module.scss';
import {Link} from 'react-router-dom';
import {GoogleContext} from '../../context/Context';


/**
 * 
 */
const Topbar = () => {
    const user = useContext(GoogleContext);

    const handleLogout = () => {
        window.open(`${process.env.HOST}/auth/logout`, '_self');
    }


    return (
        <div className={styles.topbar}>
            <div className={styles.topbar__colCenter}>
                <ul>
                    <li>
                        <Link to="/">Головна</Link>
                    </li>
                    <li>
                        {user && (
                            <Link to="/write">Додати авто</Link>
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