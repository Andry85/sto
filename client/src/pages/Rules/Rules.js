import styles from  './Rules.module.scss';

const Rules = () => {
    return (
        <div className={styles.rules}>
            <div className={styles.rules__box}>
                <p>Максимальне розміщення автомобілів одночасно складає 10 штук. Ви можете видалити свої старі оголошення і додати нові.</p>
            </div>
        </div>
    );
}
export default Rules;