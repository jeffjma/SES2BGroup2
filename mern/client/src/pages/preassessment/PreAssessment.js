import React, { Component } from "react";
import axios from "axios";
import NaviBar from "../../components/NavigationBar";
import ButtonOutlined from "../../components/ButtonOutlined"
import { Link } from "react-router-dom";
import logo_preAssessment from "../../assets/logo_preAssessment.png";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import "./PreAssessment.css";

class PreAssessment extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    
    constructor(props){
        super(props)
        const { cookies } = props;
        this.state = {
            UserName: '',
            userID: cookies.get('userid'),
            Title: '',
            MPO: '100',
            Available: '',
            TimeLimit: '60 Minutes',
            Attempts: '3',
            Description: '',
            SubjectName: '',
            testID: ''
        }
    }

    componentDidMount(){
        axios
        .post("http://localhost:5000/api/users/profile", {
          userID: this.state.userID
        })
        .then(res => {
            console.log(res.data)
            this.setState({ 
                UserName: res.data.name,
            })
        })

        if(this.props.location?.state != null) {
            console.log(this.props.location?.state)
            this.setState({
              SubjectName: this.props.location?.state?.subjectName,
              testID: this.props.location?.state?.testID,
              Title: this.props.location?.state?.testname,
              Description: this.props.location?.state?.description,
              Available: (this.props.location?.state?.availability.start_date).concat(' - ').concat(this.props.location?.state?.availability.end_date)
            })
        }
    }

    handleStartAssessment() {
        console.log('IS IT ALIVE' + this.state.testID);
        this.props.history.push({
            pathname: '/Assessment',
            state: {
              testId: this.state.testID,
              subName: this.state.SubjectName,
              testName: this.state.Title
            }
          })
    }

    render() {
        return (
            <React.Fragment>
                <NaviBar 
                    username={this.state.UserName}
                    hasSubHeader = "true"
                    subjectName = {this.state.SubjectName}
                    buttonName = "Join Class"
                    profileClick = "/Profile"
                    dashboardClick = "/Home"
                    logoClick = "/Home"
                ></NaviBar>

                <div className="body-main">
                    <div className="title">
                        <p>Assessment Information</p>
                    </div>

                    <div className="body-container">
                        <div className="titleItem">
                            <p><b>Title:</b> {this.state.Title}</p>
                        </div>
                        <div className="maxPointsItem">
                            <p><b>Available:</b> {this.state.Available}</p>
                        </div>
                        <div className="timeItem">
                            <p><b>Description:</b> {this.state.Description}</p>
                        </div>
                        <div className="beginButton">
                            <ButtonOutlined
                                variant="contained"
                                color="primary"
                                href=""
                                onClick={this.handleStartAssessment.bind(this)}>
                                BEGIN ASSESSMENT
                            </ButtonOutlined>
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

export default compose(withRouter, withCookies)(PreAssessment);