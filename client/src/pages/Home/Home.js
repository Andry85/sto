import PropTypes from 'prop-types';
import styles from  './Home.module.scss';
import Header from '../../components/Header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';


const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Home = () => {
    return (
        <div className={styles.home}>
            <div className={styles.home__container}>
                <Posts/>
                <Sidebar/>
            </div>
        </div>
    );
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
// #endregion

export default Home;