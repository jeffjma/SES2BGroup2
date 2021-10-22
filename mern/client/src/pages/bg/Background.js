import React, { Component } from 'react';
import axios from "axios";
import { Row } from 'react-bootstrap';
import ButtonContained from "../../components/ButtonContained";
import "./Background.css";


class Background extends Component {

  constructor(props) {
    super(props);

    this.sectionToRender = null;

    this.renderAppropriateSection = this.renderAppropriateSection.bind(this);
    this.renderHSSection = this.renderHSSection.bind(this);
    this.renderUniSection = this.renderUniSection.bind(this);

    this.state = {
      userID: '',
      educationLevel: '',
      year: '',
      currentSubjects: [],
      faculty: '',
      completedSubjects: [],
    }
  }

  handleCurrentSub(selection) {
    console.log(selection)
    this.setState({currentSubjects: selection});
  }

  handleYear(selection) {
    this.setState({year: selection});
  }

  handleFaculty(selection) {
    console.log(selection)
    this.setState({faculty: selection});
  }

  handleCompletedSub(selection) {
    console.log(selection)
    this.setState({completedSubjects: selection});
  }

  handleSave(e) {
    console.log('save btn clicked')
    axios
      .post("http://localhost:5000/api/users/background", this.state)
      .then(res => {
        console.log(res.data);
        this.props.history.push('/Login')
      })
      .catch(err =>
        alert('Login Failed. Try Again')
      );
  }

  // Getting user id from registration page
  componentDidMount () {
    if(this.props.location.state != null) {
      const { userid } = this.props.location.state

      this.setState({ 
        userID: userid,
      })
    }
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
    this.setState({educationLevel: selection});

    this.forceUpdate();
    console.log(this.sectionToRender);
  }

  renderHSSection() {
    return (
      <div>
        <Row>
          <SelectBox label="Year" options={["7", "8", "9", "10", "11", "12"]}></SelectBox>
        </Row>
        <Row>
          <SelectBox 
            label="Current Subjects" 
            options={["English Advanced", "Etc."]}>
          </SelectBox>
        </Row>
      </div>
    );
  }

  renderUniSection() {
    return (
      <div>
        <Row>
          <SelectBox 
            label="Year" 
            options={["1", "2", "3", "4", "5"]}
            callback={this.handleYear.bind(this)} >
          </SelectBox>
        </Row>
        <Row>
          <SelectBox 
              label="Current Subjects" 
              options={["English Advanced", "Etc."]}
              callback={this.handleCurrentSub.bind(this)}>
            </SelectBox>
        </Row>
        <Row>
          <SelectBox 
            label="Faculty" 
            options={["FEIT"]}
            callback={this.handleFaculty.bind(this)}>
          </SelectBox>
        </Row>
        <Row>
          <SelectBox 
            label="Completed Subjects" 
            options={["DSA", "Etc."]}
            callback={this.handleCompletedSub.bind(this)}>
          </SelectBox>
        </Row>
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
          <SelectBox 
            label="Past Education" 
            options={["Secondary", "Tertiary"]} 
            callback={ this.renderAppropriateSection }>
          </SelectBox>
        </Row>

        { this.sectionToRender }

        <ButtonContained variant="contained" color="primary" onClick={this.handleSave.bind(this)}>
          Save
        </ButtonContained>
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
