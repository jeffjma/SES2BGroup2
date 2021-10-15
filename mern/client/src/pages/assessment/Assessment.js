import React, { Component } from "react";
import { ButtonGroup } from "react-bootstrap";
import ButtonContained from "../../components/ButtonContained";
import NavigationBar from "../../components/NavigationBar.js";
import "./Assessment.css";
import Timer from "./Timer.js";
import Question from "./attributes/Question";
import RadioAnswer from "./attributes/radioAnswer"
import CheckboxAnswer from "./attributes/checkboxAnswer"
import { Homepage } from "../Routes";

export default class Assessment extends Component {

// dummy code, i had a seperate .js file before but too much of a hassle to use it. i just put it in here knowing it'll be gone
  state = {
    id: 'tycvbSkSHM',
    questionNumber: 1,
    question: {
      1:'What is 2+2?',
      2:'Which out of these birds are corvid birds?',
    },
    questionTypes:{
      1: 'mc',
      2: 'cb',
    },
    answers: {
      1: {
        1:'2',
        2:'3',
        3:'4',
        4:'1'
      },

      2: {
        1:'Raven',
        2:'Crow',
        3:'Owl',
        4:'Magpie'
      },

    },
    correctAnswers: {
      1:'3',
      2:['1','2','4'],
    },
    correctAnswer: 0,
    difficulty: {
      1: 'primary',
      2: 'secondary',
    },
    chosenAnswer: 0,
    studentScore:0

  }

//checks if answers are correct and adds to student score 
  checkAnswer = answer => {
    const{ correctAnswers, questionNumber, studentScore } = this.state;
    
    if(answer === correctAnswers[questionNumber]){
      this.setState({
          studentScore: studentScore + 1,
          correctAnswer: correctAnswers[questionNumber],
          chosenAnswer: answer
      });
    }

    else{
      this.setState({
          correctAnswer: 0,
          chosenAnswer: answer
      });
    }
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
    this.setState({
        questionNumber: questionNumber + 1,
        correctAnswer: 0,
        clickedAnswer: 0
    });
  }

  render() {
    let { question, answers, correctAnswer, chosenAnswer, questionTypes, questionNumber} = this.state;

    var ShowAnswer;
    if(questionTypes[questionNumber] === 'mc'){
      ShowAnswer = <RadioAnswer
                      answer={answers[questionNumber]}
                      questionNumber={questionNumber}
                      checkAnswer={this.checkAnswer}
                      correctAnswer={correctAnswer}
                      chosenAnswer={chosenAnswer}
                    />;
    }

    else if (questionTypes[questionNumber] === 'cb') {
      ShowAnswer = <CheckboxAnswer
                      answer={answers[questionNumber]}
                      questionNumber={questionNumber}
                      checkAnswer={this.checkAnswer}
                      correctAnswer={correctAnswer}
                      chosenAnswer={chosenAnswer}
                    />;
    }

    return (
      <React.Fragment>
        {/* basically says if question number is equal to or under the length, do the quiz*/}
        {questionNumber <= Object.keys(question).length ? 
          (<>
        <NavigationBar />
  
        <div className="assessment-parent">
          <div className="headerObjects">
          <h3>Example Test</h3>
          <Timer />
          </div>
  
          <h4 className="questionTitle">Question {questionNumber}: </h4>
  
          <Question question={question[questionNumber]} />

          {/* looks over which answers need to be put for which question number + tracking the chosen answers*/} 

          {ShowAnswer}
          
          <ButtonGroup className="button" >
          <ButtonContained
                        className="nextQuestion"
                        isDisabled={
                        // supposed to disable the button until question is picked. worked for the first one but not the next ones. 
                          chosenAnswer && Object.keys(question).length >= questionNumber
                            ? false : true
                        }
                        // moves to the next question in dummy data
                        onClick={() => this.nextQuestion(questionNumber)}>Next</ButtonContained>
          </ButtonGroup>
        </div>

        {/* the 'else' statement: what happens after the question length goes over aka moving to post-assessment page */}
        </>) : (
          //change to post-assessment but i used homepage to test functionality
          <Homepage />
         )
        }
      </React.Fragment>
    );
  }
}
