import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState, useContext  } from 'react';
import axios from 'axios';
import styles from  './SinglePost.module.scss';
import {GoogleContext} from '../../context/Context';
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
    const [marka, setMarka] = useState('');
    const [model, setModel] = useState('');
    const [phone, setPhone] = useState('');
    const [regionsName, setRegionsName] = useState('');
    const [locationName, setLocationName] = useState('');
    const user = useContext(GoogleContext);



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
           setMarka(res.data.marka);
           setModel(res.data.model);
           setPhone(res.data.phone);
           setRegionsName(res.data.regionsName);
           setLocationName(res.data.locationName);
       };
       getPost();
       
    }, [path])

    
    const PF = `${process.env.REACT_APP_DOMAIN}/images/`;
   


    const handleDelete = async () => {

        try {
            await axios.delete(`/posts/${post._id}` , {
                data: {username: user.id}
            });
            window.location.replace('/');
        } catch (err) {

        } 
    }

    const handleUpdate = async () => {

        try {
            await axios.put(`/posts/${post._id}` , { 
                username: user.id,
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
        arrows: true,
        adaptiveHeight: true
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
                            {post.username === user?.id && (
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
                    <label>Марка:</label>
                    <div className={styles.singlePost__col}>
                        {marka}
                    </div>
                </div>

                <div className={styles.singlePost__row}>
                    <label>Модель:</label>
                    <div className={styles.singlePost__col}>
                        {model}
                    </div>
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

                <div className={styles.singlePost__row}>
                    <label>Регіон:</label>
                    {updateMod ? <input type="text" 
                        value={regionsName} 
                        className={styles.singlePost__input}
                        autoFocus
                        onChange={(e) => setRegionsName(e.target.value)} 
                         /> : (
                        <>
                            <div className={styles.singlePost__col}>
                                {regionsName}
                            </div>
                        </>

                     )}  
                </div>

                <div className={styles.singlePost__row}>
                    <label>Населений пункт:</label>
                    {updateMod ? <input type="text" 
                        value={locationName} 
                        className={styles.singlePost__input}
                        autoFocus
                        onChange={(e) => setLocationName(e.target.value)} 
                         /> : (
                        <>
                            <div className={styles.singlePost__col}>
                                {locationName}
                            </div>
                        </>

                     )}  
                </div>

                <div className={styles.singlePost__row}>
                    <label>Телефон:</label>
                    {updateMod ? <input type="text" 
                        value={phone} 
                        className={styles.singlePost__input}
                        autoFocus
                        onChange={(e) => setPhone(e.target.value)} 
                         /> : (
                        <>
                            <div className={styles.singlePost__col}>
                                {phone}
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