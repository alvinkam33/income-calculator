const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/income_calculator_api';
const degreeModel = require('../app/api/models/degree.js');

const degreesTotal = require('./degrees-total.json');
const degreesMale = require('./degrees-male.json');
const degreesFemale = require('./degrees-female.json');

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

// clear all degrees in database
const deleteDatabase = async () => {
    await degreeModel.deleteMany({}, (err) => {
        if (err) {
            console.log("failed");
        } else {
            console.log("deleted");
        }
    });
};

const enterData = async (degree) => {
    // check if entry is for number of graduates or median employment income
    return new Promise(resolve => {
        if (degree['Graduate statistics'] === 'Number of graduates') {
            resolve();
            return;
        }

        // check if entry has a number value for income
        if (isNaN(degree['VALUE'])) {
            resolve();
            return;
        }

        // create degree and add to database
        degreeModel.create({
            name: degree['Educational qualification'],
            gender: degree['Gender'],
            field: degree['Field of study'],
            income_2018: degree['VALUE']
        }, (err) => {
            if (err) {
                console.log(`failed to add ${degree['Educational qualification']} in ${degree['Field of study']} for ${degree['Gender']}`);
                resolve();
            } else {
                console.log(`successfully added ${degree['Educational qualification']} in ${degree['Field of study']} for ${degree['Gender']}`);
                resolve();
            }
        });
    });
};

// insert degrees into database
const reloadDatabase = async () => {
    const degrees = degreesTotal.concat(degreesMale.concat(degreesFemale));

    for (let degree of degrees) {
        await enterData(degree);
    }
};

const executeScript = async () => {
    await deleteDatabase();
    await reloadDatabase();
    process.exit();
};

executeScript();