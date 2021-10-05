import React from 'react';
import './Question.css';

const Question = (props) => {
    return (
        //gets question from the question numbers in assessment
        <h5 className="questionDesc">{props.question}</h5>
    );
}

export default Question;