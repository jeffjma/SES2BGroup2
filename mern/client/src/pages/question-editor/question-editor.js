import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ButtonContained from "../../components/ButtonContained";
import "./question-editor.css";


class QuestionEditor extends Component {

  constructor() {
    super();
    
    this.state = {
      questionID: "",
      question: "",
      questionType: "",
      answers: [],
      correctAnswer: [],
      difficulty: "",
      editValue: "",
      editTarget: "",
      isEditing: false,
    };
    
    this.setCorrectAnswer = this.setCorrectAnswer.bind(this);
    this.setDifficulty = this.setDifficulty.bind(this);
    this.doEdit = this.doEdit.bind(this);
    this.saveToDatabase = this.saveToDatabase.bind(this);
    this.openEditor = this.openEditor.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
  }

  componentDidMount() {

    if(this.props.location?.state != null) {
      axios.post("http://localhost:5000/api/questions/edit", {questionId: this.props.location?.state.questionID})
      .then(res => {
        this.setState({
          questionID: this.props.location?.state.questionID,
          question: res.data.question,
          questionType: res.data.questionType,
          answers: res.data.answers,
          correctAnswer: res.data.correctAnswer,
          difficulty: res.data.difficulty,
        })
      })
    }
  }
  setCorrectAnswer(e) {
    this.setState({ correctAnswer: e.target.value });
    console.log('Setting correct answer to: ' + e.target.value);
  }

  setDifficulty(e) {
    this.setState({ difficulty: e.target.value });
    console.log('State set to ' + e.target.value);
  }

  doEdit() {
    var tempQuestion = this.state.question;
    var tempAnswers = this.state.answers;

    switch (this.state.editTarget) {
      case "Q":
        tempQuestion["name"] = this.state.editValue;
        break;
      case "A0":
        tempAnswers[0][0] = this.state.editValue;
        break;
      case "A1":
        tempAnswers[1][0] = this.state.editValue;
        break;
      case "A2":
        tempAnswers[2][0] = this.state.editValue;
        break;
      case "A3":
        tempAnswers[3][0] = this.state.editValue;
        break;
    }

    this.setState({
      question: tempQuestion,
      answers: tempAnswers,
      editValue: ""
    });
    this.closeEditor();
  }

  doClear(target) {
    var tempAnswers = this.state.answers;

    switch (target) {
      case "D0":
        tempAnswers[0][0] = " ";
        break;
      case "D1":
        tempAnswers[1][0] = " ";
        break;
      case "D2":
        tempAnswers[2][0] = " ";
        break;
      case "D3":
        tempAnswers[3][0] = " ";
        break;
    }

    this.setState({
      answers: tempAnswers,
      editValue: ""
    });
    this.closeEditor();
  }

  saveToDatabase() {
    console.log('This is questionID: '+ this.state.questionID);
    axios.post("http://localhost:5000/api/questions/edit", {
      questionId: this.state.questionID,
      updates: {
        question: this.state.question,
        questionType: this.state.questionType,
        answers: this.state.answers,
        correctAnswer: this.state.correctAnswer,
        difficulty: this.state.difficulty
      }
    })
    .then(() => {
      console.log('Question successfully updated!');
    }).catch(err =>
      console.log(err.response)
    );
  }

  openEditor(target) {
    this.setState({
      editTarget: target,
      isEditing: true
    });
  };

  closeEditor() {
    this.setState({ isEditing: false });
  }

  render() {
    return (
      <div class="container">
        <div>
          <p class="pageHeader">Edit Question</p>
        </div>
        <div class="pane">
          <div class="row QuestionRow">
            <div class="col-10">
              <p class="pageQuestion">
                { this.state.question } <Icon icon="edit" colour="#CCCCCC" action={() => this.openEditor("Q")} class="pageQuestionIcon"></Icon>
              </p>
            </div>
            <div class="col">
              <Form.Select bsPrefix="form-select centerV" value={this.state.question.difficulty} onChange={this.setDifficulty}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </div>
          </div>

          {
            this.state.answers.map((answer, index) => (
              <div class="row AnswerRow">
                <div class="col-11">
                  <input id={"Answer" + index} type="radio" name="answers" value={answer} onClick={this.setCorrectAnswer} checked={this.state.correctAnswer==answer} />
                  <label for={"Answer" + index}>{answer}</label>
                </div>
                <div class="col">
                  <Icon icon="edit" colour="#7EB9DB" action={() => this.openEditor("A" + index)}></Icon>
                </div>
                <div class="col">
                  <Icon icon="delete" colour="#B00020" action={() => this.doClear("D" + index)}></Icon>
                </div>
              </div>
            ))
          }
        </div>

        <div>
          <Modal show={this.state.isEditing} centered>
            <Modal.Body>
              <Form>
                <Form.Group controlID="editorForm.new">
                  <Form.Label>New Value</Form.Label>
                  <Form.Control value={this.state.editValue} onChange={e => this.setState({editValue: e.target.value})} type="text" />

                  <div class="row">
                    <div class="col"></div>
                    <div class="col-5 closeSaveButtonRow">
                      <Button bsPrefix="btn closeButton" onClick={this.closeEditor}>Close</Button>
                      <Button bsPrefix="btn saveButton" onClick={this.doEdit}>Save</Button>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>
        </div>

        <div class="row saveButtonRow">
          <div class="col"></div>
          <div class="col-4">
            <ButtonContained variant="contained" color="primary" onClick={this.saveToDatabase}>
              Save
            </ButtonContained>
          </div>
        </div>

      </div>
    );
  }
}

class Icon extends Component {
  constructor(props) {
    super();

    this.icon = props.icon;
    this.colour = props.colour;
    this.action = props.action;
    this.class = "Icon" + (props.class ? " " + props.class : "");

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.action) {
      this.action();
    }
  };

  renderIcon() {
    switch (this.icon) {
      case "edit":
        return (
          <svg width="16" height="16" fill={this.colour}>
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>
        );
      case "delete":
        return (
          <svg width="16" height="16" fill={this.colour}>
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
          </svg>
        );
    }
  }

  render() {
    return (
      <div class={this.class} onClick={this.onClick}>
        { this.renderIcon() }
      </div>
    );
  }
}

export default QuestionEditor;
