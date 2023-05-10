import React, {useEffect, useState } from 'react';
import styles from  './Sidebar.module.scss';
import Select from 'react-select';
import {marksOfCars, modelsOfCars, yearsCar} from '../../util/carsUtil';
import {mapOfUkraine} from '../../util/regions';



/**
 * 
 */
const Sidebar = ({filterAuto, cleaerFilters, postCount}) => {


    const [optionMarka, setOptionMarka] = useState({});
    const [optionModel, setOptionModel] = useState({});
    const [regions, setRegions] = useState([]);
    const [location, setLocation] = useState([]);
    const [regionsName, setRegionsName] = useState('');
    const [locationName, setLocationName] = useState('');
    const [yearProductionFrom, setYearProductionFrom] = useState('');
    const [yearProductionTo, setYearProductionTo] = useState('');

    

    useEffect(() => {
        setRegions(mapOfUkraine);
    }, [])

    const handleChange1 = (selectedOption) => {
        setOptionMarka({selectedOption});
    };
    
    const handleChange2 = (selectedOption) => {
        setOptionModel({optionModel: selectedOption})
    }

    const filteredOptions = modelsOfCars.filter((o) => o.link === optionMarka.selectedOption?.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        filterAuto(optionMarka.selectedOption?.label, optionModel.optionModel?.label, regionsName, locationName, yearProductionFrom, yearProductionTo);

    }

    const handleChangeRegions = (e) => {
        setLocation(regions[e.target.value].data);
        setRegionsName(regions[e.target.value].name);
    }

    const handleChangeLocation = (e) => {
        setLocationName(e.target.value);
    }

    const handleYearProductionFrom = (selectedOption) => {
        setYearProductionFrom(selectedOption.label);
    }

    const handleYearProductionTo = (selectedOption) => {
        setYearProductionTo(selectedOption.label);
    }



    return (
        <div className={styles.sidebar}>
            <form className={styles.write__form} onSubmit={handleSubmit}>
                <div className={styles.sidebar__Row}>
                    <label>Car brand</label>
                    <Select
                        value={optionMarka.value}
                        onChange={handleChange1}
                        options={marksOfCars}
                        placeholder={'Select'}
                    />
                </div>
                <div className={styles.sidebar__Row}>
                    <label>Car model</label>
                    <Select
                        value={optionModel.value}
                        onChange={handleChange2}
                        options={filteredOptions}
                        placeholder={'Select'}
                    />
                </div>

                <div className={styles.sidebar__Row}>
                    <label>Year of manufacture</label>
                    <div className={styles.sidebar__RowBox}>
                        <div className={styles.sidebar__RowBoxContainer}>
                            <div className={styles.sidebar__RowBoxTitle}>From</div>
                            <Select
                                value={yearProductionFrom.label}
                                onChange={handleYearProductionFrom}
                                options={yearsCar}
                                placeholder={'Select'}
                            />
                        </div>
                    </div>
                    <div className={styles.sidebar__RowBox}>
                        <div className={styles.sidebar__RowBoxContainer}>
                            <div className={styles.sidebar__RowBoxTitle}>To</div>
                            <Select
                                value={yearProductionTo.label}
                                onChange={handleYearProductionTo}
                                options={yearsCar}
                                placeholder={'Select'}
                            />
                        </div>
                    </div>
                    
                </div>

                <div className={styles.sidebar__Row}>
                    <label>Region:</label>
                    <div className={styles.sidebar__RowSelect}>
                        <select onChange={handleChangeRegions}>
                            {regions && regions.map((item, index) =>(
                                <option value={index} key={index}>{item.name}</option>
                            ))} 
                        </select>
                    </div>
                </div>
                <div className={styles.sidebar__Row}>
                    <label>Location:</label>
                    <div className={styles.sidebar__RowSelect}>            
                        <select value={locationName} onChange={handleChangeLocation}>
                            {location && location.map((item, index) =>(
                                <option value={item.name} key={index}>{item.name}</option>
                            ))} 
                        </select>
                    </div>
                </div>

                <div className={styles.sidebar__RowBottom}>
                    <button className={styles.sidebar__submit} type="submit">Search ({postCount && postCount})</button>
                    <button className={styles.sidebar__clear} type="button" onClick={cleaerFilters}>
                        <span>Clean the filter</span>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}


export default Sidebar;