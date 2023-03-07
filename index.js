import * as dotenv from 'dotenv';
dotenv.config();

import 'colors';
import { inquirerMenu, listPlaces, pause, readInput } from './helpers/inquirer.js';
import { Searches } from './models/searches.js';

const main = async() => {

    let opt;
    const searches = new Searches();


    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Show message select place
                const search_param = await readInput('City: ');

                //Search for places
                const places = await searches.city(search_param);

                //Select Place
                const selectedId = await listPlaces(places);
                if (selectedId === '0') continue;
                
                const selectedPlace = places.find(p => p.id === selectedId);

                searches.addHistory(selectedPlace.name);

                //Weather
                const weather = await searches.weatherPlace(selectedPlace.lat, selectedPlace.lng);
                const { temp, max, min, desc } = weather;

                console.clear();
                console.log('\nPlace information\n'.green);
                console.log('City: ', selectedPlace.name.red);
                console.log('Lat: ', selectedPlace.lat);
                console.log('Lng: ', selectedPlace.lng);
                console.log('Temperature: ', `${temp}°`);
                console.log('Max: ', `${max}°`);
                console.log('Min: ', `${min}°`);
                console.log('Weather is: ', desc.red);
                break;

            case 2:
                searches.capitalizedHistory.forEach((place, index) => {
                    const idx = `${index + 1}.`.green;
                    console.log(`${idx} ${place}`);
                })
                break;
        
            default:
                break;
        }

        if (opt !==0) await pause();

    } while (opt !== 0)


}

main();