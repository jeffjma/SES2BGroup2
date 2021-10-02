import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import styles from "../styles/listTile.module.css";

const ListTile = ({ children, status, path, score }) => {
  /**
   * @param {String} children The assessment name
   * @param {String} path url to assessment's page
   * @param {String} status Assessment's status, can be "completed" or "not-attempted"
   * @param {String} score User's score on that particular assessment
   */
  return (
    <Card className={styles.container}>
      <Col>
        <Row>
          <h5 className={styles.title}>{children}</h5>
        </Row>
        <Row>
          <div className={styles.status} data-state={status}></div>
        </Row>
      </Col>
      <Col>
        {/* If no {score} is given, show "No score instead"*/}
        <h5 className={styles.score}>{score}</h5>
        <h5 className={styles.no_score}> No score yet</h5>
      </Col>
      {/* If no {path} is given, a placeholder path is shown */}
      <a href={path != null ? path : "#assessment-page"}>
        <span></span>
      </a>
    </Card>
  );
};

export default ListTile;
