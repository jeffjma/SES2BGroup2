import ButtonOutlined from "./ButtonOutlined";
import React from "react";
import styles from "../styles/subHeader.module.css";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavigationBar = ({ username, hasSubHeader, subjectName, profileClick, logoClick, dashboardClick, buttonName, buttonClick }) => {
  /**
   * @param {String} username Current username display on right side of navigation bar
   * @param {String} subjectName Current subject name displayed
   * @param {bool} hasSubHeader Whether the disabled or not
   * @param {String} profileClick redirect to correct profile
   * @param {String} logoClick redirect to correct homepage
   * @param {String} dashboardClick redirect to correct homepage
   * @param {String} buttonName different button for student and examiner
   */
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={logoClick}>Testing System</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href={profileClick}>
                <FontAwesomeIcon icon={faUser} />
              </a>
            </Navbar.Text>
            <Navbar.Text>
              <a
                href={profileClick}
                style={{ textDecoration: "none", marginLeft: "10px" }}
              >
                {username}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* 
      If false, subheader is not displayed
     */}
      {hasSubHeader ? <SubHeader 
                          subjectName={subjectName} 
                          buttonName={buttonName} 
                          dashboardClick={dashboardClick}
                          buttonClick={buttonClick}/> : null}
    </React.Fragment>
  );
};

const SubHeader = ({ subjectName, buttonName, dashboardClick, buttonClick }) => {

  return (
    <Container className={styles.subHeader} fluid>
      <Row className="headline">
        <Col className={styles.section1}>
          <a href={dashboardClick}>Dashboard</a>
          <FontAwesomeIcon icon={faChevronRight} />
        </Col>
        {/* 
    If no subjectName is given, it is not displayed
     */}
        {subjectName != null ? (
          <Col xs={6} className={styles.section2}>
            <a href="#subject">{subjectName}</a>
          </Col>
        ) : null}
        {buttonName != null ? (
          <Col className={styles.section3}>
            <ButtonOutlined onClick={buttonClick}>{buttonName}</ButtonOutlined>
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};

export default NavigationBar;
