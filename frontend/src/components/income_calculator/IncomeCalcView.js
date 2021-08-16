import React from 'react';
import Dropdown from '../Dropdown';
import DegreeList from '../DegreeList';

console.log("rendered view");
const IncomeCalcView = ({
    field,
    fieldHandler,
    fieldOptions,
    age,
    ageHandler,
    gender,
    genderHandler,
    genderOptions,
    calculate,
    degreeResults
}) => {
    return (
        <div className="ui container" style={{ marginTop: '10px' }}>
            <div className="ui form">
                <Dropdown
                    label="Field of Study"
                    selected={field}
                    onSelectedChange={fieldHandler}
                    options={fieldOptions} />
                <div className="field">
                    <label>Age</label>
                    <input value={age} onChange={(e) => ageHandler(e.target.value)} />
                </div>
                <Dropdown
                    label="Gender"
                    selected={gender}
                    onSelectedChange={genderHandler}
                    options={genderOptions} />
                <button className="ui button primary" onClick={calculate} style={{ marginTop: '20px' }}>
                    Calculate
                </button>
            </div>
            <DegreeList degrees={degreeResults} />
        </div>
    );
};

export default IncomeCalcView;