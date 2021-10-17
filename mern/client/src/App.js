import React, { Component } from 'react';
//Helmet is used to set the title tag of the web page
import { Helmet } from "react-helmet";
//Routing between different pages
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
//Import pages files
import {
    Registration,
    Login,
    Homepage,
    Homepage2,
    Profile,
    Assessment,
    Background,
    PreAssessment,
    ExaminerHome,
    ExaminerHome2
} from "./pages/Routes";
import { CookiesProvider } from 'react-cookie';


class App extends Component {
  
  render() {
    return (
      <div className="App">
          <Helmet>
            <title>Adaptive Testing System</title>
          </Helmet>

          <Router>
              <Route exact path="/" component={Registration} />
            <CookiesProvider>
              <Route path="/Login" component={Login} /> 
              <Route exact path="/Home" component={Homepage} />
              <Route path="/Home/Subjects" exact strict component={Homepage2} />
              <Route path="/Profile" component={Profile} />
              <Route path="/Assessment" component={Assessment} />
              <Route path="/Background" component={Background} />
              <Route path="/PreAssessment" component={PreAssessment} />
            </CookiesProvider>
            <Route exact path="/ExaminerHome" component={ExaminerHome} />
            <Route path="/ExaminerHome/Subjects" exact strict component={ExaminerHome2} />
          </Router>

      </div>
    );  
  }
}

export default App;
