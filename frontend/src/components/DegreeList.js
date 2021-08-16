import React from 'react';
import DegreeCard from './DegreeCard';

const DegreeList = (props) => {
    const findMax = () => {
        var maxDegree = null;
        var max = Number.MIN_VALUE;
        for (let degree of props.degrees) {
            if (degree.total_income > max) {
                maxDegree = degree;
                max = degree.total_income;
            }
        }
        return maxDegree;
    };

    const maxDegree = findMax();

    const degrees = props.degrees.map(degree => {
        return <DegreeCard key={degree.id} degree={degree} maxDegree={maxDegree}/>;
    });

    return (
    <div className="ui container" style={{ marginTop: '10px', paddingBottom: '10px' }}>
        <label>The degree that will provide you the highest accumulative income is: {maxDegree ? maxDegree.name : null}</label>
        {degrees}
    </div>);
};

export default DegreeList;