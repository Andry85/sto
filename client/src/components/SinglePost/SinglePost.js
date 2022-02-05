import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState, useContext  } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from  './SinglePost.module.scss';
import { Context } from '../../context/Context';





const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [updateMod, setUpdateMod] = useState(false);

    useEffect(() => {
       const getPost = async () => {
           const res = await axios.get("/posts/" + path);
           setPost(res.data);
           setTitle(res.data.title);
           setDescription(res.data.description);
       };
       getPost();
    }, [path])

    const PF = "http://localhost:5000/images/";
    const {user} = useContext(Context);

    const handleDelete = async () => {

        try {
            await axios.delete(`/posts/${post._id}` , {
                data: {username: user.username}
            });
            window.location.replace('/');
        } catch (err) {

        } 
    }

    const handleUpdate = async () => {

        try {
            await axios.put(`/posts/${post._id}` , { 
                username: user.username,
                title,
                description
            });
            setUpdateMod(false);
        } catch (err) {

        } 

    }

    return (
        <div className={styles.singlePost}>
            <div className={styles.singlePost__inner}>
                {post.photo && (
                    <img className={styles.singlePost__pic} src={PF + post.photo} />
                )}
                
                <div className={styles.singlePost__title}>
                    {updateMod ? <input type="text" 
                        value={title} 
                        className={styles.singlePost__titleInput}
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)} 
                         /> : (
                        <>
                            <h1>{title}</h1>
                            {post.username === user?.username && (
                                <div className={styles.singlePost__action}>
                                    <span className={styles.singlePost__edit} onClick={() => setUpdateMod(true)}>
                                        <i className="far fa-edit"></i>
                                    </span>
                                    <span className={styles.singlePost__delete} onClick={handleDelete}>
                                        <i className="fal fa-trash-alt"></i>
                                    </span>
                                    
                                </div>
                            )}
                        </>

                     )}  
                </div>

                {updateMod ? <textarea value={description} className={styles.singlePost__textArea} onChange={(e) => setDescription(e.target.value)} /> : (
                    <div className={styles.singlePost__text}>
                        {description}
                    </div>
                )}

                {updateMod && (
                    <button className={styles.singlePost__btn} onClick={handleUpdate}>Update</button>
                )}

                <div className={styles.singlePost__info}>
                    <span className={styles.singlePost__authot}>
                        Author: 
                        <Link to={`/?user=${post.username}`}>
                            <i>{post.username}</i>
                        </Link>
                        
                    </span>
                    <span className={styles.singlePost__date}>
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>
                
                
            </div>
        </div>
    );
}

SinglePost.propTypes = propTypes;
SinglePost.defaultProps = defaultProps;
// #endregion

export default SinglePost;