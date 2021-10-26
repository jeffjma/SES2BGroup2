import React from 'react';
import './Answer.css';
import { Form } from "react-bootstrap";

const checkboxAnswer = (props) => {
    // lets all answer keys be brought from assessment.js
    let answer = props.answer

    // basic map of how answers should be structured in quiz
    .map((qAnswer, i)=> (
        <div className="form-check">
            <input
                type="checkbox"
                name="cbAnswer"
                id= {i}
                onChange={() => props.changeAnswers(qAnswer)}
                checked={props.chosenAnswer.includes(qAnswer)}
                required
            />
            <label className="form-check-label" for={i}>
                <h5 key={qAnswer}>
                    {qAnswer}
                </h5>
            </label>
        </div>
    ));

    return(
        <Form className="multipleChoice">
                {answer}
        </Form>
    );
}

export default checkboxAnswer;