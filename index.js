require('dotenv').config()

const { readInput, inquirerMenu, stop, listPlaces } = require("./helpers/inquirer");
const Searches = require("./models/searches");


const main = async () => {

    const searches = new Searches();

    let opt;
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //Show message
                const term = await readInput('City: ');

                //Search the places
                const places = await searches.city(term);

                //Select the place
                const id = await listPlaces(places);
                if ( id === '0' ) continue;

                const placeSel = places.find( l => l.id === id );

                //Save in DB
                searches.addHistory( placeSel.nombre );

                //Weather
                const climate = await searches.weatherPlace( placeSel.lat, placeSel.lng );
                
                //Show results
                console.clear();
                console.log('\nInformation of the city\n'.green);
                console.log('City:', placeSel.nombre.green );
                console.log('Latitude:', placeSel.lat );
                console.log('Length:', placeSel.lng );
                console.log('Temperature:', climate.temp );
                console.log('Minimal:', climate.min);
                console.log('Máximun:', climate.max);
                console.log('What is the weather like?:', climate.desc.green );

                break;

                case 2:
                    searches.capitalizedHistory.forEach( (place, i) =>  {
                        const idx = `${ i + 1 }.`.green;
                        console.log( `${ idx } ${ place } ` );
                    })
               break;
        }

        if (opt !== 0) await stop();

    } while (opt !== 0)
}

main();