import React from 'react';
import './Answer.css';
import { Form } from "react-bootstrap";

const radioAnswer = (props) => {
    // lets all answer keys be brought from assessment.js
    let answer = props.answer

    // basic map of how answers should be structured in quiz
    .map((qAnswer, i)=> (
        <div className="form-check">
            <input
                type="radio"
                name="mcAnswer"
                id= {i}
                onChange={() => props.selectAnswer(qAnswer)}
                checked={props.chosenAnswer === qAnswer}
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

export default radioAnswer;