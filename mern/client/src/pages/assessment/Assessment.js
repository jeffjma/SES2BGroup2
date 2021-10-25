import React, { Component } from "react";
import { ButtonGroup } from "react-bootstrap";
import ButtonContained from "../../components/ButtonContained";
import NavigationBar from "../../components/NavigationBar.js";
import "./Assessment.css";
import Timer from "./Timer.js";
import Question from "./attributes/Question";
import RadioAnswer from "./attributes/radioAnswer"
import CheckboxAnswer from "./attributes/checkboxAnswer"
import TextAnswer from "./attributes/textAnswer"
// import { Homepage } from "../Routes";

export default class Assessment extends Component {

// dummy code, i had a seperate .js file before but too much of a hassle to use it. i just put it in here knowing it'll be gone
  state = {
    id: 'tycvbSkSHM',
    questionNumber: 1,
    question: {
      1:'What is 2+2?',
      2:'Which out of these birds are corvid birds?',
      3:'Complete the sentence: "Advancement cannot occur without both thesis..."'
    },
    questionTypes:{
      1: 'mc',
      2: 'cb',
      3: 'sa'
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
      3:' ',
    },
    correctAnswers: {
      1:'3',
      2:['1','2','4'],
      3:"and Antithesis"
    },
    correctAnswer: 0,
    difficulty: {
      1: 'primary',
      2: 'secondary',
      3: 'senior secondary'
    },
    chosenAnswer: 0,
    studentScore:0
  }

  //checks if answers are correct and adds to student score 
  checkAnswer = answer => {
    const{ correctAnswers, questionNumber, questionTypes, studentScore } = this.state;

    if(questionTypes[questionNumber] === 'mc'){
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
    
    else if(questionTypes[questionNumber] === 'cb'){
      var selectedAnswers = []; 
      let index = selectedAnswers.indexOf(answer);
      
      for(var i = 0; i < answer.length; i++){
        if(answer[i] === correctAnswers[questionNumber]){
          selectedAnswers.push(answer[i]);
        }
        else{
          if(index !== -1){
            selectedAnswers.splice(index, 1);
          }
        }
      }

      if(selectedAnswers.value === correctAnswers[questionNumber].value){
        this.setState({
          studentScore: studentScore + 1,
          correctAnswer: correctAnswers[questionNumber],
          chosenAnswer: answer[i]
        });
      }

      else{
        this.setState({
          correctAnswer: 0,
          chosenAnswer: answer
        });
      }
    }

    else if(questionTypes[questionNumber] === 'sa'){
      var textAnswer = correctAnswers[questionNumber];
      var textValue = answer.value;

      if(answer === textValue && (textValue.indexOf(textAnswer) !== -1)){
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
    let { question, answers, correctAnswer, chosenAnswer, questionTypes, questionNumber, studentScore} = this.state;

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

    else if (questionTypes[questionNumber] === 'sa'){
      ShowAnswer = <TextAnswer
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
          // <Homepage />
          <div className="finalPage">
            <p>Student Score is {studentScore}</p>
          </div>
          
         )
        }
      </React.Fragment>
    );
  }
}
