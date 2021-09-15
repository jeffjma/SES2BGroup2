import React from "react";
import {
  ButtonGroup,
  Form
} from "react-bootstrap";
import ButtonContained from "../../components/ButtonContained";
import NavigationBar from "../../components/NavigationBar.js";
import "./Assessment.css";

const Assessment = () => {
  
  return (
    <React.Fragment>
      <div className="assessment-parent">
          <NavigationBar />
          <h3>(Subject) Test</h3>
          <h4>Question: 1</h4>
          <h5>Question Is Here?</h5>
          <Form>
            <div class="form-check">
              <input 
                 class="form-check-input" 
                 type="radio" 
                 name="answer1" 
                 id="assessment1" 
                 value="option1" />
              <label class="form-check-label" for="assessment1">
                Answer 1
              </label>
            </div>

            <div class="form-check">
              <input 
                 class="form-check-input" 
                 type="radio" 
                 name="answer2" 
                 id="assessment2" 
                 value="option2" />
              <label class="form-check-label" for="assessment2">
                Answer 2
              </label>
            </div>

            <div class="form-check">
              <input 
                 class="form-check-input" 
                 type="radio" 
                 name="answer3" 
                 id="assessment3" 
                 value="option3" />
              <label class="form-check-label" for="assessment3">
                Answer 3
              </label>
            </div> 

            <div class="form-check">
              <input 
                 class="form-check-input" 
                 type="radio" 
                 name="answer4" 
                 id="assessment4" 
                 value="option4" />
              <label class="form-check-label" for="assessment4">
                Answer 4
              </label>
            </div>

          </Form>
          <ButtonGroup>
            <ButtonContained>
              Next
            </ButtonContained>
          </ButtonGroup>
          
      </div>
    </React.Fragment>
  );
};

export default Assessment;
