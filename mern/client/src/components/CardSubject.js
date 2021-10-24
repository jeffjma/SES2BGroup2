import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/card.module.css";
import placeholderImage from "../assets/placeholder-card.png";

const CardSubject = ({ children, path, assetImage }) => {
  /**
   * @param {String} assetImage url of the subject's image
   * @param {String} children The name of the subject
   * @param {String} path url to subject's page
   */

  return (
        <Card className={styles.card}>
          {/* 
          If no {assetImage} is given, a placeholder image is shown
          */}
          <Card.Img
            variant="top"
            src={assetImage != null ? assetImage : placeholderImage}
            alt="Subject logo"
          />
          <Card.Body>
            <div className="cardTitle subtitle1">{children}</div>
            {/* 
          If no {path} is given, a placeholder path is shown
          */}
          </Card.Body>
          <Link to={{
            pathname: '/home/subjects', 
            state: {
              subjectID: "hello"
            }
          }}>
            <span></span>
          </Link>
        </Card>
  );
};

export default CardSubject;
