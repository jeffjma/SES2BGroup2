import React from "react";

import "./Login.css";
import "../../App.scss";
import { Button} from 'react-bootstrap';

const Login = () => {

  return (
    <React.Fragment>
      <div className="login-parent">
        <h1 classname="Title">
          Login to Testing System
        </h1>

        <form className="Form" noValidate autoComplete="off">
          <div className="Section">
            <input
               type = "text"  
               id="clientEmail"
               label="Email"
             />
          </div>

          <div className="Section">
            <input 
               id="clientPassword"
               type="password"
               label="Password"
             />
          </div>
           
          <div className="LoginButton">
            <Button
              variant="contained" 
              color="primary" 
              href="homepage">
                Login
            </Button>
          </div>
        </form>

      </div>
    </React.Fragment>
  );

};

export default Login;