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
                    name="answer"
                    id="assessment"
                    rows="7"
                    onClick={() => props.checkAnswer(qAnswer)}
                    required
                  ></textarea>
            </div>
        ));

        return(
            <Form className="textArea">
                    {answer}
            </Form>
        );
    }

export default textAnswer;