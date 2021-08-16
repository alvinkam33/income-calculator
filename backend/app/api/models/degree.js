const mongoose = require('mongoose');

const degreeSchema = mongoose.Schema({
    name: String,
    gender: String,
    field: String,
    income_2018: Number
});

module.exports = mongoose.model('degree', degreeSchema);