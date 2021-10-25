import React, { Component } from "react";
import "./ExaminerHome.css";
import NavBar from "../../components/NavigationBar";
import CardSubjectExaminer from "../../components/CardSubjectExaminer.js";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Col, Row, Container } from "react-bootstrap";

class ExaminerHome extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      //this state values are now only for test before fetching data from api
      username: "Examiner", // Name of User
      subjects: [
        // All Subjects (which is for test only before Fetching data from database)
        {
          id: "1",
          name: "31242 - Advanced Internet Programming - Spring 2021",
          studentCount: 56,
          assessmentCount: 4,
          status: "1",
        },
        {
          id: "2",
          name: "31242 - Advanced Internet Programming - Spring 2021",
          studentCount: 56,
          assessmentCount: 4,
          status: "1",
        },
        {
          id: "3",
          name: "31242 - Advanced Internet Programming - Spring 2021",
          studentCount: 56,
          assessmentCount: 4,
          status: "1",
        },
        {
          id: "4",
          name: "31242 - Advanced Internet Programming - Spring 2021",
          studentCount: 56,
          assessmentCount: 4,
          status: "1",
        },
        {
          id: "5",
          name: "31242 - Advanced Internet Programming - Spring 2021",
          studentCount: 56,
          assessmentCount: 4,
          status: "1",
        },
      ],
    };
  }

  render() {
    let SubScript = ( // The left table script showing the subjects details
      <Row>
        {this.state.subjects.map((subject) => (
          <Col xs="auto" md="auto" className="subject">
            <CardSubjectExaminer
              path="/ExaminerHome/Subjects"
              studentCount={subject.studentCount}
              assessmentCount={subject.assessmentCount}
            >
              {subject.name}
            </CardSubjectExaminer>
          </Col>
        ))}
      </Row>
    );

    return (
      <div className="examiner-home-container">
        <div className="navbar-container">
          <NavBar
            username={this.state.username}
            hasSubHeader="true"
            subjectName=""
            buttonName=""
            dashboardClick="/ExaminerHome"
            profileClick="/ExaminerHome"
            logoClick="/ExaminerHome"
          ></NavBar>
        </div>
        <div className="dashboard-container">
          <h6> Your Subjects </h6>
          <Container fluid className="subjects">
            {SubScript}
          </Container>
        </div>
      </div>
    );
  }
}

export default withCookies(ExaminerHome);
