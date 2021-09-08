import React from "react";
import { Box, Button, TextField } from "@material-ui/core"


import "./Registration.css";

const Registration = () => {

  return (
    <React.Fragment>
      <div className="reg-parent">

        {/*Title of Page*/}
        <h1 className="Title">
          Register on the Testing System
        </h1>

        {/*Sub header*/}
        <h4 className="SecondTitle">
          Access your account or get started with us
        </h4>

        {/*Buttons*/}
        <Box className="Buttons" display="flex" justifyContent="space-between">
          {/*Login Button, links to Login Page*/}
          <Button
            variant="contained"
            color="primary"
            href="login">
            I have an account
          </Button>

          {/*Registration Button, links to Register Page???*/}
          <Button
            variant="contained"
            color="primary"
            href="registration">
            I want to register
          </Button>
        </Box>

        {/*Registration Form*/}
        <form className="Form" noValidate autoComplete="off">

          {/*Full Name*/}
          <div className="Section">
            <TextField
              id="clientName"
              label="Full name"
              variant="outlined"
              size="small"
            />
          </div>

          {/*Email*/}
          <div className="Section">
            <TextField
              id="clientEmail"
              label="Email"
              variant="outlined"
              size="small"
            />
          </div>


          {/*Password (Hidden to User)*/}
          <div className="Section">
            <TextField
              id="clientName"
              type="password"
              label="Password"
              variant="outlined"
              size="small"
            />
          </div>


          {/*Register Button, links to Homepage for now*/}
          <div className="SubmitButton">
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