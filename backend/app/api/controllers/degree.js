const degreeModel = require('../models/degree.js');

const filter = (degreeValue, filterValue) => {
    return (!filterValue || filterValue === degreeValue);
};

module.exports = {
    create: (req, res) => {
        // validation (all information must be filled) 
        if (!req.body.name || !req.body.gender || !req.body.field || !req.body.income_2018) {
            return res.status(400).send({
                message: "name, gender, field and income must not be empty"
            });
        }

        // create field of study
        degreeModel.create({
            name: req.body.name,
            gender: req.body.gender,
            field: req.body.field,
            income_2018: req.body.income_2018
        }, (err) => {
            if (err) {
                res.status(500).send({ message: err.message || "some error occured while creating the degree" });
            } else {
                res.json({ message: "degree created successfully" });
            }
        });
    },

    getAll: (req, res) => {
        // check for field of study and gender filter
        const field = req.query.field;
        const gender = req.query.gender;
        var add = true;

        let results = [];
        degreeModel.find({}, async (err, degrees) => {
            if (!degrees) {
                res.status(404).send({message: "did not find any results"});
            } else if (err) {
                res.status(500).send({ message: err.message || "some error occured while finding degrees" });
            } else {
                for (let degree of degrees) {
                    add = true;
                    add = await filter(degree.field, field);
                    if (!add) {
                        continue;
                    }
                    add = await filter(degree.gender, gender);
                    if (add) {
                        results.push(degree);
                    }
                }
            }
            res.send(results);
        });
    },

    getById: (req, res) => {
        degreeModel.findById(req.params.degreeId, (err, degree) => {
            if (!degree) {
                res.status(404).send({ message: "degree not found with id " + req.params.degreeId });
            } else if (err) {
                res.status(500).send({ message: err.message || "some error occured while finding degree by id" });
            } else {
                res.send(degree);
            }
        });
    },

    update: (req, res) => {
        degreeModel.findByIdAndUpdate(req.params.degreeId, req.body, { new: true }, (err, degree) => {
            if (!degree) {
                res.status(404).send({ message: "degree not found with id " + req.params.degreeId });
            } else if (err) {
                res.status(500).send({ message: err.message || "some error occured while updating degree by id" });
            } else {
                res.send(degree);
            }
        });
    },

    delete: (req, res) => {
        degreeModel.findByIdAndRemove(req.params.degreeId, (err) => {
            if (err) {
                res.status(500).send({ message: err.message || "some error occured while deleting degree by id" });
            } else {
                res.send({ message: "degree deleted successfully" });
            }
        });
    }
};