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
    const [postCount, setPostCount] = useState(0);


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

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const user = urlParams.get('user')


    useEffect(() => {

        const fetchPosts = async () => {
        
            const res = await axiosInstance.get('/posts', {
                params: {
                  user
                }
            });


            if (
                marka
                && model === undefined 
                && regionsName === '' 
                && locationName === '' 
                && yearFrom === '' 
                && yearTo === '') {
                const filterAutoByMarka = res.data.filter((item) => {
                    return item.marka === marka;
                });
                setPosts(filterAutoByMarka);
                setPostCount(filterAutoByMarka.length); 
            } else if (
                marka
                && model
                && regionsName === '' 
                && locationName === '' 
                && yearFrom === '' 
                && yearTo === '') {
                const filterAutoByMarkaModel = res.data.filter((item) => {
                    return item.marka === marka 
                        && item.model === model;
                });
                setPosts(filterAutoByMarkaModel);
                setPostCount(filterAutoByMarkaModel.length); 
            } else if (
                marka
                && model
                && regionsName !== '' 
                && locationName === '' 
                && yearFrom === '' 
                && yearTo === '') {
                const filterAutoByMarkaModelRegionName = res.data.filter((item) => {
                    return item.marka === marka 
                        && item.model === model 
                        && item.regionsName === regionsName;
                });
                setPosts(filterAutoByMarkaModelRegionName);
                setPostCount(filterAutoByMarkaModelRegionName.length); 
            } else if (
                marka
                && model
                && regionsName !== '' 
                && locationName !== '' 
                && yearFrom === '' 
                && yearTo === '') {
                const filterAutoByMarkaModelRegionNameLocationName = res.data.filter((item) => {
                    return item.marka === marka 
                        && item.model === model 
                        && item.regionsName === regionsName 
                        && item.locationName === locationName;
                });
                setPosts(filterAutoByMarkaModelRegionNameLocationName);
                setPostCount(filterAutoByMarkaModelRegionNameLocationName.length); 
            } else if (
                marka
                && model 
                && regionsName !== '' 
                && locationName !== '' 
                && yearFrom !== '' 
                && yearTo === '') {
                const filterAutoByMarkaModelRegionNameLocationNameYearFrom = res.data.filter((item) => {
                    return item.marka === marka 
                        && item.model === model 
                        && item.regionsName === regionsName 
                        && item.locationName === locationName 
                        && item.year >= yearFrom;
                });
                setPosts(filterAutoByMarkaModelRegionNameLocationNameYearFrom);
                setPostCount(filterAutoByMarkaModelRegionNameLocationNameYearFrom.length); 
            } else if (
                marka
                && model
                && regionsName !== '' 
                && locationName !== '' 
                && yearFrom !== '' 
                && yearTo !== '') {
                const filterAutoByMarkaModelRegionNameLocationNameYearFromyearTo = res.data.filter((item) => {
                    return item.marka === marka 
                        && item.model === model 
                        && item.regionsName === regionsName 
                        && item.locationName === locationName 
                        && item.year >= yearFrom 
                        && item.year <= yearTo;
                });
                setPosts(filterAutoByMarkaModelRegionNameLocationNameYearFromyearTo);
                setPostCount(filterAutoByMarkaModelRegionNameLocationNameYearFromyearTo.length); 
            } else if (
                marka === undefined 
                && model === undefined 
                && regionsName === '' 
                && locationName === '' 
                && yearFrom !== '' 
                && yearTo === '') {
                const filterYearFrom = res.data.filter((item) => {
                    return item.year >= yearFrom;
                });
                setPosts(filterYearFrom);
                setPostCount(filterYearFrom.length); 
            } else if (
                marka === undefined 
                && model === undefined 
                && regionsName ==='' 
                && locationName === '' 
                && yearFrom === '' 
                && yearTo !== '') {
                const filterYearTo = res.data.filter((item) => {
                    return item.year <= yearTo;
                });
                setPosts(filterYearTo);
                setPostCount(filterYearTo.length); 
            } else if (
                marka === undefined 
                && model === undefined 
                && regionsName === '' 
                && locationName === '' 
                && yearFrom !== '' 
                && yearTo !== '') {
                const filterYearFromTo = res.data.filter((item) => {
                    return item.year >= yearFrom 
                    && item.year <= yearTo;
                });
                setPosts(filterYearFromTo);
                setPostCount(filterYearFromTo.length); 
            } else if (
                marka
                && model === undefined 
                && regionsName === '' 
                && locationName === '' 
                && yearFrom !== '' 
                && yearTo === '') {
                const filterMarkaYearFrom = res.data.filter((item) => {
                    return item.marka === marka 
                    && item.year >= yearFrom;
                });
                setPosts(filterMarkaYearFrom);
                setPostCount(filterMarkaYearFrom.length); 
            } else if (
                marka 
                && model 
                && regionsName === '' 
                && locationName === '' 
                && yearFrom !== '' 
                && yearTo === '') {
                const filterMarkaModelYearFrom = res.data.filter((item) => {
                    return item.marka === marka 
                        && item.model === model 
                        && item.year >= yearFrom;
                });
                setPosts(filterMarkaModelYearFrom);
                setPostCount(filterMarkaModelYearFrom.length); 
            } else if (
                marka
                && model === undefined 
                && regionsName === '' 
                && locationName === '' 
                && yearFrom !== '' 
                && yearTo !== '') {
                const filterMarkaYearFromTo = res.data.filter((item) => {
                    return item.marka === marka 
                    && item.year >= yearFrom 
                    && item.year <= yearTo;
                });
                setPosts(filterMarkaYearFromTo);
                setPostCount(filterMarkaYearFromTo.length); 
            } else if (
                marka
                && model 
                && regionsName === '' 
                && locationName === '' 
                && yearFrom !== '' 
                && yearTo !== '') {
                const filterMarkaModelYearFromTo = res.data.filter((item) => {
                    return item.marka === marka 
                        && item.model === model 
                        && item.year >= yearFrom 
                        && item.year <= yearTo;
                });
                setPosts(filterMarkaModelYearFromTo);
                setPostCount(filterMarkaModelYearFromTo.length); 
            } else if (
                marka
                && model 
                && regionsName === '' 
                && locationName === '' 
                && yearFrom === '' 
                && yearTo !== '') {
                const filterMarkaModelYearTo = res.data.filter((item) => {
                    return item.marka === marka 
                        && item.model === model 
                        && item.year <= yearTo;
                });
                setPosts(filterMarkaModelYearTo);
                setPostCount(filterMarkaModelYearTo.length); 
            } else if (
                marka
                && model === undefined 
                && regionsName === '' 
                && locationName === '' 
                && yearFrom === '' 
                && yearTo !== '') {
                const filterMarkaYearTo = res.data.filter((item) => {
                    return item.marka === marka && item.year <= yearTo;
                });
                setPosts(filterMarkaYearTo);
                setPostCount(filterMarkaYearTo.length); 
            } else if (
                marka === undefined 
                && model === undefined 
                && regionsName !== '' 
                && locationName === '' 
                && yearFrom === '' 
                && yearTo === '') {
                const filterRegionsName = res.data.filter((item) => {
                    return item.regionsName === regionsName;
                });
                setPosts(filterRegionsName);
                setPostCount(filterRegionsName.length); 
            } else if (
                marka === undefined 
                && model === undefined 
                && regionsName !=='' 
                && locationName !=='' 
                && yearFrom === '' 
                && yearTo === '') {
                const filterRegionsNameLocationName = res.data.filter((item) => {
                    return item.regionsName === regionsName 
                        && item.locationName === locationName;
                });
                setPosts(filterRegionsNameLocationName);
                setPostCount(filterRegionsNameLocationName.length); 
            }  else if (
                marka === null
                && model === null
                && regionsName === '' 
                && locationName === '' 
                && yearFrom === '' 
                && yearTo === '') {
                    setPosts(res.data);  
                    setPostCount(res.data.length);              
            }
            
        };
        fetchPosts();

    }, [marka, model, regionsName, locationName, yearFrom, yearTo, queryString])



    return (
        <div className={styles.home}>
            <div className={styles.home__container}>
                <Posts posts={posts} />
                <Sidebar filterAuto={filterAuto} cleaerFilters={cleaerFilters} postCount={postCount}/>
            </div>
        </div>
    );
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
// #endregion

export default Home;