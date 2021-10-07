import React, { useState } from 'react';
import "./ExaminerHome.css";
import NavBar from "../../components/NavigationBar";

function ExaminerHome() {

    const [userName, setUserName] = useState('Examiner');

    return (
        <div className="examiner-home-container">
            <div className="navbar-container">
                <NavBar 
                    username={userName}
                    hasSubHeader = "true"
                    subjectName = ""
                    buttonName = ""
                    dashboardClick = "/ExaminerHome"
                    profileClick = "/ExaminerHome"
                    logoClick = "/ExaminerHome"
                ></NavBar>
            </div>
            <div className="dashboard-container">
                <h6> Your Subjects </h6>
            </div>
        </div>
    );
}

export default ExaminerHome;