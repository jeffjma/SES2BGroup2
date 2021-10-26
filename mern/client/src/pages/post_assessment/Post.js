//this page is Homepage 4.5 in figma
import React, { Component } from 'react';
//import font-awesome icons
import 'font-awesome/css/font-awesome.min.css';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import axios from 'axios';
//import NavigationBar from components
import NaviBar from "../../components/NavigationBar";
import Button from "react-bootstrap/Button";
// import styles from "../styles/button.module.css";
//import ButtonOutlined from components
import ButtonOutlined from "../../components/ButtonOutlined";
import gold from './gold_medal.png';
import sliver from './silver_medal.png';
import "./post.css";

class Post extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props)
    const { cookies } = props;
    this.state = {
      //this state values are now only for test before fetching data from api
      userID: cookies.get('userid'),
      UserName: 'John Smith',                       // Name of User
      SubjectName: '',                 // Name of Subjects
      AvailableAss: '',                               // Numbers of Assessments shown in table
      CompletedCheckBox: false,                       // Boolean for check whether checkbox("Completed") is clicked
      NotAttemptedCheckBox: false,                    // Boolean for check whether checkbox("NotAttempted") is clicked
      AllAssOfSubjects: [                              // All assessments of this Subjects (which is for test only before 
        { id: "1", name: "Ass1", status: "1" },          // Fetching data from database)
        { id: "2", name: "Ass2", status: "0" },
        { id: "3", name: "Ass3", status: "0" },
        { id: "4", name: "Ass4", status: "0" },
      ],
      SelectedSubjects: [],                            // All selected assessment according to the filters
      score: 100,
      testId: '',
      time: ''
    }
  }

  componentDidMount() {
    let currentTime = new Date();
    let displayTime = 'Oct 27 at ' + currentTime.getHours() + ':' + currentTime.getMinutes() + ' am';
    this.setState({time: displayTime});

    var Sub = this.state.AllAssOfSubjects;             // Temporary array for AllAssOfSubjects value
    this.setState({ SelectedSubjects: [] });            // Set SelectedSubjects to null before running

    this.setState({ 
      score: this.props.location?.state.level, 
      testId: this.props.location?.state.testId,
      SubjectName: this.props.location?.state.subjectName,
      testName: this.props.location?.state.testName
    });

    axios.post("http://localhost:5000/api/results/add", {testID: this.props.location?.state.testId, result: this.props.location?.state.level})
        .then(res => {
            console.log(res.data._id);
            axios.post("http://localhost:5000/api/users/newTestResult", {userID: this.state.userID, resultID: this.props.location?.state.level})
            .then(resp => {
              console.log(resp.data);
            })
        })

    //The process of handling filters
    if (this.state.CompletedCheckBox) {
      if (!this.state.NotAttemptedCheckBox) {           // 1: Completed = true and Not Attempted = false
        this.setState({ SelectedSubjects: [] });
        var TempFirstTrue = Sub.filter((element) => { return element.status === "1" });
        this.setState({ SelectedSubjects: TempFirstTrue, AvailableAss: TempFirstTrue.length });
      }
      if (this.state.NotAttemptedCheckBox) {            // 1: Completed = true and Not Attempted = true
        this.setState({ SelectedSubjects: [], AvailableAss: "0" })
      }
    }
    if (!this.state.CompletedCheckBox) {
      if (this.state.NotAttemptedCheckBox) {            // 1: Completed = false and Not Attempted = true
        var TempFirstFalse = Sub.filter((element) => { return element.status === "0" });
        this.setState({ SelectedSubjects: TempFirstFalse, AvailableAss: TempFirstFalse.length });
      }
      if (!this.state.NotAttemptedCheckBox) {           // 1: Completed = false and Not Attempted = false
        this.setState({ SelectedSubjects: [] });
        this.setState({ SelectedSubjects: Sub, AvailableAss: Sub.length })
      }
    }
    Sub = [];                                         // Set Sub to null before next running
  }

  handleToAss(e) {                                     // Push to url of each Assessment
    this.props.history.push(window.location.pathname + "/" + e)
  }

  handleCompleted() {                                  //Once click checkbox("Completed"), change CompletedCheckBox
    var Temp = this.state.CompletedCheckBox;
    if (Temp) {
      this.setState({ CompletedCheckBox: false })
    }
    if (!Temp) {
      this.setState({ CompletedCheckBox: true })
    }
  }

  handleNotCompleted() {                               //Once click checkbox("Completed"), change NotAttemptedCheckBox
    var Temp = this.state.NotAttemptedCheckBox;
    if (Temp) {
      this.setState({ NotAttemptedCheckBox: false });
    }
    if (!Temp) {
      this.setState({ NotAttemptedCheckBox: true })
    }
  }

  handleCheckBox() {                                   // handle "Confirm" button to run filters
    this.componentDidMount();
  }

  changeStatusCss(e) {                                 // Change status css color(green/gray) and type(boolean -> var)
    if (e === "1") {
      return <p className="AssListStatusComp">Completed</p>
    }
    else {
      return <p className="AssListStatusNotAtt">Not Attempted</p>
    }
  }

  render() {
    console.log(this.state.testName);
    let AssScript = (                                // The left table script showing the assessments details
      <div>
        {this.state.SelectedSubjects.map(SelectedSubject => (
          <tr key={SelectedSubject.id}>
            <td className="AssListTd" onClick={() => this.handleToAss(SelectedSubject.id)}><p className="AssListName">{SelectedSubject.name}</p>
              {this.changeStatusCss(SelectedSubject.status)}
            </td>
          </tr>
        ))}
      </div>
    );
    let { score } = this.state;
    return (
      <React.Fragment>
        {/* this is main content */}
        <body className="PostMainBody">
          {/* this is title */}
          <div className="TitleBackground">
            <NaviBar
              username={this.state.UserName}
              hasSubHeader="true"
              subjectName={this.state.SubjectName}
              // buttonName = "Join Class"
              profileClick = "/Profile"
              dashboardClick = "/Home"
              logoClick = "/Home"
            ></NaviBar>
          </div>

          <div className="box">
            <div className="box-left">
              <div className="txt-1" style={{
                marginBottom: 10
              }}>
                ✓ Assessment Submitted!
              </div>
              <div className="txt-1" style={{
                marginBottom: 40
              }}>
                {this.state.time}
              </div>
              <div className="txt-1" style={{
                borderBottom: '1px solid rgb(203,206,209)',
                paddingBottom: 20,
                marginBottom: 20
              }}>
                {this.state.testName}
              </div>
              <div className="txt-1" style={{
                marginBottom: 20
              }}>
                Questions
              </div>

              <div className="questionBox">
                <div className="questionItem">
                  Question 1 
                </div>
                <div className="questionItem">
                  Question 2 
                </div>
                <div className="questionItem">
                  Question 3 
                </div>
                <div className="questionItem">
                  Question 4 
                </div>
                <div className="questionItem">
                  Question 5 
                </div>
                <div className="questionItem">
                  Question 6
                </div>
                {/* <div style={{
                  color: 'red'
                }} className="questionItem">
                  Question 6 x
                </div> */}

              </div>

              <div style={{
                padding: '0px 20px',
                cursor: 'pointer',
                paddingLeft: 60,
                marginBottom: 20
              }}>
                ...
              </div>

              {/* <div className="txt-1" style={{

                paddingBottom: 40,
              }}>
                Time elapsed: 5 mins, 12 seconds
              </div> */}

              <div style={{
                borderBottom: '1px solid rgb(203,206,209)',
                marginBottom: 35
              }}>

              </div>
              <div style={{
                textAlign: 'center'
              }}>
                {/* <Button style={{
                  width: 200,
                  borderRadius: 20
                }} variant="outline-primary"
                  size="sm">TRY AGAIN</Button> */}
              </div>
            </div>
            <div className="box-right">
              <div className="txt-1">
                Congratulations on completing the test! You scored a grade of:
              </div>
              <div className="score-box">
                <div className="score-left">
                  <div style={{
                    fontSize: 30,
                    marginRight: 50
                  }}>Level {this.state.score}</div>
                </div>
                <div className="score-right">
                  <img src={score >= 6 ? gold : sliver} className="score-img" />
                </div>
              </div>
              <div style={{
                textAlign: 'center'
              }}>
                {/* <Button style={{
                  width: 200,
                  borderRadius: 20
                }} variant="outline-primary"
                  size="sm">TRY AGAIN</Button> */}
              </div>
            </div>
          </div>
          {/* this is leftcontent */}
          {/* <div className="LeftContent">
           <p className="AssessmentTitle">
             You have {this.state.AvailableAss} assessments available
           </p>
           <div className="LeftCube">
             {AssScript}
           </div>
         </div> */}

          {/* this is rightcontent */}
          {/* <div className="RightContent">
           <div className="RightCube">       
             <p className="FilterTitle"><br/>Filters</p>
             <p className="FilterSubtitle">STATUS</p>
             <input type="checkbox" className="FilterCheckbox"  onClick={()=>this.handleCompleted()}></input><p className="FilterCheckboxName">Completed</p>
             <br/>
             <input type="checkbox" className="FilterCheckbox" onClick={()=>this.handleNotCompleted()}></input><p className="FilterCheckboxName">Not attempted</p>
             <br/><br/>&nbsp;&nbsp;&nbsp;
             <ButtonOutlined
               children = "Confirm"
               onClick={()=>this.handleCheckBox()}
             ></ButtonOutlined>
           </div>
         </div> */}
        </body>
      </React.Fragment>
    )
  }
};

export default withCookies(Post);