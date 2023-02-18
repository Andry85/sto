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
                marka !== undefined 
                && model === undefined 
                && regionsName === '' 
                && locationName === '' 
                && yearFrom === '' 
                && yearTo === '') {
                    

                const filterAutoByMarka = res.data.filter((item) => {
                    return item.marka === marka;
                });
                setPosts(filterAutoByMarka);
            } else if (
                marka !== undefined 
                && model !== undefined 
                && regionsName === '' 
                && locationName === '' 
                && yearFrom === '' 
                && yearTo === '') {
                const filterAutoByMarkaModel = res.data.filter((item) => {
                    return item.marka === marka 
                        && item.model === model;
                });
                setPosts(filterAutoByMarkaModel);
            } else if (
                marka !== undefined 
                && model !== undefined 
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
            } else if (
                marka !== undefined 
                && model !== undefined 
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
               
            } else if (
                marka !== undefined 
                && model !== undefined 
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
               
            } else if (
                marka !== undefined 
                && model !== undefined 
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
               
            } else if (
                marka !== undefined 
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
               
            } else if (
                marka !== undefined 
                && model !== undefined 
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
               
            } else if (
                marka !== undefined 
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
               
            } else if (
                marka !== undefined 
                && model !== undefined 
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
               
            } else if (
                marka !== undefined 
                && model !== undefined 
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
               
            } else if (
                marka !== undefined 
                && model === undefined 
                && regionsName === '' 
                && locationName === '' 
                && yearFrom === '' 
                && yearTo !== '') {
                const filterMarkaYearTo = res.data.filter((item) => {
                    return item.marka === marka && item.year <= yearTo;
                });
                setPosts(filterMarkaYearTo);
               
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
               
            }  else if (
                marka === (undefined || null)
                && model === (undefined || null)
                && regionsName === '' 
                && locationName === '' 
                && yearFrom === '' 
                && yearTo === '') {
                    setPosts(res.data);                 
            }
        };
        fetchPosts();

    }, [marka, model, regionsName, locationName, yearFrom, yearTo, queryString])



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