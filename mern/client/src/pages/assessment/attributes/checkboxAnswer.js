import React from 'react';
import './Answer.css';
import { Form } from "react-bootstrap";

const checkboxAnswer = (props) => {
                // lets all answer keys be brought from assessment.js
        let answer = Object.keys(props.answer)

        // basic map of how answers should be structured in quiz
        .map((qAnswer, i)=> (
            <div className="form-check">
                  <input
                    type="checkbox"
                    name="answer"
                    id="assessment"
                    onClick={() => props.checkAnswer(qAnswer)}
                    required
                  />
                  <label class="form-check-label" for="assessment1">
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

export default checkboxAnswer;