import fs from 'fs';
import csv from 'csv-parser';

let info = {}

let csvData1 = [];
let csvData2 = [];

const readCsvFile = async (csvData, filePath) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

const writeJSONFile = (newObject) => {
    if (!fs.existsSync('info.json')) {
        //create new file if not exist
        fs.closeSync(fs.openSync('info.json', 'w'));
    }

    // read file
    const file = fs.readFileSync('info.json')
    const data = newObject

    //check if file is empty
    if (file.length == 0) {
        //add data to json file
        fs.writeFileSync("info.json", JSON.stringify([data]))
    } else {
        //append data to jso file
        const json = JSON.parse(file.toString())
        //add json element to json object

        const joinedObj = Object.assign({}, json, newObject);
        fs.writeFileSync("info.json", JSON.stringify(joinedObj))
    }

}

(async () => {
    try {
        await readCsvFile(csvData1, '../../info.csv');
        await readCsvFile(csvData2, '../../metrics.csv');
        // console.log(csvData2)
        for (let i = 0; i < 400; i++) {

            const id = csvData1[i]['id']
            const name = csvData1[i]['name']
            const free = csvData1[i]['free']
            const release_date = csvData1[i]['release_date']

            let metric, review, flag = 0;
            for (let j = 0; j < csvData2.length; j++) {
                if (csvData2[j]['id'] === id) {
                    metric = csvData2[j]['metric']
                    review = csvData2[j]['review']
                    flag = 1
                }
            }

            if (flag === 0) {
                continue;
            }

            flag = 1;

            let developer = csvData1[i]['developer']
            let genres = csvData1[i]['genres']
            let categories = csvData1[i]['categories']

            developer = developer.replace(/'/g, '');
            developer = developer.replace(/[\(\)\[\]]/g, '');
            developer = developer.split(',');

            genres = genres.replace(/'/g, '');
            genres = genres.replace(/[\(\)\[\]]/g, '');
            genres = genres.split(',');

            categories = categories.replace(/'/g, '');
            categories = categories.replace(/[\(\)\[\]]/g, '');
            categories = categories.split(',');


            info = {
                [id.toString()]: {
                    "name": name,
                    "free": free,
                    "release_date": release_date,
                    "developer": developer,
                    "genres": genres,
                    "categories": categories,
                    "metric": metric,
                    "review": review
                }
            }
            writeJSONFile(info)
            // console.log(info)
        }
    } catch (error) {
        console.error(error);
    }
})();