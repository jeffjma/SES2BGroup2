//this page is Homepage 4.5 in figma
import React, {Component} from 'react';
import axios from "axios";
//import font-awesome icons
import 'font-awesome/css/font-awesome.min.css';
//import NavigationBar from components
import NaviBar from "../../components/NavigationBar";
//import ButtonOutlined from components
import ButtonOutlined from "../../components/ButtonOutlined";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import "./Homepage2.css";

const api = axios.create({
  baseURL: `http://localhost:5000/api/users/profile`
})

class Homepage2 extends Component{
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){
    super(props)
    const { cookies } = props;
    this.state = {
      userID: cookies.get('userid'),
      UserName: '',                                   // Name of User
      SubjectName: 'TestSubjectName',                 // Name of Subjects
      AvailableAss: '',                               // Numbers of Assessments shown in table
      CompletedCheckBox: false,                       // Boolean for check whether checkbox("Completed") is clicked
      NotAttemptedCheckBox: false,                    // Boolean for check whether checkbox("NotAttempted") is clicked
      AllAssOfSubjects:[                              // All assessments of this Subjects (which is for test only before 
        {id: "1", name:"Ass1", status: "1"},          // Fetching data from database)
        {id: "2", name:"Ass2", status: "0"},
        {id: "3", name:"Ass3", status: "0"},
        {id: "4", name:"Ass4", status: "0"},
      ],
      SelectedSubjects:[],                            // All selected assessment according to the filters
    }
  }

  componentDidMount(){

    api.post('/', {
      userID: this.state.userID
   })
    .then(res => {
        console.log(res.data)
        this.setState({ 
            UserName: res.data.name,
        })
    })

    if(this.props.location.state.subjectID != null) {
      console.log(this.props.location.state.subjectID)
    }

    var Sub= this.state.AllAssOfSubjects;             // Temporary array for AllAssOfSubjects value
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

  handleToAss(e){                                     // Push to url of each Assessment
    /*this.props.history.push(window.location.pathname + "/" + e)*/ // Disabled for client meeting
      this.props.history.push('/PreAssessment')
  }

  handleCompleted(){                                  //Once click checkbox("Completed"), change CompletedCheckBox
    var Temp = this.state.CompletedCheckBox;
    if(Temp){
      this.setState({CompletedCheckBox: false})
    }
    if(!Temp){
      this.setState({CompletedCheckBox: true})
    }
  }

  handleNotCompleted(){                               //Once click checkbox("Completed"), change NotAttemptedCheckBox
    var Temp = this.state.NotAttemptedCheckBox;
    if(Temp){
      this.setState({NotAttemptedCheckBox: false});
    }
    if(!Temp){
      this.setState({NotAttemptedCheckBox: true})
    }
  }

  handleCheckBox(){                                   // handle "Confirm" button to run filters
    this.componentDidMount();
  }

  changeStatusCss(e){                                 // Change status css color(green/gray) and type(boolean -> var)
    if(e === "1"){
      return <p className="AssListStatusComp">Completed</p>
    }
    else{
      return <p className="AssListStatusNotAtt">Not Attempted</p>
    }
  }

  render(){
    let AssScript = (                                // The left table script showing the assessments details
      <div>
        {this.state.SelectedSubjects.map(SelectedSubject=>(
               <tr key={SelectedSubject.id}>
              {/*   <td className="AssListTd" onClick={()=>this.handleToAss(SelectedSubject.id)}><p className="AssListName">{SelectedSubject.name}</p>*/}
              {/*/ this is just for the client meeting to show the assessment page */}
                    <td className="AssListTd" onClick={()=>this.handleToAss()}><p className="AssListName">{SelectedSubject.name}</p>
                 {this.changeStatusCss(SelectedSubject.status)}
                 </td>
               </tr>
             ))}
      </div>
    );
    return(
      <React.Fragment>
        {/* this is main content */}
        <body className="MainBody">
          {/* this is title */}
          <div className="TitleBackground">
            <NaviBar
              username={this.state.UserName}
              hasSubHeader = "true"
              subjectName = {this.state.SubjectName}
              profileClick = "/Profile"
              buttonName = "Join Class"
              dashboardClick = "/Home"
              logoClick = "/Home"
            ></NaviBar>
          </div>

         {/* this is leftcontent */}
         <div className="LeftContent">
           <p className="AssessmentTitle">
             You have {this.state.AvailableAss} assessments available
           </p>
           <div className="LeftCube">
             {AssScript}
           </div>
         </div>

         {/* this is rightcontent */}
         <div className="RightContent">
           <div className="RightCube">       
             <p className="FilterTitle"><br/>Filters</p>
             <p className="FilterSubtitle">STATUS</p>
             <input type="checkbox" className="FilterCheckbox"  onClick={()=>this.handleCompleted()}></input><p className="FilterCheckboxName">Completed</p>
             <br/>
             <input type="checkbox" className="FilterCheckbox" onClick={()=>this.handleNotCompleted()}></input><p className="FilterCheckboxName">Not attempted</p>
             <br/><br/>&nbsp;&nbsp;&nbsp;
             <ButtonOutlined
               children = "Confirm"
               onClick={()=>this.handleCheckBox()}
             ></ButtonOutlined>
           </div>
         </div>
        </body>
      </React.Fragment>
    )
  }
};

export default withCookies(Homepage2);