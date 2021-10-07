import React, { useState } from 'react';
import "./ExaminerHome2.css";
import NavBar from "../../components/NavigationBar";

function ExaminerHome2() {

    const [userName, setUserName] = useState('Examiner');
    const [subjectName, setSubjectName] = useState('TestSubjectName');

    return (
        <div className="examiner-home2-container">
            <div className="navbar-container">
                <NavBar 
                    username= {userName}
                    hasSubHeader = "true"
                    subjectName = {subjectName}
                    buttonName = "Add Test"
                    profileClick = "/ExaminerHome"
                    logoClick = "/ExaminerHome"
                    dashboardClick = "/ExaminerHome"
                ></NavBar>
            </div>
            <div className="overview-container">
                <h6> Overview </h6>
            </div>
        </div>
    );
}

export default ExaminerHome2;