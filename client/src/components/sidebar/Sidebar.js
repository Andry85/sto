import React, {useEffect, useState } from 'react';
import styles from  './Sidebar.module.scss';
import Select from 'react-select'
import {marksOfCars, modelsOfCars} from '../../statics/marks_models';

const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Sidebar = ({filterAuto, cleaerFilters}) => {


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
                <div className={styles.sidebar__RowBottom}>
                    <button className={styles.sidebar__submit} type="submit">Пошук</button>
                    <button className={styles.sidebar__clear} type="button" onClick={cleaerFilters}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
// #endregion

export default Sidebar;