import React, { Component } from "react";
import "./ExaminerHome2.css";
import NavBar from "../../components/NavigationBar";
import CardAssessmentExaminer from "../../components/CardAssessmentExaminer.js";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Col, Row, Container } from "react-bootstrap";
import axios from "axios";

class ExaminerHome2 extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      //this state values are now only for test before fetching data from api
      userID: cookies.get('userid'),
      subjectName: "",
      subjectId: "",
      assessments: [],
    };
  }
  
  componentDidMount(){

    if(this.props.location?.state != null) {
      console.log(this.props.location?.state )
      this.setState({
        subjectId: this.props.location?.state?.subjectID.subID,
        subjectName: this.props.location?.state?.subjectName.subname
      })
  
    axios.post('http://localhost:5000/api/users/profile', {
      userID: this.state.userID
    })
    .then(res => {
        console.log(res.data)
        this.setState({ 
            UserName: res.data.name,
        })
    });

    axios.post("http://localhost:5000/api/tests/getForSubject", {
      subject: this.props.location?.state?.subjectID.subID
    })
    .then(res => {
      console.log(res.data);
      for(let i = 0; i < res.data.length; i++)  {
        console.log(res.data[i])
        this.state.assessments.push({
          id: ''+i,
          name: res.data[i].title,
          testId: res.data[i]._id,
          studentCount: 56,
          assessmentCount: 4,
          status: "1",
          chartData: {
            labels: ["Beginner", "Intermediate", "Advanced", "Expert"],
            datasets: [
              {
                label: "# of Attempts",
                data: [12, 19, 3, 5],
                backgroundColor: [
                  "rgba(200, 77, 99, 1)",
                  "rgba(255, 232, 112, 1)",
                  "rgba(253, 165, 125, 1)",
                  "rgba(91, 194, 167, 1)",
                ],
                borderColor: [
                  "rgba(200, 77, 99, 1)",
                  "rgba(255, 232, 112, 1)",
                  "rgba(253, 165, 125, 1)",
                  "rgba(91, 194, 167, 1)",
                ],
                borderWidth: 1,
                hoverOffset: 4,
              },
            ],
          },
        })
        console.log(this.state.assessments);
        this.forceUpdate();
      }
    })

    }
  }

  redirectAddTest() {
    this.props.history.push('/QuestionPool');
  }

  render() {
    let SubScript = ( // The left table script showing the subjects details
      <Row>
        {this.state.assessments.map((assessment) => (
          <Col xs="auto" md="auto" className="subject">
            <CardAssessmentExaminer
              path="/ExaminerHome/Subjects"
              questionCount={assessment.studentCount}
              attemptCount={assessment.assessmentCount}
              data={assessment.chartData}
            >
              {assessment.name}
            </CardAssessmentExaminer>
          </Col>
        ))}
      </Row>
    );

    return (
      <div className="examiner-home2-container">
        <div className="navbar-container">
          <NavBar
            username={this.state.UserName}
            hasSubHeader="true"
            subjectName={this.state.subjectName}
            buttonName="Add Test"
            profileClick="/ExaminerHome"
            logoClick="/ExaminerHome"
            dashboardClick="/ExaminerHome"
            buttonClick={this.redirectAddTest.bind(this)}
          ></NavBar>
        </div>
        <div className="overview-container">
          <h6> Overview </h6>
          <Container fluid className="subjects">
            {SubScript}
          </Container>
        </div>
      </div>
    );
  }
}

export default compose(withRouter, withCookies)(ExaminerHome2);
