import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from  './Settings.module.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { Context } from '../../context/Context';
import axios from 'axios';




const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Settings = () => {

    const {user, dispatch}  = useContext(Context)
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const PF = "http://localhost:5000/images/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"})

        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            updatedUser.profilePic = filename;

            try {
                await axios.post('/upload', data);
            } catch(err) {

            }
        }

        try {
            const res = await axios.put('/users/' + user._id, updatedUser);
            setSuccess(true);
            dispatch({type: "UPDATE_SUCCESS", payload: res.data})
        } catch(err) {
            dispatch({type: "UPDATE_FAILURE"})
        } 

    }

    return (
        <div className={styles.settings}>
            <div className={styles.settings__inner}>
                <div className={styles.settings__title}>
                    <span className={styles.settings__updateTitle}>Update Your Account</span>
                    <span className={styles.settings__deleteTitle}>Delete Account</span>
                </div>
                <form className={styles.settings__form} onSubmit={handleSubmit}>
                    <label>Profile picture</label>
                    <div className={styles.settings__profilePicture}>
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} />

                        <label htmlFor="fileInput">
                            <i className="fas fa-user-cog"></i>
                        </label>
                        <input 
                            type="file" 
                            id="fileInput" 
                            style={{display: "none"}} 
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input 
                        type="text" 
                        placeholder={user.username} 
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder={user.email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className={styles.settings__btn} type="submit">Update</button>
                    {success && (
                        <span style={{color: 'green'}}>Profile has been updated...</span>
                    )}
                </form>
            </div>
           <Sidebar/>
        </div>
    );
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
// #endregion

export default Settings;