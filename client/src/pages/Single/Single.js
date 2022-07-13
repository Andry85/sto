import PropTypes from 'prop-types';
import styles from  './Single.module.scss';
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
        </div>
    );
}

Single.propTypes = propTypes;
Single.defaultProps = defaultProps;
// #endregion

export default Single;