import React from "react";
import { ButtonGroup, Form } from "react-bootstrap";
import ButtonContained from "../../components/ButtonContained";
import NavigationBar from "../../components/NavigationBar.js";
import "./Assessment.css";
import $ from 'jquery';

const Assessment = () => {
  
  $("input:radio").change(function () {$("#submit").prop("isDisabled", null);});

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="assessment-parent">
        <h3>(Subject) Test</h3>
        <h4 className="questionTitle">Question 1: </h4>
        <h5 className="questionDesc">Question Is Here?</h5>
        <Form className="multipleChoice">
          <div className="form-check">
            <input
              class="form-check-radio"
              type="radio"
              name="answer"
              id="assessment1"
              value="option1"
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
              id="assessment2"
              value="option2"
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
              id="assessment3"
              value="option3"
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
              id="assessment4"
              value="option4"
              required
            />
            <label className="form-check-label" for="assessment4">
              <h5>Answer 4</h5>
            </label>
          </div>
        </Form>
        <ButtonGroup className="button" >
          <ButtonContained id="submit">Next</ButtonContained>
        </ButtonGroup>
      </div>
      
    </React.Fragment>
    
  );
};

export default Assessment;
