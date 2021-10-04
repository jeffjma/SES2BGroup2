import React, { Component } from "react";
import NaviBar from "../../components/NavigationBar";
import ButtonOutlined from "../../components/ButtonOutlined"
import { Link } from "react-router-dom";
import logo_preAssessment from "../../assets/logo_preAssessment.png";
import "./PreAssessment.css";

export default class PreAssessment extends Component {
    constructor(props){
        super(props)
        this.state = {
            UserName: 'John Smith',
            Title: 'Javascript Test',
            MPO: '100',
            Available: 'Aug 22 at 00:00 - Sep 7 at 11:59',
            TimeLimit: '60 Minutes',
            Attempts: '3',
            Description: 'For this assessment, you will be tested on your knowledge of Javascript.',
        }
    }

    render() {
        return (
            <React.Fragment>
                <NaviBar username={this.state.UserName}></NaviBar>

                <div className="body-main">
                    <div className="title">
                        <p>Assessment Information</p>
                    </div>

                    <div className="body-container">
                        <div className="titleItem">
                            <p><b>Title:</b> {this.state.Title}</p>
                        </div>
                        <div className="maxPointsItem">
                            <p><b>Max Points Obtainable:</b> {this.state.MPO}</p>
                        </div>
                        <div className="availableItem">
                            <p><b>Available:</b> {this.state.Available}</p>
                        </div>
                        <div className="timeItem">
                            <p><b>Time Limit:</b> {this.state.TimeLimit}</p>
                        </div>
                        <div className="attemptsItem">
                            <p><b>Allowed Attempts:</b> {this.state.Attempts}</p>
                        </div>
                        <div className="descriptionItem">
                            <p><b>Description:</b> {this.state.Description}</p>
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
};