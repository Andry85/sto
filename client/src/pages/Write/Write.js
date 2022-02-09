import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from  './Write.module.scss';
import axios from 'axios';
import { Context } from '../../context/Context';




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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            username: user.username,
            title,
            description: desc,
            price
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
                <div className={styles.write__formGroup}>
                    <textarea 
                        className={styles.write__textArea} 
                        rows="5" 
                        placeholder="Describe your auto"
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <div className={styles.write__formGroupRow}>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="Auto price" 
                        onChange={e => setPrice(e.target.value)}
                    />
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