//this page is Tester Profile Page 8.0 in figma
import React, {Component} from 'react';
//import font-awesome icons
import 'font-awesome/css/font-awesome.min.css';
//import NavigationBar from components
import NaviBar from "../../components/NavigationBar";
import "./Profile.css";

class Profile extends Component{

    constructor(props){
        super(props)
        this.state = {
            UserName: 'John Smith',
            CubeUserName: "",
            CurrentEducation: "TestUniversity",
            EducationLastYear: "TestYear",
            ProgramName: "TestProgram",
        }
    }

    componentDidMount(){
    }
    
    //separate the username
    SeparateUserName(){
        var tempname = this.state.UserName;
        var arr = tempname.split(" ");
        var firstname = arr[0].substr(0,1);
        var lastname = arr[arr.length-1].substr(0,1);
        return(
        <p>{firstname}{lastname}</p>)
    }

    render(){
        let NameImage = ( 
            <div id="NameCube">{this.SeparateUserName()}</div>
        );
        return(
            <React.Fragment>
                <body className="MainBody">
                    {/* the title */}
                    <div className="TitleBackground">
                        <NaviBar username={this.state.UserName}></NaviBar>
                    </div>

                    {/* the left profile content */}
                    <div className="LeftProfile">
                        {NameImage}
                        <p id="UserName">{this.state.UserName}</p>
                        <div id="SeparateLine"></div>
                        <p id="AboutMe">
                            About Me
                            <i class="fa fa-pencil" style={{marginLeft:"140px"}} aria-hidden="true"></i>
                        </p>
                        <p id="ProfileTitle">Current Education</p>
                        <p id="ProfileContent">{this.state.CurrentEducation}</p>
                        <p id="ProfileTitle">Latest Year Completed</p>
                        <p id="ProfileContent">{this.state.EducationLastYear}</p>
                        <p id="ProfileTitle">Program</p>
                        <p id="ProfileContent">{this.state.ProgramName}</p>
                    </div>
                    
                    {/* the right rank image */}
                    <div className="RightRankImage">Your Rank</div>

                    {/* the right badges  */}
                    <div className="RightBadges">Your Badges</div>

                    {/* the right history table */}
                    <div className="RightHistory">Your assessment history</div>
                </body> 
            </React.Fragment>
        )
    }
}

export default Profile;