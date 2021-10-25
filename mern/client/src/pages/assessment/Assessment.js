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
      question: {
        1:'What is 2+2?',
        2:'What colour is the sky?',
        3:'Between music, theater, and chariot racing, which sport did Nero win when he participated in the Olympics?',
        4:'If angle C is 28 degrees, and angles A + D are equal to 88 degrees, what is the angle of B + E?',
        5:'What’s one of the origins for the phrase “cat got your tongue”?',
        6:'If we use “three watermelons in the sun” to visualize a certain matter’s size against the universe’s, what are the melons?',
        7:'Counting both black and white surfaces, how many surfaces are there in total on a soccer ball?',
      },
      answers: {
        1: {
          1:'2',
          2:'3',
          3:'4',
          4:'1'
        },

        2: {
          1:'Hot Pink',
          2:'Light Blue',
          3:'Blood Red',
          4:'Lime Green'
        },

        3: {
          1:'Music',
          2:'Theatre', 
          3:'Chariot Racing', 
          4:'All of them'
        },

        4: {
          1:'74',
          2:'64', 
          3:'62', 
          4:'40'
        },

        5: {
          1:'Wild cats who don’t meow',
          2:'Tongues are the same texture as a cat’s skin', 
          3:'A breed of cat with no tongue', 
          4:'Cats eating human tongues'
        },

        6: {
          1:'Stars',
          2:'Moons', 
          3:'Galaxies', 
          4:'People'
        },

        7: {
          1:'26',
          2:'34', 
          3:'32', 
          4:'22'
        }, 
      },
      correctAnswers: {
        1:'3',
        2:'2',
        3:'4',
        4:'2',
        5:'4',
        6:'1',
        7:'3'
      },
      chosenAnswer: '',
      questionNumber: 1,
      questions:[],
      levels:[],
      results:[],
      question1: {}
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
        question1: res.data.question
      });
    });
  }

//Selects an answer by updating chosenAnswer
  selectAnswer = answer => {
    const{answers, questionNumber } = this.state;
    this.setState({
      chosenAnswer: answers[questionNumber][answer]
    })
    this.state.chosenAnswer = this.state.answers[questionNumber][answer];
    console.log(this.state.chosenAnswer);
  }

// makes button move onto the next question
  nextQuestion = (questionNumber) => {
    this.setState({
        questionNumber: questionNumber + 1
    });
  }

  render() {
    let { question, answers, chosenAnswer, questionNumber} = this.state;
    //Redirects if question number is greater than question length
    if (questionNumber > Object.keys(question).length) {
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

          <Question question={this.state.question1.question} />

          {/* looks over which answers need to be put for which question number + tracking the chosen answers*/}
          {(this.state.question1.questionType === 'mc') ?
          <Answer answer={this.state.question1.answers} selectAnswer={this.selectAnswer} />:<></>
          }
          <ButtonGroup className="button" >
            <ButtonContained 
              className="nextQuestion"
              isDisabled={chosenAnswer === '' || Object.keys(question).length < questionNumber} //Disables the button if no answer is selected
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