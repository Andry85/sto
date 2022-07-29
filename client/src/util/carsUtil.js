import jsonDataCars from '../statics/cars.json';

//set models and marks
export const marksOfCars = [];
export const modelsOfCars = [];
for (let i = 0; i < jsonDataCars.length; i++) {
    marksOfCars.push({
        value: jsonDataCars[i].brand.toLowerCase(),
        label: jsonDataCars[i].brand,
    });

    for (let j = 0; j < jsonDataCars[i].models.length; j++) {
        

        modelsOfCars.push({
            value: jsonDataCars[i].models[j],
            label: jsonDataCars[i].models[j],
            link: jsonDataCars[i].brand.toLowerCase()
        });
    
    }
}