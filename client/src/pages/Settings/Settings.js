import PropTypes from 'prop-types';
import styles from  './Settings.module.scss';
import avatar from './img/avatar.jpeg';
import Sidebar from '../../components/sidebar/Sidebar';




const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Settings = () => {
    return (
        <div className={styles.settings}>
            <div className={styles.settings__inner}>
                <div className={styles.settings__title}>
                    <span className={styles.settings__updateTitle}>Update Your Account</span>
                    <span className={styles.settings__deleteTitle}>Delete Account</span>
                </div>
                <form className={styles.settings__form}>
                    <label>Profile picture</label>
                    <div className={styles.settings__profilePicture}>
                        <img src={avatar} />
                        <label htmlFor="fileInput">
                            <i className="fas fa-user-cog"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display: "none"}} />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder="Peter"/>
                    <label>Email</label>
                    <input type="email" placeholder="test@gmail.com"/>
                    <label>Password</label>
                    <input type="password" placeholder="password"/>
                    <button className={styles.settings__btn}>Update</button>
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