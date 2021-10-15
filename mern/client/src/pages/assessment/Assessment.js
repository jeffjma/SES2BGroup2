import React, { Component } from "react";
import axios from "axios";
import { ButtonGroup } from "react-bootstrap";
import ButtonContained from "../../components/ButtonContained";
import NavigationBar from "../../components/NavigationBar.js";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import "./Assessment.css";
import Timer from "./Timer.js";
import Question from "./attributes/Question";
import Answer from "./attributes/Answer";
import { Redirect } from "react-router";
import RadioAnswer from "./attributes/radioAnswer"
import CheckboxAnswer from "./attributes/checkboxAnswer"
import { Homepage } from "../Routes";

class Assessment extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){
    super(props)
    const { cookies } = props;
    this.state = {
      userID: cookies.get('userid'),
      UserName: 'John Smith',
      testId: '616abdbcbab32b5cfab1fb45',
      chosenAnswer: '',
      questionNumber: 1,
      questions:[],
      levels:[],
      results:[],
      question: {},
      continueTest: true,
      level:0
    }
  }

  //Gets username
  componentDidMount(){
    axios.post('http://localhost:5000/api/users/profile', {
      userID: this.state.userID
   })
    .then(res => {
        console.log(res.data)
        this.setState({ 
            UserName: res.data.name,
        })
    });

    axios.post('http://localhost:5000/api/tests/getNextQuestion', {
      test: this.state.testId,
      questions: this.state.questions,
      levels: this.state.levels,
      results: this.state.results
    })
    .then(res => {
      console.log(res.data);
      this.setState({
        question: res.data.question,
        level: res.data.level
      });
    });
  }

//Selects an answer by updating chosenAnswer
  selectAnswer = answer => {
    this.setState({
      chosenAnswer: answer
    })
  }

  //checks what kind of question it is 
  checkQuestionType = type => {
    const{ questionTypes, questionNumber } = this.state;

    if(type === questionTypes[questionNumber] && type === 'mc'){
        this.setState({ type: 'radio' });
    }

    else if( type === questionTypes[questionNumber] && type === 'cb'){
      this.setState({ type: 'checkbox' });
    }
  }

// makes button move onto the next question
  nextQuestion = (questionNumber) => {
    this.state.levels.push(this.state.question.difficulty);
    this.state.results.push(this.state.chosenAnswer === this.state.question.correctAnswer[0]);
    this.state.questions.push(this.state.question._id);
    this.setState({
      levels: this.state.levels,
      results: this.state.results,
      questions: this.state.questions
    });
    axios.post('http://localhost:5000/api/tests/getNextQuestion', {
      test: this.state.testId,
      questions: this.state.questions,
      levels: this.state.levels,
      results: this.state.results
    }).then(res => {
      console.log(res.data);
      this.setState({
        question: res.data.question,
        chosenAnswer: '',
        questionNumber: questionNumber + 1,
        continueTest: res.data.continueTest,
        level: res.data.level
      });
    })
  }

  render() {
    let {chosenAnswer, questionNumber} = this.state;
    //Redirects if question number is greater than question length
    if (!this.state.continueTest) {
      return (
        <Redirect to='/Home'/>
      );
    }
    return (
      <React.Fragment>
        <NavigationBar
          username={this.state.UserName}
          profileClick = "/Profile"
          logoClick = "/Home">
        </NavigationBar>
  
        <div className="assessment-parent">
          <div className="headerObjects">
            <h3>Example Test</h3>
            <Timer />
          </div>
  
          <h4 className="questionTitle">Question {questionNumber}: </h4>

          <Question question={this.state.question.question} />

          {/* looks over which answers need to be put for which question number + tracking the chosen answers*/}
          {(this.state.question.questionType === 'mc') ?
          <Answer answer={this.state.question.answers} selectAnswer={this.selectAnswer} chosenAnswer={this.state.chosenAnswer}/>:<></>
          }
          <ButtonGroup className="button" >
            <ButtonContained 
              className="nextQuestion"
              isDisabled={chosenAnswer === ''} //Disables the button if no answer is selected
              onClick={() => this.nextQuestion(questionNumber)}> 
                Next
            </ButtonContained>
          </ButtonGroup>
        </div>
      </React.Fragment>
    );
  }
}

export default withCookies(Assessment);