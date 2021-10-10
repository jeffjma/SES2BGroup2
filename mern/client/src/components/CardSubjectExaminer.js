import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import styles from "../styles/subject-card-examiner.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

const CardSubjectExaminer = ({
  children,
  path,
  studentCount,
  assessmentCount,
}) => {
  /**
   * @param {String} assetImage url of the subject's image
   * @param {String} children The name of the subject
   * @param {String} path url to subject's page
   * @param {Int} studentCount Number of students enrolled in the subject
   * @param {Int} assessmentCount Number of assessments available in the subject
   */
  return (
    <Card className={styles.card}>
      <Card.Body>
        <div className="cardTitle body2">{children}</div>
        <Row className={styles.stats}>
          <Col>
            <Row className="part1">
              <div className={styles.student}>
                <FontAwesomeIcon
                  icon={faUsers}
                  size="2x"
                  className={styles.icon}
                />
              </div>
              {/* 
      If no {numberStudents} is given, the value is 0 by default
      */}
              <Col>
                <h3>{studentCount == null ? 0 : studentCount}</h3>
                <div className="caption">Students enrolled</div>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="part1">
              <div className={styles.test}>
                <FontAwesomeIcon
                  icon={faClipboardList}
                  size="2x"
                  className={styles.icon}
                />
              </div>
              {/* 
      If no {numberTests} is given, the value is 0 by default
      */}
              <Col>
                <h3>{assessmentCount == null ? 0 : assessmentCount}</h3>
                <div className="caption">Tests</div>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* 
      If no {path} is given, a placeholder path is shown
      */}
      </Card.Body>
      <a href={path != null ? path : "#subject-page"}>
        <span></span>
      </a>
    </Card>
  );
};

export default CardSubjectExaminer;
