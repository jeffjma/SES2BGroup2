import React from "react";
import axios from "axios";
import "./Login.css";
import "../../App.scss";
import { Image} from 'react-bootstrap';
import ButtonContained from "../../components/ButtonContained";
import ButtonText from "../../components/ButtonText";
import ButtonOutlined from "../../components/ButtonOutlined"
import logo from "./logo.png";

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
      
        <h1 className="Title">
          Login to Testing System
        </h1>

        <h5 className="secondTitle">
           Access your account or get started with us
        </h5>

        <div className="registerButton">
            <ButtonOutlined
              variant="contained" 
              color="primary"
              href="registration">
              I want to Register
            </ButtonOutlined>


          </div>

          <Image src={logo}className="logo"/>

        <form className="Form" noValidate autoComplete="off">
          
          <div className="Section">
            <input
               type = "text"  
               id="clientEmail"
               placeholder = "Email Address"
               class = "textBox"
             />
          </div>

          <div className="Section">
            <input 
               id="clientPassword"
               type="password"
               placeholder = "Password"
               class = "textBox"
             />
          </div>
          
          <div className="forgotPwButton">
            <ButtonText
              variant="contained" 
              color="primary">
              Forgot Password
            </ButtonText>
          </div>

          <div className="LoginButton">
            <ButtonContained
              variant="contained" 
              color="primary" 
              href="homepage"
              onClick={handleLogin}>
                Login
            </ButtonContained>
          </div>
        </form>

      </div>
    </React.Fragment>
  );

};

export default Login;