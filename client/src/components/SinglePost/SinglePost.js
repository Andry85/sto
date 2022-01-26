import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from  './SinglePost.module.scss';





const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});

    useEffect(() => {
       const getPost = async () => {
           const res = await axios.get("/posts/" + path);
           setPost(res.data);
       };
       getPost();
    }, [path])

    return (
        <div className={styles.singlePost}>
            <div className={styles.singlePost__inner}>
                {post.photo && (
                    <img className={styles.singlePost__pic} src={post.photo} />
                )}
                
                <div className={styles.singlePost__title}>
                    <h1>{post.title}</h1>
                    <div className={styles.singlePost__action}>
                        <span className={styles.singlePost__edit}>
                            <i className="far fa-edit"></i>
                        </span>
                        <span className={styles.singlePost__delete}>
                        <i className="fal fa-trash-alt"></i>
                        </span>
                        
                    </div>
                </div>
                <div className={styles.singlePost__text}>
                    {post.description}
                </div>
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