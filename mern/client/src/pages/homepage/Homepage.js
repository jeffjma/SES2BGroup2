import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import "./Homepage.css";
import {Link} from "react-router-dom";
import logo from './subjectlogo.png';

class Homepage extends Component{

  constructor(props){
    super(props)
    this.state = {
      //this state values are now only for test before fetching data from api
      UserName: 'TestUserName',                       // Name of User
      SubjectName: 'TestSubjectName',                 // Name of Subjects
      AvailableSubjects: '',                               // Numbers of Subjects shown in table
      AllSubjects:[                              // All Subjects (which is for test only before 
        {id: "1", name:"31242 - Advanced Internet Programming - Spring 2021", status: "1"},    // Fetching data from database)
        
      ],
      SelectedSubjects:[],                            // All selected subjects
    }
  }

  componentDidMount(){
    var Sub= this.state.AllSubjects;             // Temporary array for AllAssOfSubjects value
    this.setState({SelectedSubjects: []});            // Set SelectedSubjects to null before running
    
    //The process of handling filters
    if(this.state.CompletedCheckBox){
      if(!this.state.NotAttemptedCheckBox){           // 1: Completed = true and Not Attempted = false
        this.setState({SelectedSubjects: []});
        var TempFirstTrue=Sub.filter((element)=>{return element.status === "1"});
        this.setState({SelectedSubjects: TempFirstTrue, AvailableAss:TempFirstTrue.length});
      }
      if(this.state.NotAttemptedCheckBox){            // 1: Completed = true and Not Attempted = true
        this.setState({ SelectedSubjects: [], AvailableAss:"0" })
      }
    }
    if(!this.state.CompletedCheckBox){
      if(this.state.NotAttemptedCheckBox){            // 1: Completed = false and Not Attempted = true
        var TempFirstFalse=Sub.filter((element)=>{return element.status === "0"});
        this.setState({SelectedSubjects: TempFirstFalse, AvailableAss:TempFirstFalse.length});
      }
      if(!this.state.NotAttemptedCheckBox){           // 1: Completed = false and Not Attempted = false
        this.setState({SelectedSubjects: []});
        this.setState({ SelectedSubjects: Sub, AvailableAss:Sub.length })
      }
    }
    Sub = [];                                         // Set Sub to null before next running
  }

  

  
  render(){
    let SubScript = (                                // The left table script showing the subjects details
      <Link to = "./home/subjects">  
      <div> 
        {this.state.SelectedSubjects.map(SelectedSubject=>(
               <tr key={SelectedSubject.id}>
                 <td className="SubListTd"> 
                 <img src={logo} width="180" height="140" className="center" />
                   <div className="SubListName">
                      
                     {SelectedSubject.name}
                      
                   </div>
                 </td>
               </tr>
             ))}
      </div>
      </Link>
    );

    return(
      <React.Fragment>
        {/* this is main content */}
        <body className="MainBody">
          {/* this is title */}
          <div className="TitleBackground">
            <span className="Title">
              Testing System  
              <span className="RightUserButton">
                <i className="fa fa-user-o fa-lg" aria-hidden="true"></i>
                &nbsp;&nbsp;&nbsp;{this.state.UserName}
              </span>
            </span> 
          </div>
        
        {/* this is secondary title */}
        <div className="SecondTitleBackground">
          <span className="SecondTitle">
            Dashboard
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fa fa-angle-right" aria-hidden="true"></i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
          </span>
          <button className="JoinClassButton">JOIN CLASS</button>
        </div>

         {/* this is leftcontent */}
         <div className="Content">
           <p className="AssessmentTitle">
             Your subjects
           </p>
           <div className="LeftCube">
             {SubScript}
           </div>
         </div>

         
        </body>
      </React.Fragment>
    )
  }
};

export default Homepage;
