import jsonDataMap from '../statics/map.json';

export const mapOfUkraine=[];
for (const property in jsonDataMap) {
    mapOfUkraine.push({
        name: `${property}`,
        cities: jsonDataMap[property].cities,
        data:[]
    });
}
for (let i = 0; i < mapOfUkraine.length; i++) {

    console.log(mapOfUkraine[i].cities.length);
    
    for (let j = 0; j < mapOfUkraine[i].cities.length; j++) {
        mapOfUkraine[i].data.push({
            name: mapOfUkraine[i].cities[j]
        })
    }
}
