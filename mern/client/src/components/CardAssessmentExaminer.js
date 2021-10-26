import React from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import styles from "../styles/assessment-card-examiner.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faUsers, faComments, faPen } from "@fortawesome/free-solid-svg-icons";
import { Doughnut } from "react-chartjs-2";

const CardAssessmentExaminer = ({
  children,
  attemptCount,
  questionCount,
  data,
  testID,
  subName
}) => {
  /**
   * @param {String} children The name of the assessment
   * @param {String} path url to assessment's question pool
   * @param {Int} attemptCount Number of times students attempted the assessment
   * @param {Int} questionCount Number of question in the question pool
   * @param {Object} data Dictionary containing the aggregated data about students' level
   */
  return (
    <Card className={styles.card}>
      <Container fluid>
        <Card.Body>
          <Row>
            <Col>
              <div className="cardTitle body2">{children}</div>
            </Col>
            <Col className={styles.edit}>
              <Link to={{
                pathname: '/QuestionPool', 
                state: {
                  testID: {testID},
                  subName: {subName}
                }
              }}>
                  <FontAwesomeIcon icon={faPen} />
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={8} className={styles.chart}>
              <Doughnut
                data={data}
                height={250}
                width={250}
                options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </Col>
            <Col>
              <Row className={styles.stats}>
                <div className={styles.questions}>
                  <FontAwesomeIcon icon={faComments} size="2x" color="white" />
                </div>

                {/* 
      If no {numberTests} is given, the value is 0 by default
      */}
                <Col>
                  <h3>{questionCount == null ? 0 : questionCount}</h3>
                  <div className="caption">Questions</div>
                </Col>
              </Row>

              <Row className={styles.stats}>
                <div className={styles.attempts}>
                  <FontAwesomeIcon icon={faUsers} size="2x" color="white" />
                </div>
                {/* 
      If no {numberStudents} is given, the value is 0 by default
      */}
                <Col>
                  <h3>{attemptCount == null ? 0 : attemptCount}</h3>
                  <div className="caption">Times attempted</div>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* 
      If no {path} is given, a placeholder path is shown
      */}
        </Card.Body>
      </Container>
    </Card>
  );
};

export default CardAssessmentExaminer;
