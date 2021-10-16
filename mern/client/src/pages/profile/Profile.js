//this page is Tester Profile Page 8.0 in figma
import React, {Component} from 'react';
//import font-awesome icons
import 'font-awesome/css/font-awesome.min.css';
//import the percentage circle
import { CircularProgressbarWithChildren,buildStyles  } from 'react-circular-progressbar';
//import NavigationBar from components
import NaviBar from "../../components/NavigationBar";
//import images
import farmerimage from "../../assets/Farmer.png";
import thiefimage from "../../assets/Thief.png";
import knightimage from "../../assets/Knight.png";
import princeimage from "../../assets/Prince.png";
import kingimage from "../../assets/King.png";
import MathBadge from "../../assets/MathBadge.png";
import WebProgBadge from "../../assets/WebProgBadge.png";

import "./Profile.css";

class Profile extends Component{

    constructor(props){
        super(props)
        this.state = {
            UserName: 'John Smith',                                           //user name
            CubeUserName: "",                                                 //name in left title e.g. john smith => JS
            CurrentEducation: "TestUniversity",                               //education 
            EducationLastYear: "TestYear",                                    //years of education
            ProgramName: "TestProgram",                                       //array about all test history
            TestsHistoryArray:[                             
                {id: "1", name:"Javascript Test", data:"1-9-2021", result: "100"},          
                {id: "2", name:"Javascript Test", data:"9-8-2021", result: "94"},
                {id: "3", name:"Math test", data:"21-3-2021", result: "74"},
                {id: "4", name:"Physics test", data:"17-12-2020", result: "55"},
              ],
            Percentage: "",                                                    //the percantage that user have gained
            ImageChoice: "",                                                   //the rank image src
            CurrentRank: "",                                                   //the current rank name
            TotalPoints: "",                                                   //total points from tests
            PointsToNextRank: "",                                              //required points to next level
            NextRank: "",                                                       //the next rank name
            
        }
    }

    

    componentDidMount(){
        //get the total points from the test
        var tempoints = 0;
        for(var i=0;i< this.state.TestsHistoryArray.length;i++){
            tempoints += parseInt(this.state.TestsHistoryArray[i].result);
        }
        this.setState({TotalPoints: tempoints});
           
        //due to the total points, set the current rank name, percentages, the next rank ,which rank image src to use 
        var ranklevel = parseInt(tempoints/100);
        if(ranklevel <= 0){this.setState({CurrentRank: "Farmer", Percentage:"20", NextRank:"Thief", ImageChoice: "0"})}
        if(ranklevel == 1){this.setState({CurrentRank: "Thief",  Percentage:"40",NextRank:"Knight", ImageChoice: "1"})}
        if(ranklevel == 2){this.setState({CurrentRank: "Knight",  Percentage:"60",NextRank:"Prince", ImageChoice: "2"})}
        if(ranklevel == 3){this.setState({CurrentRank: "Prince",  Percentage:"80",NextRank:"King", ImageChoice: "3"})}
        if(ranklevel >= 4){this.setState({CurrentRank: "King",  Percentage:"100",NextRank:"No More", ImageChoice: "4"})}
        
        //due to the total points, set the points to next ranks
        if(tempoints>=400){this.setState({PointsToNextRank:"0"})}
        else{
            tempoints = 100-(tempoints%100)
            this.setState({PointsToNextRank:tempoints})
        }
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
    
    //show the current rank image
    ShowImage(){
        var ic = this.state.ImageChoice;
        if(ic == 0){return(<img id="RankImage" src={farmerimage}></img>)}
        if(ic == 1){return(<img id="RankImage" src={thiefimage}></img>)}
        if(ic == 2){return(<img id="RankImage" src={knightimage}></img>)}
        if(ic == 3){return(<img id="RankImage"src={princeimage}></img>)}
        if(ic == 4){return(<img id="RankImage"src={kingimage}></img>)}
    }

    showBadge(){
        const Badges = [
            { id: 1, src:"math"},
            { id: 2, src: "web"}
        ]
        return Badges;

    }

    showMedal(Badge){
        if(Badge.src == "math") {return(<img id="badge2" src = {MathBadge}></img>)}
        if(Badge.src == "web") {return(<img id = "badge" src = {WebProgBadge}></img>)}

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
                        <NaviBar 
                          username={this.state.UserName}
                          profileClick = "/Profile"
                          logoClick = "/Home"
                        ></NaviBar>
                    </div>

                    {/* the left profile content */}
                    <div className="LeftProfile">
                        {NameImage}
                        <p id="UserName">{this.state.UserName}</p>
                        <div id="SeparateLine"></div>
                        <p id="AboutMe">
                            About Me 
                            {/* this may cause page width problem that over the screen */}
                            <i class="fa fa-pencil" style={{marginLeft:"120px"}} aria-hidden="true"></i>   
                        </p>
                        <p id="ProfileTitle">Current Education</p>
                        <p id="ProfileContent">{this.state.CurrentEducation}</p>
                        <p id="ProfileTitle">Latest Year Completed</p>
                        <p id="ProfileContent">{this.state.EducationLastYear}</p>
                        <p id="ProfileTitle">Program</p>
                        <p id="ProfileContent">{this.state.ProgramName}</p>
                    </div>
                    
                    {/* the right rank image */}
                    <div className="RightRankImage">
                        <p id="CurrentRank">Your Current Rank is {this.state.CurrentRank}</p>
                        <div id="CircleLayout">
                            <CircularProgressbarWithChildren 
                                value={this.state.Percentage} 
                                styles={buildStyles({
                                    pathColor: '#5BC2A7',
                                    trailColor: '#D1EBDE',
                                })}
                            >{this.ShowImage()}</CircularProgressbarWithChildren>
                        </div>
                        <p id="RankDescription" style={{marginBottom: "-15px"}}>Your Have earned <b>{this.state.TotalPoints}</b> so far</p>
                        <p id="RankDescription">Earn <b>{this.state.PointsToNextRank}</b> points to get to <b>{this.state.NextRank}</b></p>
                    </div>

                    {/* the right badges  */}
                    <div className="RightBadges">
                        <table className = "TableStyle">
                            <tbody>
                                <tr>
                                    <th> My Badges</th>
                                </tr>
                                {this.showBadge().map(Badge => (
                                  <th key = {Badge.id}> 
                                  {this.showMedal(Badge)} 
                                  </th > 
                                  
                                )) }
                            </tbody>
                        </table>
                    </div>

                    {/* the right history table */}
                    <div className="RightHistory">
                        <table className = "TableStyle2">
                            <thead>
                                <tr>
                                    <th style = {{width:200}}>My Assessment History</th>
                                </tr>
                                <tr>
                                    <th style = {{width:130}}>Assessment No.</th>
                                    <th style = {{width:200}}>Name</th>
                                    <th>Date</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody className="RowShadow">
                                { this.state.TestsHistoryArray.map(hist =>(
                                    <tr key = {hist.id}>
                                        <td>{hist.id}</td>
                                        <td><h5>{hist.name}</h5></td>
                                        <td className = "date">{hist.data}</td>
                                        <td className = "result">{hist.result} /100</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </body> 
            </React.Fragment>
        )
    }
}

export default Profile;