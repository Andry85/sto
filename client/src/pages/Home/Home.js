import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from  './Home.module.scss';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import { useLocation } from 'react-router';


const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Home = () => {

    const [posts, setPosts] = useState([]);
    const {search} = useLocation();


    useEffect(() => {

        const fetchPosts = async () => {
            const res = await axios.get('/posts' + search);
            setPosts(res.data);
        };
        fetchPosts();

    }, [search])

    return (
        <div className={styles.home}>
            <div className={styles.home__container}>
                <Posts posts={posts} />
                <Sidebar/>
            </div>
        </div>
    );
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
// #endregion

export default Home;