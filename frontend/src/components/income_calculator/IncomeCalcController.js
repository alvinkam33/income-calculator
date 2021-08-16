import React, { useState } from 'react';
import IncomeCalcView from './IncomeCalcView';
import axios from 'axios';
const https = require('https');

const rateIncrease = 1.03;

// IncomeCalc model (states, constants)

const genderOptions = [
    { label: 'Total', value: 'Total, gender' },
    { label: 'Male', value: 'Male gender' },
    { label: 'Female', value: 'Female gender' }
];

const fieldOptions = [
    { label: 'Total, field of study', value: 'Total, field of study' },
    { label: 'Education', value: 'Education [1]' },
    { label: 'Visual and performing arts, and communications technologies', value: 'Visual and performing arts, and communications technologies [2]' },
    { label: 'Humanities', value: 'Humanities [3]' },
    { label: 'Social and behavioral sciences and law', value: 'Social and behavioral sciences and law [4]' },
    { label: 'Business, management and public administration', value: 'Business, management and public administration [5]' },
    { label: 'Physical and life sciences and technologies', value: 'Physical and life sciences and technologies [6]' },
    { label: 'Mathematics, computer and information sciences', value: 'Mathematics, computer and information sciences [7]' },
    { label: 'Architecture, engineering, and related technologies', value: 'Architecture, engineering, and related technologies [8]' },
    { label: 'Agriculture, natural resources and conservation', value: 'Agriculture, natural resources and conservation [9]' },
    { label: 'Health and related fields', value: 'Health and related fields [10]' },
    { label: 'Personal, protective and transportation services', value: 'Personal, protective and transportation services [11]' },
    { label: 'Other instructional programs', value: 'Other instructional programs [12]' }
];

const IncomeCalcController = () => {
    const [field, setField] = useState('');
    const [age, setAge] = useState(18); // default age 18
    const [gender, setGender] = useState(genderOptions[0]); // default value 'Total'
    const [degreeResults, setDegreeResults] = useState([]);


    // IncomeCalc Controller (logic)

    // state handlers
    const fieldHandler = (val) => {
        setField(val);
    };

    const ageHandler = (val) => {
        setAge(val);
    };

    const genderHandler = (val) => {
        setGender(val);
    };

    // calculate accumulative income for each degree from API call
    const calculate = async () => {
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        // filter by user-selected field of study and gender
        const degrees = await axios({
            method: 'GET',
            url: `http://localhost:3000/degree/?field=${field.value}&gender=${gender.value}`,
            httpsAgent: agent
        });

        // calculate accumulative income for all filtered degrees and store
        var results = [];
        var sum = 0;

        for (let degree of degrees.data) {
            sum = 0;
            var income = degree.income_2018;
            for (var i = age; i < 65; i++) {
                sum += income;
                income *= rateIncrease;
            }
            results.push({ "name": degree.name, "total_income": sum });
        }
        setDegreeResults(results);

    }

    // return props to IncomeCalcView
    return (
        <IncomeCalcView
            field={field}
            fieldHandler={fieldHandler}
            fieldOptions={fieldOptions}
            age={age}
            ageHandler={ageHandler}
            gender={gender}
            genderHandler={genderHandler}
            genderOptions={genderOptions}
            calculate={calculate}
            degreeResults={degreeResults}
        />
    );
}

export default IncomeCalcController;