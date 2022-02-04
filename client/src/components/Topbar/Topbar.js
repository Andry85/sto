import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from  './Topbar.module.scss';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Topbar = () => {
    const {user, dispatch} = useContext(Context);

    const handleLogout = () => {
        dispatch({type: "LOGOUT"});
    }

    return (
        <div className={styles.topbar}>
            <div  className={styles.topbar__colLeft}>
                <ul>
                    <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
                    <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
                    <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                </ul>
            </div>
            <div className={styles.topbar__colCenter}>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/write">Add auto</Link>
                    </li>
                    <li onClick={handleLogout}>
                        {user && "Log Out"}
                    </li>
                </ul>
            </div>
            <div className={styles.topbar__colRight}>
                {user ? (
                    <img src={user.profilePic} />
                ): (
                    <ul>
                         <li>
                            <Link to="/login">Login</Link>
                         </li>
                         <li>
                            <Link to="/register">Register</Link>
                         </li>
                    </ul>    
                )}
                
                <i className="fas fa-search"></i>
            </div>
        </div>
    );
}

Topbar.propTypes = propTypes;
Topbar.defaultProps = defaultProps;
// #endregion

export default Topbar;