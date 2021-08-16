import React from 'react';
import { Progress } from 'semantic-ui-react';

const DegreeCard = (props) => {
    // calculate percentage relative to max income possible
    const percent = props.degree.total_income / props.maxDegree.total_income * 100;

    return (
        <div>
            {props.degree.name}: ${props.degree.total_income.toFixed(2)}
            <Progress percent={percent} indicating />
        </div>
    );
}

export default DegreeCard;

