import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from  './Topbar.module.scss';
import { Link } from 'react-router-dom';
import { Context, GoogleContext } from '../../context/Context';

const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Topbar = () => {
    const user = useContext(GoogleContext);
    
    console.log(user);

    const handleLogout = () => {
        window.open("http://localhost:5000/auth/logout", '_self');
    }

    let PF;
    if (process.env.NODE_ENV === 'production') {
        PF = "http://mysite.com/images/";
    } else {
        PF = "http://localhost:5000/images/";
    }

    return (
        <div className={styles.topbar}>
            <div className={styles.topbar__colCenter}>
                <ul>
                    <li>
                        <Link to="/">Головна</Link>
                    </li>
                    <li>
                        <Link to="/write">Додати авто</Link>
                    </li>
                    <li className={styles.topbar__logout} onClick={handleLogout}>
                        {user && "Вийти"}
                    </li>
                </ul>
            </div>
            <div className={styles.topbar__colRight}>
                {user ? (
                    <Link to="/settings">
                        <img src={user.photos[0].value} />
                    </Link>
                    
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

Topbar.propTypes = propTypes;
Topbar.defaultProps = defaultProps;
// #endregion

export default Topbar;