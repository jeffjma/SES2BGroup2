import React from 'react';
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
    Profile
} from "./pages/Routes";


function App() {
  return (
    <div className="App">
        <Helmet>
          <title>Adaptive Testing System</title>
        </Helmet>

        <Router>
          <Route exact path="/" component={Registration} />
          <Route path="/Login" component={Login} />
          <Route exact path="/Home" component={Homepage} />
          <Route path="/Home/Subjects" exact strict component={Homepage2} />
          <Route path="/Profile" component={Profile} />
        </Router>

    </div>
  );
}

export default App;
