//this page is Tester Profile Page 8.0 in figma
import React, {Component} from 'react';
//import NavigationBar from components
import NaviBar from "../../components/NavigationBar";
import "./Profile.css";

class Profile extends Component{

    constructor(props){
        super(props)
        this.state = {
            UserName: 'TestUserName',
        }
    }

    render(){
        return(
            <React.Fragment>
                <body className="MainBody">
                    {/* the title */}
                    <div className="TitleBackground">
                        <NaviBar username={this.state.UserName}></NaviBar>
                    </div>

                    {/* the left profile content */}
                    <div className="LeftProfile">Your Profile</div>
                    
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