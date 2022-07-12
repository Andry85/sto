import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState, useContext  } from 'react';
import axios from 'axios';
import styles from  './SinglePost.module.scss';
import { Context } from '../../context/Context';
import Slider from "react-slick";






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
    const [locationAuto, setLocationAuto] = useState('');
    const [price, setPtice] = useState('');
    const [race, setRace] = useState('');
    const [files, setFiles] = useState([]);


    useEffect(() => {
       const getPost = async () => {
           const res = await axios.get("/posts/" + path);
           setPost(res.data);
           setTitle(res.data.title);
           setDescription(res.data.description);
           setLocationAuto(res.data.location);
           setPtice(res.data.price);
           setRace(res.data.race);
           setFiles(res.data.files);
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };

    return (
        <div className={styles.singlePost}>
            <div className={styles.singlePost__inner}>
                <div className={styles.singlePost__slider}>
                    <Slider {...settings}>
                        {files.map((item, index) =>(
                            <div key={index}>
                                <img src={`${PF}/${item}`} alt="" />
                            </div>
                        ))} 
                    </Slider>
                </div>
                
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

                <div className={styles.singlePost__row}>
                    <label>Локація:</label>
                    {updateMod ? <input type="text" 
                        value={locationAuto} 
                        className={styles.singlePost__input}
                        autoFocus
                        onChange={(e) => setLocationAuto(e.target.value)} 
                         /> : (
                        <>
                            <div className={styles.singlePost__col}>
                                {locationAuto}
                            </div>
                        </>

                     )}  
                </div>

                <div className={styles.singlePost__row}>
                    <label>Ціна:</label>
                    {updateMod ? <input type="text" 
                        value={price} 
                        className={styles.singlePost__input}
                        autoFocus
                        onChange={(e) => setPtice(e.target.value)} 
                         /> : (
                        <>
                            <div className={styles.singlePost__col}>
                                {price}
                            </div>
                        </>

                     )}  
                </div>

                <div className={styles.singlePost__row}>
                    <label>Пробіг:</label>
                    {updateMod ? <input type="text" 
                        value={race} 
                        className={styles.singlePost__input}
                        autoFocus
                        onChange={(e) => setRace(e.target.value)} 
                         /> : (
                        <>
                            <div className={styles.singlePost__col}>
                                {race}
                            </div>
                        </>

                     )}  
                </div>

                {updateMod && (
                    <button className={styles.singlePost__btn} onClick={handleUpdate}>Оновити</button>
                )}

                <div className={styles.singlePost__info}>
                    <span className={styles.singlePost__authot}>
                        <i>Автор: </i>
                        <Link to={`/?user=${post.username}`}>
                            <i>{post.username}</i>
                        </Link>
                        
                    </span>
                    <span className={styles.singlePost__date}>
                    {new Date(post.createdAt).getDate()}
                    .
                    {new Date(post.createdAt).getMonth()}
                    .
                    {new Date(post.createdAt).getFullYear()}
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