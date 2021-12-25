import PropTypes from 'prop-types';
import styles from  './Single.module.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import SinglePost from '../../components/SinglePost/SinglePost';



const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Single = () => {
    return (
        <div className={styles.single}>
            <SinglePost/>
            <Sidebar/>
        </div>
    );
}

Single.propTypes = propTypes;
Single.defaultProps = defaultProps;
// #endregion

export default Single;