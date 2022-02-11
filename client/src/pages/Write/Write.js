import React, { useState, useEffect, useRef, useContext, Component } from 'react';
import Select from 'react-select'
import PropTypes from 'prop-types';
import styles from  './Write.module.scss';
import axios from 'axios';
import { Context } from '../../context/Context';

const options1 = [
    {value: 'one', label: 'One'},
    {value: 'two', label: 'Two'}
  ];

const options2 = [
{value: 'one-a', label: 'One A', link: 'one'},
{value: 'one-b', label: 'One B', link: 'one'},
{value: 'two-a', label: 'Two A', link: 'two'},
{value: 'two-b', label: 'Two B', link: 'two'}
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
    // const [marka, setMarka] = useState('');
    // const [model, setModel] = useState('');
    const [marka, setMarka] = useState({});
    const [model, setModel] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            username: user.username,
            title,
            description: desc,
            price,
            location,
            race,
            marka,
            model
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
        console.log(selectedOption)
        setMarka(selectedOption);
        console.log('marka', marka)
    };
    
    const handleChange2 = (selectedOption) => {
        setModel({model: selectedOption})
    }

    const filteredOptions = options2.filter((o) => {

        // console.log(o);
        // console.log(selectedOption.value);

        return  o.link === marka.value
    });
       
    

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
                    {marka.value}
                    <Select
                        value={marka.value}
                        onChange={handleChange1}
                        options={options1}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Auto model</label>
                    <Select
                        value={model.value}
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