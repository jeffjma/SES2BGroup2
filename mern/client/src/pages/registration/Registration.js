import React from "react";
import { ButtonGroup, Form, Image } from "react-bootstrap";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import logo from "./logo_register.png";
import "./Registration.css";
import axios from "axios";



const Registration = () => {

  /* This is just placeholder data below, please replace with data from form */
  const userData = {
    name: 'Bob Test', 
    email: 'main@test.com', 
    password: 'test123', 
    password2: 'test123' };

  function handleCreateAccount(e) {
    console.log('Create Button Clicked');

    axios
      .post("http://localhost:5000/api/users/register", userData)
      .then(res => 
        console.log(res.data))
      .catch(err =>
        console.log('there was an error')
      );

  }

  return (
    <React.Fragment>
      <div className="reg-parent">

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

        <Image src={logo}className="DrawingLogin"/>

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
          <div className="SubmitButton">
            <ButtonContained
              variant="contained"
              color="primary"
              href="homepage"
              onClick={handleCreateAccount}>
              Create Account
            </ButtonContained>
          </div>

        </Form>
      </div>
    </React.Fragment>
  );
};

export default Registration;