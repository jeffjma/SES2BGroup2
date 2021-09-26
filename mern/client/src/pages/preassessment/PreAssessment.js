import React from "react";
import NaviBar from "../../components/NavigationBar";
import ButtonOutlined from "../../components/ButtonOutlined"
import { Link } from "react-router-dom";
import "./PreAssessment.css";

const PreAssessment = () => {
    return (
        <React.Fragment>
            <NaviBar></NaviBar>

            <div className="title">
                <h4>Assessment Information</h4>
            </div>

            <div className="body-container">
                <div className="titleItem">
                    <p>Title:</p>
                </div>
                <div className="maxPointsItem">
                    <p>Max Points Obtainable:</p>
                </div>
                <div className="availableItem">
                    <p>Available:</p>
                </div>
                <div className="timeItem">
                    <p>Time Limit:</p>
                </div>
                <div className="attemptsItem">
                    <p>Allowed Attempts:</p>
                </div>
                <div className="descriptionItem">
                    <p>Description:</p>
                </div>
                <div className="beginButton">
                    <Link to=''>
                    <ButtonOutlined
                        variant="contained"
                        color="primary"
                        href="">
                        BEGIN ASSESSMENT
                    </ButtonOutlined>
                    </Link>
                </div>
            </div>

            <div className="image">
            </div>
        </React.Fragment>
    );
};

export default PreAssessment;