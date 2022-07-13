import React, {useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from  './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import Select from 'react-select'
import {marksOfCars, modelsOfCars} from '../../statics/marks_models';

const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Sidebar = ({filterAuto}) => {


    const [optionMarka, setOptionMarka] = useState({});
    const [optionModel, setOptionModel] = useState({});

    useEffect(() => {

       
       
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

        filterAuto(optionMarka.selectedOption?.label, optionModel.optionModel?.label);

    }

    return (
        <div className={styles.sidebar}>
            <form className={styles.write__form} onSubmit={handleSubmit}>
                <div className={styles.sidebar__Row}>
                    <label>Марка авто</label>
                    <Select
                        value={optionMarka.value}
                        onChange={handleChange1}
                        options={marksOfCars}
                    />
                </div>
                <div className={styles.sidebar__Row}>
                    <label>Модель авто</label>
                    <Select
                        value={optionModel.value}
                        onChange={handleChange2}
                        options={filteredOptions}
                    />
                </div>
                <button className={styles.sidebar__submit} type="submit">Пошук</button>
            </form>
        </div>
    );
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
// #endregion

export default Sidebar;