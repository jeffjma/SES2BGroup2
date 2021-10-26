//this page is Homepage 4.5 in figma
import React, {Component} from 'react';
import axios from "axios";
//import font-awesome icons
import 'font-awesome/css/font-awesome.min.css';
//import NavigationBar from components
import NaviBar from "../../components/NavigationBar";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
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
    this.handleToAss = this.handleToAss.bind(this);
    this.state = {
      userID: cookies.get('userid'),
      UserName: '',                                   // Name of User
      SubjectName: '',                                // Name of Subjects
      SubjectID: '',
      AvailableAss: '',                               // Numbers of Assessments shown in table
      CompletedCheckBox: false,                       // Boolean for check whether checkbox("Completed") is clicked
      NotAttemptedCheckBox: false,                    // Boolean for check whether checkbox("NotAttempted") is clicked
      AllSubjects:[],
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

    if(this.props.location?.state?.subjectID != null) {
      console.log(this.props.location?.state?.subjectID)
      console.log(this.props.location?.state?.subjectName)
      this.setState({
        SubjectName: this.props.location?.state?.subjectName.subname,
      })

      axios
      .post("http://localhost:5000/api/tests/getForSubject", {
        subject: this.props.location?.state?.subjectID.path
     })
      .then(res => {
        console.log(res.data);
        var data = res.data;
        var i ;
        for(i=0; i < data.length; i++){
            let { AllSubjects } = this.state;
            AllSubjects.push({id: '1', 
                              name: data[i].title, 
                              status: '0', 
                              subid: data[i].subject,
                              availability: data[i].availability,
                              description: data[i].description
                            })
            this.setState({ AllSubjects: AllSubjects});
        }
      })
    }

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

handleToAss(event, subname, subid, subavail, subdes){                             
  this.props.history.push({
    pathname: '/PreAssessment',
    state: {
      testname: subname,
      testID: subid,
      subjectName: this.state.SubjectName,
      availability: subavail,
      description: subdes
    }
  });
}

  render(){
    let AssScript = (                                // The left table script showing the assessments details
      <div>
        {this.state.SelectedSubjects.map(SelectedSubject=>(
               <tr key={SelectedSubject.id}>
                    <td className="AssListTd" 
                        onClick={(e)=>this.handleToAss(e, 
                          SelectedSubject.name, 
                          SelectedSubject.subid,
                          SelectedSubject.availability,
                          SelectedSubject.description)}
                    ><p className="AssListName">{SelectedSubject.name}</p>
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
             Your Tests
           </p>
           <div className="LeftCube">
             {AssScript}
           </div>
         </div>

        </body>
      </React.Fragment>
    )
  }
};

export default compose(withRouter, withCookies)(Homepage2);