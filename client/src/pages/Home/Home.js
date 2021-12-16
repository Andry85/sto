import PropTypes from 'prop-types';
import styles from  './Home.module.scss';
import Header from '../../components/Header/Header';


const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Home = () => {
    return (
        <div className={styles.home}>
            <Header/>
        </div>
    );
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
// #endregion

export default Home;