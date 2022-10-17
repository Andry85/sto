import styles from  './Single.module.scss';
import SinglePost from '../../components/SinglePost/SinglePost';

const Single = () => {
    return (
        <div className={styles.single}>
            <SinglePost/>
        </div>
    );
}
export default Single;