import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState, useContext  } from 'react';
import {axiosInstance} from '../../config';
import styles from  './SinglePost.module.scss';
import {mapOfUkraine} from '../../util/regions';
import Slider from "react-slick";
import Select from 'react-select';
import {marksOfCars, modelsOfCars, yearsCar} from '../../util/carsUtil';
import { useSelector} from 'react-redux';


const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [updateMod, setUpdateMod] = useState(false);
    const [price, setPtice] = useState('');
    const [race, setRace] = useState('');
    const [files, setFiles] = useState([]);
    const [marka, setMarka] = useState('');
    const [model, setModel] = useState('');
    const [phone, setPhone] = useState('');
    const [regionsName, setRegionsName] = useState('');
    const [locationName, setLocationName] = useState('');
    const filesNames = [];
    const [filesNew, setFilesnew] = useState([]);
    const [yearProduction, setYearProduction] = useState({});
    const [pseudonime, setPseudonime] = useState('');
    const [regions, setRegions] = useState([]);
    const [locationdata, setLocationdata] = useState([]);
    const [optionMarka, setOptionMarka] = useState({});
    const [optionModel, setOptionModel] = useState({});
    const [yearOfCar, setYearOfCar] = useState('');
    const [decodedDescription, setDecodedDescription] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const userName = localStorage.getItem("userName");


    
    useEffect(() => {
       const getPost = async () => {
           const res = await axiosInstance.get("/posts/" + path);
           setPost(res.data);
           setTitle(res.data.title);
           setDescription(res.data.description);
           setPtice(res.data.price);
           setRace(res.data.race);
           setFiles(res.data.files);
           setMarka(res.data.marka);
           setModel(res.data.model);
           setPhone(res.data.phone);
           setRegionsName(res.data.regionsName);
           setLocationName(res.data.locationName);
           setYearOfCar(res.data.year);
           setPseudonime(res.data.pseudonime); 

       };
       getPost();
       
    }, [path]);

    useEffect(() => {
        setRegions(mapOfUkraine);   
    }, []);

    useEffect(() => {
        const decodeDescription = () => {
            const arrtextDesc = [];
            description.split('<br>').map((item, key) => {
                arrtextDesc.push(`${item}\n`);
            });
            setDecodedDescription(arrtextDesc.join(''));
        }
        decodeDescription();
        
    }, [description]);


    const PF = `${process.env.REACT_APP_DOMAIN}/images/`;

    const handleDelete = async () => {

        try {
            await axiosInstance.delete(`/posts/${post._id}` , {
                data: {username: userName}
            });
            window.location.replace('/');
        } catch (err) {

        } 
    }

    const handleUpdate = async () => {

        const d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth();
        let minutes = d.getMinutes();

        for (const element of files) {
            filesNames.push(element);
        }

        for (const element of filesNew) {
            filesNames.push(`${year}-${month}-${minutes}-${element.name}`);
        }

        
        if (files) {
            const formData = new FormData();
            Object.values(filesNew).forEach(file=>{
                formData.append("uploadImages", file);
            });

            try {
                await axiosInstance.post('/upload', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    },
                });
            } catch (err) {
                if (err.response.status === 500) {
                    console.log(err);
                } else {
                    console.log(err.response.data.msg);
                }
            }

        }

        try {
            await axiosInstance.put(`/posts/${post._id}` , { 
                username: userName,
                title,
                description: editedDescription,
                files: filesNames,
                price: price,
                race: race,
                regionsName,
                locationName,
                marka: optionMarka.selectedOption?.label,
                model: optionModel.optionModel?.label,
                year: yearProduction.selectedOption?.label,
            });
            setUpdateMod(false);
            window.location.replace('/post/' + post._id);
        } catch (err) {

        } 

    }

    const handleDeleteModel = async (e) => {
        const filesFiltered = Object.values(files).filter((item, index) => {
            return index !== parseInt(e.target.dataset.index);
        });
        setFiles(filesFiltered);

        try {
            await axiosInstance.delete(`/deleteImg/${e.target.dataset.name}`);
        } catch (err) {

        } 

    };

    const handleDeleteModelNewFiles = e => {
        const filesFiltered = Object.values(filesNew).filter((item, index) => {
            return index !== parseInt(e.target.dataset.index, 10);
        });
        setFilesnew(filesFiltered);
    };



    const onChangeFiles = e => {
        setFilesnew(e.target.files)
    };

    const handleChangeRegions = (e) => {
        setLocationdata(regions[e.target.value].data);
        setRegionsName(regions[e.target.value].name);
    }

    const handleChangeLocation = (e) => {
        setLocationName(e.target.value);
    }

    const handleChangeMarka = (selectedOption) => {
        setOptionMarka({selectedOption});
    };
    
    const handleChangeModel = (selectedOption) => {
        setOptionModel({optionModel: selectedOption})
    }

    const filteredOptions = modelsOfCars.filter((o) => o.link === optionMarka.selectedOption?.value);

    const handleYearProduction = (selectedOption) => {
        setYearProduction({selectedOption})
    }

    const decodeDescriptionAferEdit = (text) => {
        const arrtext = [];
        text.split('\n').map((item, key) => {
            arrtext.push(`${item}<br>`);
        });
        setEditedDescription(arrtext.join(''));
    }

    const handleMuPosts = (e) => {
        e.preventDefault();
        window.location.replace(`/?user=${pseudonime}`);
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

               
                {updateMod ? (
                    <>  
                        {Object.values(files) && Object.values(files).map((item, index) =>(
                            <div className={styles.singlePost__model} key={index}>
                                <img src={`${PF}/${item}`} alt="" />
                                <span data-index={index} data-name={item} className={styles.singlePost__deleteModel} onClick={handleDeleteModel}></span>
                            </div>
                        ))}

                        {Object.values(filesNew) && Object.values(filesNew).map((item, index) =>(
                            <div className={styles.singlePost__model} key={index}>
                                <span>{item && item.name}</span>
                                <span data-index={index} className={styles.singlePost__deleteModel} onClick={handleDeleteModelNewFiles}></span>
                            </div>
                        ))}

                        <div className={styles.singlePost__formGroupFile}>
                            <label htmlFor="file" className={styles.singlePost__formGroupFileLabel}>
                                <i className="fa fa-cloud-upload"></i>Upload one or more photos in <strong>(.jpg)</strong>
                            </label>
                            <input
                                type='file'
                                id='file'
                                name="uploadImages"
                                multiple
                                onChange={onChangeFiles}
                            />              
                        </div>
                    </>
                ) : (
                    <div className={styles.singlePost__slider}>
                        <Slider {...settings}>
                            {Object.values(files).map((item, index) =>(
                                <div key={index}>
                                    <img src={`${PF}/${item}`} alt="" />
                                </div>
                            ))} 
                        </Slider>
                    </div>
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
                            {post.username === userName && (
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

                {updateMod ? <textarea 
                    defaultValue={decodedDescription}
                    className={styles.singlePost__textArea} 
                    onChange={(e) => decodeDescriptionAferEdit(e.target.value)}/> : (
                    <div className={styles.singlePost__rowFirst}>
                    <label>Description:</label>
                        <div className={styles.singlePost__text} dangerouslySetInnerHTML={{__html: description}}>
                        </div>
                    </div>
                )}

 
                <div className={styles.singlePost__row}>
                    <label>Марка:</label>
                    {updateMod ? 
                         (<div className={styles.write__formGroupRowSelect}>
                            <Select
                                value={optionMarka.value}
                                onChange={handleChangeMarka}
                                options={marksOfCars}
                                defaultValue={{ label: marka, value: marka }}
                            />
                        </div>)
                          : (
                        <>
                            <div className={styles.singlePost__col}>
                                {marka}
                            </div>
                        </>

                     )}  
                </div>

                <div className={styles.singlePost__row}>
                    <label>Car model:</label>
                    {updateMod ? 
                         (<div className={styles.write__formGroupRowSelect}>
                             <Select
                                value={optionModel.value}
                                onChange={handleChangeModel}
                                options={filteredOptions}
                                defaultValue={{ label: model, value: model }}
                            />
                        </div>)
                          : (
                        <>
                            <div className={styles.singlePost__col}>
                                {model}
                            </div>
                        </>

                     )}  
                </div>

                <div className={styles.singlePost__row}>
                    <label>Year of manufacture:</label>
                    {updateMod ? 
                         (<div className={styles.write__formGroupRowSelect}>
                                <Select
                                    value={yearProduction.label}
                                    onChange={handleYearProduction}
                                    options={yearsCar}
                                    defaultValue={{ label: yearOfCar, value: yearOfCar }}
                                />
                          </div>)
                          : (
                        <>
                            <div className={styles.singlePost__col}>
                                {yearOfCar}
                            </div>
                        </>

                     )}  
                </div>



                <div className={styles.singlePost__row}>
                    <label>Price:</label>
                    {updateMod ? <input type="text" 
                        value={price} 
                        className={styles.singlePost__input}
                        autoFocus
                        onChange={(e) => setPtice(e.target.value)} 
                         /> : (
                        <>
                            <div className={styles.singlePost__col}>
                                {price} <i>$</i>
                            </div>
                        </>

                     )}  
                </div>

                <div className={styles.singlePost__row}>
                    <label>Race:</label>
                    {updateMod ? <input type="text" 
                        value={race} 
                        className={styles.singlePost__input}
                        autoFocus
                        onChange={(e) => setRace(e.target.value)} 
                         /> : (
                        <>
                            <div className={styles.singlePost__col}>
                                {race} <i>tkm.</i>
                            </div>
                        </>

                     )}  
                </div>

                <div className={styles.singlePost__row}>
                    <label>Region:</label>
                    {updateMod ? 
                         (<div className={styles.write__formGroupRowSelect}>
                            <select onChange={handleChangeRegions} defaultValue={regionsName}>
                            <option disabled hidden>{regionsName}</option>
                                {regions && regions.map((item, index) =>(
                                    <option value={index} key={index}>{item.name}</option>
                                ))} 
                            </select>
                        </div>)
                          : (
                        <>
                            <div className={styles.singlePost__col}>
                                {regionsName}
                            </div>
                        </>

                     )}  
                </div>

                <div className={styles.singlePost__row}>
                    <label>Location:</label>
                    {updateMod ? 
                         (
                            <div className={styles.write__formGroupRowSelect}>            
                                <select onChange={handleChangeLocation} defaultValue={locationName}>
                                    <option disabled hidden>{locationName}</option>
                                    {locationdata && locationdata.map((item, index) =>(
                                        <option value={item.name} key={index}>{item.name}</option>
                                    ))} 
                                </select>
                            </div>
                         )
                         : (
                        <>
                            <div className={styles.singlePost__col}>
                                {locationName}
                            </div>
                        </>

                     )}  
                </div>

                <div className={styles.singlePost__row}>
                    <label>Phone:</label>
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
                    <button className={styles.singlePost__btn} onClick={handleUpdate}>Update</button>
                )}

                <div className={styles.singlePost__info}>
                    <span className={styles.singlePost__authot}>
                        <i>Author: </i>
                        <button  className={styles.myPosts}  onClick={handleMuPosts}>
                            {pseudonime}
                        </button>
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

export default SinglePost;