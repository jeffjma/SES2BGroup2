import React, { useEffect, useState } from 'react';
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
    ExaminerHome2,
    Post,
    QuestionPool,
    QuestionEditor
} from "./pages/Routes";
import { CookiesProvider } from 'react-cookie';

function App() {
  
    return (
      <div className="App">
          <Helmet>
            <title>Adaptive Testing System</title>
          </Helmet>
          {/* protected route not working for page after login as the cookies aren't set yet so still need 
              to figure that out */}
          <Router>
              <Route exact path="/" component={Registration} />
            <CookiesProvider>
              <Route path="/Login" component={Login} /> 
              <Route exact path="/Home" component={Homepage}/>
              <Route path="/Home/Subjects" exact strict component={Homepage2} />
              <Route path="/Profile" component={Profile} />
              <Route path="/Assessment" component={Assessment} />
              <Route path="/Background" component={Background}/>
              <Route path="/PreAssessment" component={PreAssessment} />
              <Route path="/Post" component={Post} />
              <Route exact path="/ExaminerHome" component={ExaminerHome}/>
              <Route path="/ExaminerHome/Subjects" exact strict component={ExaminerHome2} />
              <Route path="/QuestionPool" component={QuestionPool} />
              <Route path="/QuestionEditor" component={QuestionEditor} />
            </CookiesProvider>
          </Router>
      </div>
    );  
}

export default App;
