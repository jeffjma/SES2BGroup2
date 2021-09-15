import React from "react";
import {
  Form,
  Image,
  Container,
  Col,
  Row
} from "react-bootstrap";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined"
import { Link } from "react-router-dom";
import logo from "../../assets/logo_register.png";
import "./Login.css";

const Login = () => {

  return (

    <React.Fragment>
      <div className="login-parent">

      <Container>
        <Row>
          <Col md={7} sm={12} xs={12}>
            <h3 className="Title">
              Login to Testing System
            </h3>

            <h5 className="SecondTitle">
               Access your account or get started with us
            </h5>

            <div className="registerButton">
                <Link to='/'>
                  <ButtonOutlined
                    variant="contained"
                    color="primary"
                    href="registration">
                    I want to Register
                  </ButtonOutlined>
                </Link>
            </div>

              <Form noValidate autoComplete="off">

              <Form.Group className="student-email" controlID="studentEmail">
                <Form.Control
                  type="text"
                  size="lg"
                  placeholder="Email Address"
                />
              </Form.Group>

              <Form.Group className="student-password">
                <Form.Control
                  type="password"
                  size="lg"
                  placeholder="Password"
                />
              </Form.Group>

              <Row
              className="align-items-center"
              id="submit-row">
                <Col md={6} sm={12} xs={12}>
                  <div className="LoginButton">
                    <ButtonContained
                      variant="contained"
                      color="primary"
                      href="homepage">
                      Login
                    </ButtonContained>
                  </div>
                </Col>
                <Col md={6} sm={12} xs={12}>
                  <Form.Text id="forgotPassword" muted>
                    <Link
                    to='/login'
                    className="forgot-pword"
                    > Forgot Password? </Link>
                  </Form.Text>
                </Col>
              </Row>
            </Form>
          </Col>

            <Col md={5} sm={12} xs={12}>
              <Image src={logo}className="DrawingLogin"/>
            </Col>

        </Row>
       </Container>
      </div>
    </React.Fragment>
  );

};

export default Login;
