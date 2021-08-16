const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/income_calculator_api';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = {
    url: mongoDB
};