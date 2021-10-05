import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import ButtonContained from "../../components/ButtonContained";
import "./Background.css";


class Background extends Component {

  constructor() {
    super();

    this.sectionToRender = null;

    this.renderAppropriateSection = this.renderAppropriateSection.bind(this);
    this.renderHSSection = this.renderHSSection.bind(this);
    this.renderUniSection = this.renderUniSection.bind(this);
  }

  /**
   * Render appropriate section depending on selection in 'Past
   * Education' input.
   */
  renderAppropriateSection(selection) {
    this.sectionToRender = "";
    this.forceUpdate();

    switch (selection.toUpperCase()) {
      case "SECONDARY":
        this.sectionToRender = this.renderHSSection();
        break;

      case "TERTIARY":
        this.sectionToRender = this.renderUniSection();
        break;

      default:
        break;
    }

    this.forceUpdate();
  }

  renderHSSection() {
    return (
      <div>
        <Row>
          <SelectBox label="Year" options={["7", "8", "9", "10", "11", "12"]}></SelectBox>
        </Row>

        <center>
          <ButtonContained variant="contained" color="primary" href="homepage">
            Save
          </ButtonContained>
        </center>
      </div>
    );
  }

  renderUniSection() {
    return (
      <div>
        <Row>
          <SelectBox label="Year" options={["1", "2", "3", "4", "5"]}></SelectBox>
        </Row>
        <Row>
          <SelectBox label="Semester" options={["Autumn", "Spring", "Summer"]}></SelectBox>
        </Row>
        <Row>
          <SelectBox label="Faculty" options={["FEIT"]}></SelectBox>
        </Row>

        <center>
          <ButtonContained variant="contained" color="primary" href="homepage">
            Save
          </ButtonContained>
        </center>
      </div>
    );
  }

  render() {
    return (
      <div class="container bg-main-container">
        <Row>
          <span class="bg-title">Your Background</span>
        </Row>
        <Row>
          <SelectBox label="Past Education" options={["Secondary", "Tertiary"]} callback={ this.renderAppropriateSection }></SelectBox>
        </Row>

        { this.sectionToRender }
      </div>
    );
  }
}

/**
 * Basic selection menu.
 * 
 * Use to create a selection menu with corresponding label positioned
 * above it. Select is shown as the default option. Can be assigned a
 * callback to run when value changes.
 */
class SelectBox extends Component {

  constructor(props) {
    super();

    this.value = null;
    this.label = props.label;
    this.options = props.options;
    this.callback = props.callback;

    // Running in STRICT mode causes constructor to run twice.
    if (this.options[0] !== "Select") {
      this.options.unshift("Select");
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.value = event.target.value;
    if (this.callback) {
      this.callback(this.value);
    }
  }

  render() {
    return (
      <div class="container sb-main-container">
        <Row>
          <label class="sb-label">{this.label}</label>
          <div class="sb-select-container">
            <select onChange={ this.onChange }>
              { [...Array(this.options.length)].map((e, i) => <option>{this.options[i]}</option>) }
            </select>
          </div>
        </Row>
      </div>
    );
  }
}

export default Background;
