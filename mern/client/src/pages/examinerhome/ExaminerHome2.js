import React, { Component } from "react";
import "./ExaminerHome2.css";
import NavBar from "../../components/NavigationBar";
import CardAssessmentExaminer from "../../components/CardAssessmentExaminer.js";
import { Col, Row, Container } from "react-bootstrap";

class ExaminerHome2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //this state values are now only for test before fetching data from api
      username: "Examiner", // Name of User
      subjectName: "TestSubjectName",
      assessments: [
        // All Subjects (which is for test only before Fetching data from database)
        {
          id: "1",
          name: "Javascript test",
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
        },
        {
          id: "2",
          name: "Javascript test",
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
        },
        {
          id: "3",
          name: "Javascript test",
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
        },
      ],
    };
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
            username={this.state.username}
            hasSubHeader="true"
            subjectName={this.state.subjectName}
            buttonName="Add Test"
            profileClick="/ExaminerHome"
            logoClick="/ExaminerHome"
            dashboardClick="/ExaminerHome"
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

export default ExaminerHome2;
