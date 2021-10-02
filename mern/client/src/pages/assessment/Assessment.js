import React from "react";
import { ButtonGroup, Form } from "react-bootstrap";
import ButtonContained from "../../components/ButtonContained";
import NavigationBar from "../../components/NavigationBar.js";
import "./Assessment.css";
import Timer from "./Timer.js"
import QuestionData from "./QuestionData";

const Assessment = () => {
  
  return (
    <React.Fragment>

      <NavigationBar />

      <div className="assessment-parent">

        <div className="headerObjects">
        <h3>(Subject) Test</h3>
        <Timer />
        </div>

        <h4 className="questionTitle">Question 1: </h4>

        <h5 className="questionDesc">Question Is Here?</h5>

        <Form className="multipleChoice">
          <div className="form-check">
            <input
              class="form-check-radio"
              type="radio"
              name="answer"
              id="assessment"
              value="option1"
              onclick="check()"
              required
            />
            <label class="form-check-label" for="assessment1">
              <h5>Answer 1</h5>
            </label>
          </div>

          <div className="form-check">
            <input
              class="form-check-radio"
              type="radio"
              name="answer"
              id="assessment"
              value="option2"
              onclick="check()"
              required
            />
            <label class="form-check-label" for="assessment2">
            <h5>Answer 2</h5>
            </label>
          </div>

          <div className="form-check">
            <input
              class="form-check-radio"
              type="radio"
              name="answer"
              id="assessment"
              value="option3"
              onclick="check()"
              required
            />
            <label class="form-check-label" for="assessment3">
              <h5>Answer 3</h5>
            </label>
          </div>

          <div className="form-check">
            <input
              class="form-check-radio"
              type="radio"
              name="answer"
              id="assessment"
              value="option4"
              onclick="check()"
              required
            />
            <label className="form-check-label" for="assessment4">
              <h5>Answer 4</h5>
            </label>
          </div>
        </Form>
        <ButtonGroup className="button" >
          <ButtonContained id="submit" href="assessment">Next</ButtonContained>
        </ButtonGroup>
      </div>
      
    </React.Fragment>
    
  );
};

export default Assessment;
