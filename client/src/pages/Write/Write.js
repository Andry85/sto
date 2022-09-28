import React, { useState, useEffect, useContext} from 'react';
import Select from 'react-select'
import styles from  './Write.module.scss';
import {axiosInstance} from '../../config';
import {GoogleContext} from '../../context/Context';
import {mapOfUkraine} from '../../util/regions';
import {marksOfCars, modelsOfCars, yearsCar} from '../../util/carsUtil';








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

        for (const element of files) {
            filesNames.push(element.name);
        }

        const newPost = {
            username: user.sub,
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
            pseudonime: user.given_name,
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

       
    return (
        <div className={styles.write}>
            <form className={styles.write__form} onSubmit={handleSubmit}>
                <div className={styles.write__formGroup}>
                    <div className={styles.write__formGroupFile}>
                        <label htmlFor="file" className={styles.write__formGroupFileLabel}>
                            <i className="fa fa-cloud-upload"></i>Загрузіть одне або кілька фото одразу
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
                    <label>Навзва авто: <i>*</i></label>
                    <input 
                        className={styles.write__text} 
                        type="text" 
                        placeholder="Назва авто" 
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {errorTitle && (
                                <span className={styles.write__formGroupRowError}>Заповніть назву авто</span>
                    )} 
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Марка авто: <i>*</i></label>
                    <Select
                        value={optionMarka.value}
                        onChange={handleChange1}
                        options={marksOfCars}
                    />
                    {errorMarka && (
                                <span className={styles.write__formGroupRowError}>Заповніть марку авто</span>
                    )} 
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Модель авто: <i>*</i></label>
                    <Select
                        value={optionModel.value}
                        onChange={handleChange2}
                        options={filteredOptions}
                    />
                    {errorModel && (
                                <span className={styles.write__formGroupRowError}>Заповніть модель авто</span>
                    )}
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Рік випуску: <i>*</i></label>
                    <Select
                        value={yearProduction.label}
                        onChange={handleYearProduction}
                        options={yearsCar}
                    />
                    {errorYear && (
                                <span className={styles.write__formGroupRowError}>Заповніть рік випуску авто</span>
                    )}
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Ціна: <i>*</i></label>
                    <div className={styles.write__formGroupRowPrice}>
                        <input 
                            className={styles.write__text} 
                            type="number" 
                            placeholder="Ціна авто" 
                            onChange={e => setPrice(e.target.value)}
                        />
                        <span>&#36;</span>
                    </div>
                    {errorPrice && (
                                <span className={styles.write__formGroupRowError}>Заповніть ціну авто</span>
                    )}
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Пробіг авто: <i>*</i></label>
                    <input 
                        className={styles.write__text} 
                        type="number" 
                        placeholder="Тис. км" 
                        onChange={e => setRace(e.target.value)}
                    />
                    {errorRace && (
                                <span className={styles.write__formGroupRowError}>Заповніть пробіг авто</span>
                    )}
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Регіон: <i>*</i></label>
                    <div className={styles.write__formGroupRowSelect}>
                        <select onChange={handleChangeRegions}>
                            {regions && regions.map((item, index) =>(
                                <option value={index} key={index}>{item.name}</option>
                            ))} 
                        </select>
                    </div>
                    {errorRegionsName && (
                                <span className={styles.write__formGroupRowError}>Заповніть регіон авто</span>
                    )}

                    
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Населений пункт:</label>
                    <div className={styles.write__formGroupRowSelect}>            
                        <select value={locationName} onChange={handleChangeLocation}>
                            {location && location.map((item, index) =>(
                                <option value={item.name} key={index}>{item.name}</option>
                            ))} 
                        </select>
                    </div>
                </div>
                <div className={styles.write__formGroupRow}>
                    <label>Телефон: <i>*</i></label>
                    <input 
                        className={styles.write__text} 
                        type="tel" 
                        placeholder="Ваш телефон" 
                        onChange={e => setPhone(e.target.value)}
                    />
                    {errorPhone && (
                                <span className={styles.write__formGroupRowError}>Заповніть телефон</span>
                    )}
                </div>
                <div className={styles.write__formGroup}>
                    <textarea 
                        className={styles.write__textArea} 
                        rows="5" 
                        placeholder="Опишіть ваше авто"
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className={styles.write__submit} type="submit">Додати</button>
            </form>
        </div>
    );
}


export default Write;