import React, { useState, useEffect } from 'react';
import {axiosInstance} from '../../config';
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
    const [regionsName, setRegionsName] = useState('');
    const [locationName, setLocationName] = useState('');


    const filterAuto = (marka, model, regionName, locationName) => {
        setMarka(marka);
        setModel(model);
        setRegionsName(regionName);
        setLocationName(locationName);
    };

    const cleaerFilters = () => {
        setMarka(null);
        setModel(null);
        setRegionsName('');
        setLocationName('');
        window.location.reload(false);
    };


    useEffect(() => {

        const fetchPosts = async () => {
            const res = await axiosInstance.get('/posts');

            if (marka != null && model ==null && regionsName =='' && locationName =='') {
                const filterAutoByMarka = res.data.filter((item) => {
                    return item.marka === marka;
                });
                setPosts(filterAutoByMarka);
            } else if (marka != null && model !=null && regionsName =='' && locationName =='') {
                const filterAutoByMarkaModel = res.data.filter((item) => {
                    return item.marka === marka && item.model === model;
                });
                setPosts(filterAutoByMarkaModel);
            } else if (marka !=null && model !=null && regionsName !='' && locationName =='') {
                const filterAutoByMarkaModelRegionName = res.data.filter((item) => {
                    return item.marka === marka && item.model === model && item.regionsName === regionsName;
                });
                setPosts(filterAutoByMarkaModelRegionName);
            } else if (marka !=null && model !=null && regionsName !='' && locationName !='') {
                const filterAutoByMarkaModelRegionNameLocationName = res.data.filter((item) => {
                    return item.marka === marka && item.model === model && item.regionsName == regionsName && item.locationName == locationName;
                });
                setPosts(filterAutoByMarkaModelRegionNameLocationName);
               
            }  else if (marka ==null && model ==null && regionsName =='' && locationName =='') {
                setPosts(res.data);
            }
        };
        fetchPosts();

    }, [marka, model, regionsName, locationName])

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