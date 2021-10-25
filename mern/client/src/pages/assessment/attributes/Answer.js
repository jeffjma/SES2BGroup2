import React from 'react';
import './Answer.css';
import { Form } from "react-bootstrap";

const Answer = (props) => {
    // lets all answer keys be brought from assessment.js
    let answer = Object.keys(props.answer)

    // basic map of how answers should be structured in quiz
    .map((qAnswer, i)=> (
        <div className="form-check" >
            <input
                class="form-check-radio"
                type="radio"
                name="answer"
                id= {i}
                value="option"
                onClick={() => props.checkAnswer(qAnswer)}
                required
            />
            <label class="form-check-label" for={i}>
                <h5 key={qAnswer}>
                    {props.answer[qAnswer]}
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

export default Answer;