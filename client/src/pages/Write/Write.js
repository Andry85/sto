import React, { useState, useEffect, useRef, useContext, Component } from 'react';
import Select from 'react-select'
import PropTypes from 'prop-types';
import styles from  './Write.module.scss';
import axios from 'axios';
import { Context } from '../../context/Context';

const options1 = [
    {value: 'seat', label: 'Seat'},
    {value: 'renault', label: 'Renault'}
  ];

const options2 = [
    {value: 'alhambra', label: 'Alhambra', link: 'seat'},
    {value: 'alhambra', label: 'Altea', link: 'seat'},
    {value: 'altea_xl', label: 'Altea XL', link: 'seat'},
    {value: 'captur', label: 'Captur', link: 'renault'},
    {value: 'clio', label: 'Clio', link: 'renault'},
    {value: 'clio_grandtour', label: 'Clio Grandtour', link: 'renault'},
];




const propTypes = {};

const defaultProps = {};

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


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            username: user.username,
            title,
            description: desc,
            price,
            location,
            race,
            marka: optionMarka.value,
            model: optionModel.value,
        }

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

    const filteredOptions = options2.filter((o) => o.link === optionMarka.selectedOption?.value);
       
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
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="Auto name" 
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Auto marka</label>
                    <Select
                        value={optionMarka.value}
                        onChange={handleChange1}
                        options={options1}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Auto model</label>
                    <Select
                        value={optionModel.value}
                        onChange={handleChange2}
                        options={filteredOptions}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="Auto price" 
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="Auto race" 
                        onChange={e => setRace(e.target.value)}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="Auto location" 
                        onChange={e => setLocation(e.target.value)}
                    />
                </div>
                <div className={styles.write__formGroup}>
                    <textarea 
                        className={styles.write__textArea} 
                        rows="5" 
                        placeholder="Describe your auto"
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className={styles.write__submit} type="submit">Add</button>
            </form>
        </div>
    );
}

Write.propTypes = propTypes;
Write.defaultProps = defaultProps;
// #endregion

export default Write;