import React from 'react';
import './Answer.css';
import { Form } from "react-bootstrap";

const textAnswer = (props) => {
    // lets all answer keys be brought from assessment.js
    let answer = (
        <div className="form-group">
            <textarea
                name="saAnswer"
                id= "assessment"
                onChange={(evt) => props.typeAnswer(evt)}
                value={props.value}
                required
            />
        </div>
    )
    return(
        <Form className="shortAnswer">
                {answer}
        </Form>
    );
}

export default textAnswer;