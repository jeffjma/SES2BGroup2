import React, { Component, useState } from 'react';
import { Button, Modal, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import "./question-editor.css";


class QuestionEditor extends Component {

  constructor() {
    super();

    [ this.question, this.answers ] = this.getData();

    this.state = {
      isEditing: false
    };

    this.openEditor = this.openEditor.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
  }

  getData() {
    var question = "Question goes here.";
    var answers = [
      "Answer goes here.",
      "Answer goes here.",
      "Answer goes here.",
      "Answer goes here."
    ];

    return [question, answers];
  };

  openEditor() {
    this.setState({ isEditing: true });
  };

  closeEditor() {
    this.setState({ isEditing: false });
  }

  render() {
    return (
      <div class="container">
        <div>
          <p class="pageHeader">Temp</p>
        </div>
        <div class="pane">
          <div class="row QuestionRow">
            <div class="col-10">
              <p class="pageQuestion">
                {this.question} <Icon icon="edit" colour="#CCCCCC" action={this.openEditor} class="pageQuestionIcon"></Icon>
              </p>
            </div>
            <div class="col">
              <Form.Select bsPrefix="form-select centerV">
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Form.Select>
            </div>
          </div>

          {
            this.answers.map(answer => (
              <div class="row AnswerRow">
                <div class="col-11">
                  <input type="radio" name="answers" value={answer} />
                  <span>{answer}</span>
                </div>
                <div class="col">
                  <Icon icon="edit" colour="#7EB9DB" action={this.openEditor}></Icon>
                </div>
                <div class="col">
                  <Icon icon="delete" colour="#B00020"></Icon>
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
                  <Form.Control type="text" />
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>
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
