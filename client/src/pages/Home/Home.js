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
    const [yearFrom, setYearFrom] = useState('');
    const [yearTo, setYearTo] = useState('');


    const filterAuto = (marka, model, regionName, locationName, yearFrom, yearTo) => {
        setMarka(marka);
        setModel(model);
        setRegionsName(regionName);
        setLocationName(locationName);
        setYearFrom(yearFrom);
        setYearTo(yearTo);
    };

    const cleaerFilters = () => {
        setMarka(null);
        setModel(null);
        setRegionsName('');
        setLocationName('');
        window.location.reload(false);
    };

    console.log(yearFrom);
    console.log(yearTo);


    useEffect(() => {

        const fetchPosts = async () => {
            const res = await axiosInstance.get('/posts');

            console.log(res.data);


            if (marka != null && model ==null && regionsName =='' && locationName =='' && yearFrom =='' && yearTo =='') {
                const filterAutoByMarka = res.data.filter((item) => {
                    return item.marka === marka;
                });
                setPosts(filterAutoByMarka);
            } else if (marka != null && model !=null && regionsName =='' && locationName =='' && yearFrom =='' && yearTo =='') {
                const filterAutoByMarkaModel = res.data.filter((item) => {
                    return item.marka === marka && item.model === model;
                });
                setPosts(filterAutoByMarkaModel);
            } else if (marka !=null && model !=null && regionsName !='' && locationName =='' && yearFrom =='' && yearTo =='') {
                const filterAutoByMarkaModelRegionName = res.data.filter((item) => {
                    return item.marka === marka && item.model === model && item.regionsName === regionsName;
                });
                setPosts(filterAutoByMarkaModelRegionName);
            } else if (marka !=null && model !=null && regionsName !='' && locationName !='' && yearFrom =='' && yearTo =='') {
                const filterAutoByMarkaModelRegionNameLocationName = res.data.filter((item) => {
                    return item.marka === marka && item.model === model && item.regionsName == regionsName && item.locationName == locationName;
                });
                setPosts(filterAutoByMarkaModelRegionNameLocationName);
               
            } else if (marka !=null && model !=null && regionsName !='' && locationName !='' && yearFrom !='' && yearTo =='') {
                const filterAutoByMarkaModelRegionNameLocationNameYearFrom = res.data.filter((item) => {
                    return item.marka === marka && item.model === model && item.regionsName == regionsName && item.locationName == locationName && item.year >= yearFrom;
                });
                setPosts(filterAutoByMarkaModelRegionNameLocationNameYearFrom);
               
            }   else if (marka ==null && model ==null && regionsName =='' && locationName =='' && yearFrom =='' && yearTo =='') {
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