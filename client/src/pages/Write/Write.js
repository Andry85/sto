import React, { useState, useEffect, useContext} from 'react';
import Select from 'react-select'
import styles from  './Write.module.scss';
import {axiosInstance} from '../../config';
import {GoogleContext} from '../../context/Context';
import {mapOfUkraine} from '../../util/regions';
import {marksOfCars, modelsOfCars} from '../../util/carsUtil';




const today = new Date();
const year = today.getFullYear();


const yearsArr = [];
for (let i = year; i >= 1900; i--) {
    yearsArr.push(i);
}

//set yearsCar
const yearsCar = [];
for (let i = 0; i < yearsArr.length; i++) {
    yearsCar.push({
        value: `${yearsArr[i]}`,
        label: `${yearsArr[i]}`,
    });
}



/**
 * 
 */
const Write = () => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const user = useContext(GoogleContext);
    const [price, setPrice] = useState('');
    const [race, setRace] = useState('');
    const [optionMarka, setOptionMarka] = useState({});
    const [optionModel, setOptionModel] = useState({});
    const [yearProduction, setYearProduction] = useState({});
    const [files, setFiles] = useState([]);
    const filesNames = [];
    const [phone, setPhone] = useState('');
    const [regions, setRegions] = useState([]);
    const [location, setLocation] = useState([]);
    const [regionsName, setRegionsName] = useState('');
    const [locationName, setLocationName] = useState('');



    useEffect(() => {
        setRegions(mapOfUkraine);
    });

    

    const onChange = e => {
        setFiles(e.target.files)
    };

    const handleCloseIcon = e => {
        const filesFiltered = Object.values(files).filter((item, index) => {
            return index != e.target.dataset.index;
        });
        setFiles(filesFiltered);

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, 'user');

        for (const element of files) {
            filesNames.push(element.name);
        }

        const newPost = {
            username: user.id,
            title,
            description: desc,
            price,
            regionsName,
            locationName,
            race,
            marka: optionMarka.selectedOption.label,
            model: optionModel.optionModel.label,
            year: yearProduction.label,
            files: filesNames,
            phone
        }

        if (files) {
            const formData = new FormData();
            Object.values(files).forEach(file=>{
                formData.append("uploadImages", file);
            });

            try {
                const res = await axiosInstance.post('/upload', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    },
                });
                console.log(res);
            } catch (err) {
                if (err.response.status === 500) {
                    console.log(err);
                } else {
                    console.log(err.response.data.msg);
                }
            }

        }

        try {
            const res = await axiosInstance.post('/posts', newPost);
            window.location.replace('/post/' + res.data._id);
        } catch(err) {

        } 

    }

    const handleChange1 = (selectedOption) => {
        setOptionMarka({selectedOption});
    };
    
    const handleChange2 = (selectedOption) => {
        setOptionModel({optionModel: selectedOption})
    }

    const handleYearProduction = (selectedOption) => {
        setYearProduction({yearProduction})
    }

    const filteredOptions = modelsOfCars.filter((o) => o.link === optionMarka.selectedOption?.value);

    const handleChangeRegions = (e) => {
        setLocation(regions[e.target.value].data);
        setRegionsName(regions[e.target.value].name);
    }

    const handleChangeLocation = (e) => {
        setLocationName(e.target.value);
    }

       
    return (
        <div className={styles.write}>
            <form className={styles.write__form} onSubmit={handleSubmit}>
                <div className={styles.write__formGroup}>
                    <div className={styles.write__formGroupFile}>
                        <label htmlFor="file" className={styles.write__formGroupFileLabel}>
                            <i className="fa fa-cloud-upload"></i>?????????????????? ????????
                        </label>
                        <input
                            type='file'
                            id='file'
                            name="uploadImages"
                            multiple
                            onChange={onChange}
                        />
                        <ul>
                            {Object.values(files) && Object.values(files).map((item, index) =>(
                                <li key={index}>
                                    <span>{item.name}</span>
                                    <span data-index={index} className={styles.write__formGroupFileDelete} onClick={handleCloseIcon}>
                                    </span>
                                </li>
                            ))} 
                        </ul>
                        
                    </div>
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>???????????? ????????:</label>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="?????????? ????????" 
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>?????????? ????????:</label>
                    <Select
                        value={optionMarka.value}
                        onChange={handleChange1}
                        options={marksOfCars}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>???????????? ????????:</label>
                    <Select
                        value={optionModel.value}
                        onChange={handleChange2}
                        options={filteredOptions}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>?????? ??????????????:</label>
                    <Select
                        value={yearProduction.label}
                        onChange={handleYearProduction}
                        options={yearsCar}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <div className={styles.write__formGroupRowPrice}>
                        <input 
                            className={styles.write__text} 
                            type="text" 
                            placeholder="???????? ????????" 
                            onChange={e => setPrice(e.target.value)}
                        />
                        <span>&#36;</span>
                    </div>
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>???????????? ????????:</label>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="??????. ????" 
                        onChange={e => setRace(e.target.value)}
                    />
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>????????????:</label>
                    <div className={styles.write__formGroupRowSelect}>
                        <select onChange={handleChangeRegions}>
                            {regions && regions.map((item, index) =>(
                                <option value={index} key={index}>{item.name}</option>
                            ))} 
                        </select>
                    </div>
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>?????????????????? ??????????:</label>
                    <div className={styles.write__formGroupRowSelect}>            
                        <select value={locationName} onChange={handleChangeLocation}>
                            {location && location.map((item, index) =>(
                                <option value={item.name} key={index}>{item.name}</option>
                            ))} 
                        </select>
                    </div>
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>??????????????:</label>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="?????? ??????????????" 
                        autoFocus={true}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <div className={styles.write__formGroup}>
                    <textarea 
                        className={styles.write__textArea} 
                        rows="5" 
                        placeholder="?????????????? ???????? ????????"
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className={styles.write__submit} type="submit">????????????</button>
            </form>
        </div>
    );
}


export default Write;