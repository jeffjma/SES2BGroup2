import React from "react";

import "./Login.css";

const Login = () => {

  return (
    <React.Fragment>
      <div className="login-parent">
        <h1 classname="Title">
          Login to Testing System
        </h1>

        <form className="Form" noValidate autoComplete="off">
          <div className="Section">
            <TextField 
               id="clientEmail"
               label="Email"
             />
          </div>

          <div className="Section">
            <TextField 
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