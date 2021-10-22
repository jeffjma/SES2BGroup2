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
    QuestionPool
} from "./pages/Routes";
import { CookiesProvider, useCookies } from 'react-cookie';
import ProtectedRoute from './ProtectedRoute';

function GetStuType() {
  const [cookies, setCookie] = useCookies();
  const usertype = cookies.usertype;
    if(usertype === "student"){
      return true;
    }
  return false;
}

function GetExaType() {
  const [cookies, setCookie] = useCookies();
  const usertype = cookies.usertype;
    if(usertype === "examiner"){
      return true;
    }
  return false;
}

function App() {
  
  const stutype = GetStuType();
  const exatype = GetExaType();
  
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
              <ProtectedRoute path="/Home/Subjects" exact strict component={Homepage2} isAuth={stutype}/>
              <ProtectedRoute path="/Profile" component={Profile} isAuth={stutype}/>
              <ProtectedRoute path="/Assessment" component={Assessment} isAuth={stutype}/>
              <Route path="/Background" component={Background}/>
              <ProtectedRoute path="/PreAssessment" component={PreAssessment} isAuth={stutype}/>
              <ProtectedRoute path="/Post" component={Post} isAuth={stutype}/>
              <Route exact path="/ExaminerHome" component={ExaminerHome}/>
              <ProtectedRoute path="/ExaminerHome/Subjects" exact strict component={ExaminerHome2} isAuth={exatype}/>
              <ProtectedRoute path="/QuestionPool" component={QuestionPool} isAuth={exatype}/>
            </CookiesProvider>
          </Router>

      </div>
    );  
}

export default App;
