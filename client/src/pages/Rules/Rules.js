import PropTypes from 'prop-types';
import styles from  './Rules.module.scss';



const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Rules = () => {
    return (
        <div className={styles.rules}>
            <div className={styles.rules__box}>
                <p>Максимальне розміщення автомобілів одночасно складає 10 штук. Ви можете видалити свої старі оголошення і додати нові.</p>
            </div>
        </div>
    );
}

Rules.propTypes = propTypes;
Rules.defaultProps = defaultProps;
// #endregion

export default Rules;