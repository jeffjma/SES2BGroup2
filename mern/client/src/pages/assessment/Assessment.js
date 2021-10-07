import React, { Component } from "react";
import { ButtonGroup } from "react-bootstrap";
import ButtonContained from "../../components/ButtonContained";
import NavigationBar from "../../components/NavigationBar.js";
import "./Assessment.css";
import Timer from "./Timer.js";
import Question from "./attributes/Question";
import Answer from "./attributes/Answer"
import { Homepage } from "../Routes";

export default class Assessment extends Component {

// dummy code, i had a seperate .js file before but too much of a hassle to use it. i just put it in here knowing it'll be gone
  state = {
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
        correctAnswer: 0,
        chosenAnswer: 0,
        questionNumber: 1,
        studentScore:0,
        UserName: 'John Smith',   
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

// makes button move onto the next question
  nextQuestion = (questionNumber) => {
    this.setState({
        questionNumber: questionNumber + 1,
        correctAnswer: 0,
        clickedAnswer: 0
    });
  }

  render() {
    let { question, answers, correctAnswer, chosenAnswer, questionNumber} = this.state;

    return (
      <React.Fragment>
        {/* basically says if question number is equal to or under the length, do the quiz*/}
        {questionNumber <= Object.keys(question).length ? 
          (<>
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
  
          <Question question={question[questionNumber]} />

          {/* looks over which answers need to be put for which question number + tracking the chosen answers*/}
          <Answer
                            answer={answers[questionNumber]}
                            questionNumber={questionNumber}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            chosenAnswer={chosenAnswer}
                        />
          
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
