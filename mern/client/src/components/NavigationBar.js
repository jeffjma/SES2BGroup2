import ButtonOutlined from "./ButtonOutlined";
import React from "react";
import styles from "../styles/subHeader.module.css";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

<<<<<<< HEAD
const NavigationBar = ({ username, hasSubHeader, subjectName, btnTxt }) => {
=======
const NavigationBar = ({ username, hasSubHeader, subjectName, profileClick, logoClick, dashboardClick, buttonName }) => {
>>>>>>> frontend-develop
  /**
   * @param {String} username Current username display on right side of navigation bar
   * @param {String} subjectName Current subject name displayed
   * @param {bool} hasSubHeader Whether the disabled or not
<<<<<<< HEAD
=======
   * @param {String} profileClick redirect to correct profile
   * @param {String} logoClick redirect to correct homepage
   * @param {String} dashboardClick redirect to correct homepage
   * @param {String} buttonName different button for student and examiner
>>>>>>> frontend-develop
   */
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
<<<<<<< HEAD
          <Navbar.Brand href="#home">Testing System</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="#login">
=======
          <Navbar.Brand href={logoClick}>Testing System</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href={profileClick}>
>>>>>>> frontend-develop
                <FontAwesomeIcon icon={faUser} />
              </a>
            </Navbar.Text>
            <Navbar.Text>
              <a
<<<<<<< HEAD
                href="#login"
=======
                href={profileClick}
>>>>>>> frontend-develop
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
<<<<<<< HEAD
      {hasSubHeader ? <SubHeader subjectName={subjectName} btnTxt={btnTxt} /> : null}
=======
      {hasSubHeader ? <SubHeader 
                          subjectName={subjectName} 
                          buttonName={buttonName} 
                          dashboardClick={dashboardClick}/> : null}
>>>>>>> frontend-develop
    </React.Fragment>
  );
};

<<<<<<< HEAD
const SubHeader = ({ subjectName, btnTxt }) => {
=======
const SubHeader = ({ subjectName, buttonName, dashboardClick }) => {

>>>>>>> frontend-develop
  return (
    <Container className={styles.subHeader} fluid>
      <Row className="headline">
        <Col className={styles.section1}>
<<<<<<< HEAD
          <a href="#main">Dashboard</a>
=======
          <a href={dashboardClick}>Dashboard</a>
>>>>>>> frontend-develop
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
<<<<<<< HEAD
        <Col className={styles.section3}>
          <ButtonOutlined>{btnTxt}</ButtonOutlined>
        </Col>
=======
        {buttonName != null ? (
          <Col className={styles.section3}>
            <ButtonOutlined>{buttonName}</ButtonOutlined>
          </Col>
        ) : null}
>>>>>>> frontend-develop
      </Row>
    </Container>
  );
};

export default NavigationBar;
