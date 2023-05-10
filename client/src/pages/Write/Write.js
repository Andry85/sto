import React, { useState, useEffect, useContext} from 'react';
import Select from 'react-select';
import styles from  './Write.module.scss';
import {axiosInstance} from '../../config';
import {mapOfUkraine} from '../../util/regions';
import {marksOfCars, modelsOfCars, yearsCar} from '../../util/carsUtil';




const Write = () => {
    const userName = localStorage.getItem("userName");
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
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
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorMarka, setErrorMarka] = useState(false);
    const [errorModel, setErrorModel] = useState(false);
    const [errorYear, setErrorYear] = useState(false);
    const [errorRace, setErrorRace] = useState(false);
    const [errorRegionsName, setErrorRegionsNames] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);



    useEffect(() => {
        setRegions(mapOfUkraine);
    }, []);

    

    const onChangeFiles = e => {

        console.log(e.target.files);

        setFiles(e.target.files)
    };

    const handleCloseIcon = e => {
        const filesFiltered = Object.values(files).filter((item, index) => {
            return index !== parseInt(e.target.dataset.index, 10);
        });
        setFiles(filesFiltered);

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth();
        let minutes = d.getMinutes();


        for (const element of files) {
            filesNames.push(`${year}-${month}-${minutes}-${element.name}`);
        }

        const newPost = {
            username: userName,
            title,
            description: desc,
            price,
            regionsName,
            locationName,
            race,
            marka: optionMarka.selectedOption?.label,
            model: optionModel.optionModel?.label,
            year: yearProduction,
            files: filesNames,
            phone,
            pseudonime: userName,
        }

        if (files) {
            const formData = new FormData();
            Object.values(files).forEach(file=>{
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
            

            if (title !== '' 
                && optionMarka.selectedOption?.label !== undefined
                && optionModel.optionModel?.label !== undefined
                && (typeof yearProduction === 'string')
                && race !== '' 
                && regionsName !== '' 
                && phone !== ''
                && price !== '' 
            ) {
                setErrorTitle(false);
                setErrorMarka(false);
                setErrorModel(false);
                setErrorYear(false);
                setErrorRace(false);
                setErrorRegionsNames(false);
                setErrorPhone(false);
                setErrorPrice(false);

                const res = await axiosInstance.post('/posts', newPost);
                window.location.replace('/post/' + res.data._id);
            } 

            if (title === '') {
                setErrorTitle(true);
            }

            if (title !== '') {
                setErrorTitle(false);
            } 

            if (optionMarka.selectedOption?.label === undefined) {
                setErrorMarka(true);
            } 

            if (optionMarka.selectedOption?.label !== undefined) {
                setErrorMarka(false);
            }

            if (optionModel.optionModel?.label === undefined) {
                setErrorModel(true);
            } 

            if (optionModel.optionModel?.label !== undefined) {
                setErrorModel(false);
            }

            if (typeof yearProduction !== 'string') {
                setErrorYear(true);
            }

            if (typeof yearProduction === 'string') {
                setErrorYear(false);
            } 

            if (race === '') {
                setErrorRace(true);
            }

            if (race !== '') {
                setErrorRace(false);
            } 

            if (regionsName === '') {
                setErrorRegionsNames(true);
            }

            if (regionsName !== '') {
                setErrorRegionsNames(false);
            } 

            if (phone === '') {
                setErrorPhone(true);
            }

            if (phone !== '') {
                setErrorPhone(false);
            } 

            if (price === '') {
                setErrorPrice(true);
            }

            if (price !== '') {
                setErrorPrice(false);
            } 


            
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
        setYearProduction(selectedOption.label)
    }

    const filteredOptions = modelsOfCars.filter((o) => o.link === optionMarka.selectedOption?.value);

    const handleChangeRegions = (e) => {
        setLocation(regions[e.target.value].data);
        setRegionsName(regions[e.target.value].name);
    }

    const handleChangeLocation = (e) => {
        setLocationName(e.target.value);
    }

    const decodeTextareaText = (text) => {
        const arrtext = [];
        text.split('\n').map((item, key) => {
            arrtext.push(`${item}<br>`);
        });
        setDesc(arrtext.join(''));
    }

       
    return (
        <div className={styles.write}>
            <form className={styles.write__form} onSubmit={handleSubmit}>
                <div className={styles.write__formGroup}>
                    <div className={styles.write__formGroupFile}>
                        <label htmlFor="file" className={styles.write__formGroupFileLabel}>
                            <i className="fa fa-cloud-upload"></i>Upload one or more photos at once in the format <strong>(.jpg)</strong>
                        </label>
                        <input
                            type='file'
                            id='file'
                            name="uploadImages"
                            multiple
                            onChange={onChangeFiles}
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
                    <label>Name of the car: <i>*</i></label>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="Name of the car" 
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {errorTitle && (
                                <span className={styles.write__formGroupRowError}>Fill in the name of the car</span>
                    )} 
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Car brand: <i>*</i></label>
                    <Select
                       theme={(theme) => ({
                            ...theme,
                            spacing: {
                                controlHeight: 55,
                                baseUnit: 8,
                            }
                        })}
                        value={optionMarka.value}
                        onChange={handleChange1}
                        options={marksOfCars}
                    />
                    {errorMarka && (
                                <span className={styles.write__formGroupRowError}>Fill in the car brand</span>
                    )} 
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Car model: <i>*</i></label>
                    <Select
                        theme={(theme) => ({
                            ...theme,
                            spacing: {
                                controlHeight: 55,
                                baseUnit: 8,
                            }
                        })}
                        value={optionModel.value}
                        onChange={handleChange2}
                        options={filteredOptions}
                    />
                    {errorModel && (
                                <span className={styles.write__formGroupRowError}>Fill in the car model</span>
                    )}
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Year of manufacture: <i>*</i></label>
                    <Select
                        theme={(theme) => ({
                            ...theme,
                            spacing: {
                                controlHeight: 55,
                                baseUnit: 8,
                            }
                        })}
                        value={yearProduction.label}
                        onChange={handleYearProduction}
                        options={yearsCar}
                    />
                    {errorYear && (
                                <span className={styles.write__formGroupRowError}>Fill in year of manufacture</span>
                    )}
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Price: <i>*</i></label>
                    <div className={styles.write__formGroupRowPrice}>
                        <input 
                            className={styles.write__text} 
                            type="number" 
                            placeholder="Price of the car" 
                            onChange={e => setPrice(e.target.value)}
                        />
                        <span>&#36;</span>
                    </div>
                    {errorPrice && (
                                <span className={styles.write__formGroupRowError}>Fill in the price of the car</span>
                    )}
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Race: <i>*</i></label>
                    <input 
                        className={styles.write__text} 
                        type="number" 
                        placeholder="tkm." 
                        onChange={e => setRace(e.target.value)}
                    />
                    {errorRace && (
                                <span className={styles.write__formGroupRowError}>Fill in the race of the car</span>
                    )}
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Region: <i>*</i></label>
                    <div className={styles.write__formGroupRowSelect}>
                        <select onChange={handleChangeRegions}>
                            {regions && regions.map((item, index) =>(
                                <option value={index} key={index}>{item.name}</option>
                            ))} 
                        </select>
                    </div>
                    {errorRegionsName && (
                                <span className={styles.write__formGroupRowError}>Fill in the auto region</span>
                    )}

                    
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Location:</label>
                    <div className={styles.write__formGroupRowSelect}>            
                        <select value={locationName} onChange={handleChangeLocation}>
                            {location && location.map((item, index) =>(
                                <option value={item.name} key={index}>{item.name}</option>
                            ))} 
                        </select>
                    </div>
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Phone: <i>*</i></label>
                    <input 
                        className={styles.write__text} 
                        type="tel" 
                        placeholder="Your phone number" 
                        onChange={e => setPhone(e.target.value)}
                    />
                    {errorPhone && (
                                <span className={styles.write__formGroupRowError}>Fill the phone</span>
                    )}
                </div>
                <div className={styles.write__formGroup}>
                    <textarea 
                        className={styles.write__textArea} 
                        rows="5" 
                        placeholder="Describe your car"
                        onChange={e => decodeTextareaText(e.target.value)}
                    ></textarea>
                </div>
                <button className={styles.write__submit} type="submit">Add</button>
            </form>
        </div>
    );
}


export default Write;