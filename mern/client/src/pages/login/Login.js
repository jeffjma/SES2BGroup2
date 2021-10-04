import React from "react";
import axios from "axios";
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

    /* This is just placeholder data below, please replace with data from form */
    const userData = {
      email: 'main@test.com', 
      password: 'test123'
    };
  
    function handleLogin(e) {
      axios
        .post("http://localhost:5000/api/users/login", userData)
        .then(res => 
          console.log('login successful'))
        .catch(err =>
          console.log('there was an error')
        );
  
    }

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

              <Form.Group className="email" controlID="Email">
                <Form.Control
                  type="text"
                  size="lg"
                  placeholder="Email Address"
                />
              </Form.Group>

              <Form.Group className="password">
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
                      href="homepage"
                      onClick={handleLogin}>
                      Login
                    </ButtonContained>
                  </div>
                </Col>
                <Col md={6} sm={12} xs={12}>
                  <Form.Text id="forgotPassword" muted>
                    <Link
                    to='/'
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
