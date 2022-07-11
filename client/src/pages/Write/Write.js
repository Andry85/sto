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
    const [file, setFile] = useState(null);
    const {user} = useContext(Context);
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [race, setRace] = useState('');
    const [optionMarka, setOptionMarka] = useState({});
    const [optionModel, setOptionModel] = useState({});
    const [yearProduction, setYearProduction] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();

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
        }

        console.log(newPost);

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            newPost.photo = filename;

            try {
                await axios.post('/upload', data);
            } catch(err) {

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
            {file &&
                <img className={styles.write__pic} src={URL.createObjectURL(file)} />
            }
            <form className={styles.write__form} onSubmit={handleSubmit}>
                <div className={styles.write__formGroup}>
                    <label className={styles.write__add} htmlFor="fileInput">
                        <i className="far fa-plus"></i>
                    </label>
                    <input 
                        type="file" 
                        id="fileInput" 
                        style={{display: "none"}} 
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <span>Додати фото</span>
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