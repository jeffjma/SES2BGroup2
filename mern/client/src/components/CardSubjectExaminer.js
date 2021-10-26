import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/subject-card-examiner.module.css";
import placeholderImage from "../assets/examiner_card.svg";

const CardSubjectExaminer = ({
  children,
  subID,
  subname
}) => {
  /**
   * @param {String} children The name of the subject
   * @param {String} subID subjectID of clicked card
   * @param {Int} studentCount Number of students enrolled in the subject
   * @param {Int} assessmentCount Number of assessments available in the subject
   */
  return (
    <Card className={styles.card}>
          <Card.Img
            variant="top"
            src={placeholderImage}
            alt="Subject logo"
          />
      <Card.Body>
        <div className="cardTitle body2">{children}</div>
        <Row className={styles.stats}>
          <Col>

          </Col>
        </Row>
        {/* 
      If no {path} is given, a placeholder path is shown
      */}
      </Card.Body>
        <Link to={{
              pathname: '/ExaminerHome/Subjects', 
              state: {
                subjectID: {subID},
                subjectName: {subname}
              }
            }}>
              <span></span>
        </Link>
    </Card>
  );
};

export default CardSubjectExaminer;
