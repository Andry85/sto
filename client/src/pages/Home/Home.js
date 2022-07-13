import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from  './Home.module.scss';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';


const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Home = () => {

    const [posts, setPosts] = useState([]);
    const [marka, setMarka] = useState(null);
    const [model, setModel] = useState(null);


    const filterAuto = (marka, model) => {
        setMarka(marka);
        setModel(model);
    };

    const cleaerFilters = () => {
        setMarka(null);
        setModel(null);
    };


    useEffect(() => {

        const fetchPosts = async () => {
            const res = await axios.get('/posts');

            if (marka != null && model == null) {
                const filterAutoByMarka = res.data.filter((item, index) => {
                    return item.marka === marka;
                });
                setPosts(filterAutoByMarka);
            } else if (model != null && marka == null) {
                const filterAutoByModel = res.data.filter((item, index) => {
                    return item.model === model;
                });
                setPosts(filterAutoByModel);
            } else if (model != null && marka != null) {
                const filterAutoByMarkaAndModel = res.data.filter((item, index) => {
                    return item.model === model && item.marka === marka;
                });
                setPosts(filterAutoByMarkaAndModel);
            } else {
                setPosts(res.data);
            }


        };
        fetchPosts();
        

    }, [marka, model])

    return (
        <div className={styles.home}>
            <div className={styles.home__container}>
                <Posts posts={posts} />
                <Sidebar filterAuto={filterAuto} cleaerFilters={cleaerFilters}/>
            </div>
        </div>
    );
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
// #endregion

export default Home;