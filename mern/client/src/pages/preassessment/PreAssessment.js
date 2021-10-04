import React from "react";
import NaviBar from "../../components/NavigationBar";
import ButtonOutlined from "../../components/ButtonOutlined"
import { Link } from "react-router-dom";
import logo_preAssessment from "../../assets/logo_preAssessment.png";
import "./PreAssessment.css";

const PreAssessment = () => {
    return (
        <React.Fragment>
            <NaviBar></NaviBar>

            <div className="body-main">
                <div className="title">
                    <p>Assessment Information</p>
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
                    <img src={logo_preAssessment} alt="logo"></img>
                </div>
            </div>

        </React.Fragment>
    );
};

export default PreAssessment;