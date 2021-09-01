import React from 'react';
//Helmet is used to set the title tag of the web page
import { Helmet } from "react-helmet";
//Routing between different pages
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Registration from "./pages/registration/Registration"
import Login from "./pages/login/Login"
import Homepage from "./pages/homepage/Homepage"

function App() {
  return (
    <div className="App">
        <Helmet>
          <title>Adaptive Testing System</title>
        </Helmet>

        <Router>
          <Route exact path="/" component={Registration} />
          <Route path="/Login" component={Login} />
          <Route path="/Home" component={Homepage} />
        </Router>

    </div>
  );
}

export default App;
