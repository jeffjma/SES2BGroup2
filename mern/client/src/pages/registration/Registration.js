import React from "react";
import { Button, TextField } from "@material-ui/core"

import "./Registration.css";

const Registration = () => {

  return (
    <React.Fragment>
      <div className="reg-parent">
        <h1>Register on the Testing System</h1>
        <h3>Access your account or get started with us</h3>
        <Button variant="contained" color="primary" href="login">
          I have an account
        </Button>
        <form  noValidate autoComplete="off">
          <div>
            <TextField 
               id="clientName"
               label="Full name"
             />
          </div>

          <div>
            <TextField 
               id="clientEmail"
               label="Email"
             />
          </div>

          <div>
            <TextField 
               id="clientName"
               type="password"
               label="Password"
             />
          </div>

          <Button variant="contained" color="primary" href="homepage">
            Create Account
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Registration;
