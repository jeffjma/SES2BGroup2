import React from "react";
import {
  ButtonGroup,
  Form,
  Image,
  Container,
  Col,
  Row
} from "react-bootstrap";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import logo from "../../assets/logo_register.png";
import "./Registration.css";


const Registration = () => {

  return (
    <React.Fragment>
      <div className="reg-parent">

        <Container>
          <Row>
            <Col md={7} sm={12} xs={12}>

              {/*Title of Page*/}
              <h3 className="Title">
                Register on the Testing System
              </h3>

              {/*Sub header*/}
              <h5 className="SecondTitle">
                Access your account or get started with us
              </h5>

              {/*Buttons*/}
              <ButtonGroup className="LoginPageButton">

                {/*Login Button, links to Login Page*/}
                <ButtonOutlined
                  variant="contained"
                  color="primary"
                  href="login">
                  I have an account
                </ButtonOutlined>
              </ButtonGroup>

              <ButtonGroup className="RegisterPageButton">
                {/*Registration Button, links to Register Page???*/}
                <ButtonContained
                  variant="contained"
                  color="primary"
                  href="registration">
                  I want to register
                </ButtonContained>

              </ButtonGroup>

              {/*Registration Form*/}
              <Form noValidate autoComplete="off">

                {/*Full Name*/}
                <Form.Group className="Section1" controlID="Name">
                  <Form.Control
                    type="text"
                    size="lg"
                    placeholder="Full name: e.g. John Smith"
                  />
                </Form.Group>

                {/*Email*/}
                <Form.Group className="Section2" controlID="Email">
                  <Form.Control
                    type="text"
                    size="lg"
                    placeholder="Email address"
                  />
                </Form.Group>

                {/*Password (Hidden to User)*/}
                <Form.Group className="Section3">
                  <Form.Control
                    type="password"
                    size="lg"
                    placeholder="Password"
                  />
                </Form.Group>


                {/*Register Button, links to Homepage for now*/}
              <ButtonGroup className="SubmitButton">
                  <ButtonContained
                    variant="contained"
                    color="primary"
                    href="homepage">
                    Create Account
                  </ButtonContained>

              </ButtonGroup>

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

export default Registration;
