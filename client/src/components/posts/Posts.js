import Post from '../post/Post';
import styles from  './Posts.module.scss';

const Posts = ({posts}) => {


    return (
        <div className={styles.postsCom}>
            {posts.map((p) =>(
                <Post key={p._id} post={p}/>
            ))}      
        </div>
    );
}
export default Posts;