import React from 'react';
import './Answer.css';
import { Form } from "react-bootstrap";

const textAnswer = (props) => {
        // lets all answer keys be brought from assessment.js
        let answer = Object.keys(props.answer)

        // basic map of how answers should be structured in quiz
        .map((qAnswer, i)=> (
            <div className="form-group">
                  <textarea
                    name="saAnswer"
                    id="assessment"
                    rows="7"
                    onChange={() => props.checkAnswer(qAnswer)}
                    required
                  >{props.answer[qAnswer]}</textarea>
            </div>
        ));

        return(
            <Form className="textArea">
                    {answer}
            </Form>
        );
    }

export default textAnswer;