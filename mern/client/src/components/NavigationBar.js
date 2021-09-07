import ButtonOutlined from "./ButtonOutlined";
import React from "react";
import styles from "../styles/subHeader.module.css";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavigationBar = ({ username, hasSubHeader, subjectName }) => {
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Testing System</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="#login">
                <FontAwesomeIcon icon={faUser} />
              </a>
            </Navbar.Text>
            <Navbar.Text>
              <a
                href="#login"
                style={{ textDecoration: "none", marginLeft: "10px" }}
              >
                {username}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {hasSubHeader ? <SubHeader subjectName={subjectName} /> : null}
    </React.Fragment>
  );
};

const SubHeader = ({ subjectName }) => {
  return (
    <Container className={styles.subHeader} fluid>
      <Row className="headline">
        <Col className={styles.section1}>
          <a href="#main">Dashboard</a>
          <FontAwesomeIcon icon={faChevronRight} />
        </Col>
        {subjectName != null ? (
          <Col xs={6} className={styles.section2}>
            <a href="#subject">{subjectName}</a>
          </Col>
        ) : null}
        <Col className={styles.section3}>
          <ButtonOutlined>Join Class</ButtonOutlined>
        </Col>
      </Row>
    </Container>
  );
};

export default NavigationBar;
