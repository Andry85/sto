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
    const [marks, setMarks] = useState([]);

    useEffect(() => {

        const setMarks = async () => {
            const respond = await axios.get('/marks');
            setMarks(respond.data);
        }
        setMarks();
       
    }, [])

    return (
        <div className={styles.sidebar}>
           <h2 className={styles.sidebar__title}>Марка авто</h2>
            <ul className={styles.sidebarList}>
                {marks.map(marka => (
                  
                    <li>
                         <Link to={`/?marka=${marka.name}`}>{marka.name}</Link>
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