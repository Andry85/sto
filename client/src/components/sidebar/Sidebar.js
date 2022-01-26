import React, {useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from  './Sidebar.module.scss';
import { Link } from 'react-router-dom';

const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Sidebar = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {

        const getCats = async () => {
            const respond = await axios.get('/categories');
            setCats(respond.data);
        }
        getCats();
       
    }, [])

    return (
        <div className={styles.sidebar}>
           <h2 className={styles.sidebar__title}>Model</h2>
            <ul className={styles.sidebarList}>
                {cats.map(cat => (
                  
                    <li>
                         <Link to={`/?cat=${cat.name}`}>{cat.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
// #endregion

export default Sidebar;