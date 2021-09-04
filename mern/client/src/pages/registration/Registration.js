import React from "react";
import { Button, TextField } from "@material-ui/core"

import "./Registration.css";

const Registration = () => {

  return (
    <React.Fragment>
      <div className="reg-parent">
        <h1 className="Title">
          Register on the Testing System
        </h1>

        <h3 className="SecondTitle">
          Access your account or get started with us
        </h3>

        <div className="LoginButton" >
          <Button
                  variant="contained" 
                  color="primary" 
                  href="login">
                    I have an account
          </Button>
        </div>
        
        <form className="Form" noValidate autoComplete="off">
          <div className="Section">

            <TextField 
               id="clientName"
               label="Full name"
             />
          </div>

          <div className="Section">
            <TextField 
               id="clientEmail"
               label="Email"
             />
          </div>

          <div className="Section">
            <TextField 
               id="clientName"
               type="password"
               label="Password"
             />
          </div>
           
          <div className="RegisterButton">
            <Button
              variant="contained" 
              color="primary" 
              href="homepage">
                Create Account
            </Button>
          </div>

        </form>
      </div>
    </React.Fragment>
  );
};

export default Registration;