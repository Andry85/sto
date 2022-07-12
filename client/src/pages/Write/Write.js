import React, { useState, useEffect, useRef, useContext, Component } from 'react';
import Select from 'react-select'
import PropTypes from 'prop-types';
import styles from  './Write.module.scss';
import axios from 'axios';
import { Context } from '../../context/Context';
import {yearsCar} from '../../statics/years';
import {marksOfCars, modelsOfCars} from '../../statics/marks_models';


/**
 * 
 */
const Write = () => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const {user} = useContext(Context);
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [race, setRace] = useState('');
    const [optionMarka, setOptionMarka] = useState({});
    const [optionModel, setOptionModel] = useState({});
    const [yearProduction, setYearProduction] = useState({});
    const [files, setFiles] = useState([]);
    const filesNames = [];

    const onChange = e => {
        setFiles(e.target.files)
    };

    const handleCloseIcon = e => {
        const filesFiltered = Object.values(files).filter((item, index) => {
            return index != e.target.dataset.index;
        });
        setFiles(filesFiltered);

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const element of files) {
            filesNames.push(element.name);
        }

        const newPost = {
            username: user.username,
            title,
            description: desc,
            price,
            location,
            race,
            marka: optionMarka.selectedOption.label,
            model: optionModel.optionModel.label,
            year: yearProduction.label,
            files: filesNames,
        }

        if (files) {
            const formData = new FormData();
            Object.values(files).forEach(file=>{
                formData.append("uploadImages", file);
            });

            try {
                const res = await axios.post('/upload', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    },
                });
                console.log(res);
            } catch (err) {
                if (err.response.status === 500) {
                    console.log(err);
                } else {
                    console.log(err.response.data.msg);
                }
            }

        }

        try {
            const res = await axios.post('/posts', newPost);
            window.location.replace('/post/' + res.data._id);
        } catch(err) {

        } 

    }

    const handleChange1 = (selectedOption) => {
        setOptionMarka({selectedOption});
    };
    
    const handleChange2 = (selectedOption) => {
        setOptionModel({optionModel: selectedOption})
    }

    const handleYearProduction = (selectedOption) => {
        setYearProduction({yearProduction})
    }

    const filteredOptions = modelsOfCars.filter((o) => o.link === optionMarka.selectedOption?.value);
       
    return (
        <div className={styles.write}>
            <form className={styles.write__form} onSubmit={handleSubmit}>
                <div className={styles.write__formGroup}>
                    <div className={styles.write__formGroupFile}>
                        <label htmlFor="file" className={styles.write__formGroupFileLabel}>
                            <i className="fa fa-cloud-upload"></i>Upload photos
                        </label>
                        <input
                            type='file'
                            id='file'
                            name="uploadImages"
                            multiple
                            onChange={onChange}
                        />
                        <ul>
                            {Object.values(files) && Object.values(files).map((item, index) =>(
                                <li key={index}>
                                    <span>{item.name}</span>
                                    <span data-index={index} className={styles.write__formGroupFileDelete} onClick={handleCloseIcon}>
                                    </span>
                                </li>
                            ))} 
                        </ul>
                        
                    </div>
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Навзва авто</label>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="Назва авто" 
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Марка авто</label>
                    <Select
                        value={optionMarka.value}
                        onChange={handleChange1}
                        options={marksOfCars}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Модель авто</label>
                    <Select
                        value={optionModel.value}
                        onChange={handleChange2}
                        options={filteredOptions}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Рік випуску</label>
                    <Select
                        value={yearProduction.label}
                        onChange={handleYearProduction}
                        options={yearsCar}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="Ціна авто" 
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="Пробіг авто тисяч км." 
                        onChange={e => setRace(e.target.value)}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="Ваш населений пункт" 
                        onChange={e => setLocation(e.target.value)}
                    />
                </div>
                <div className={styles.write__formGroup}>
                    <textarea 
                        className={styles.write__textArea} 
                        rows="5" 
                        placeholder="Опишіть ваше авто"
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className={styles.write__submit} type="submit">Додати</button>
            </form>
        </div>
    );
}


// #endregion

export default Write;