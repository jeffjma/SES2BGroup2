import React, {Component} from 'react';
import axios from "axios";
import 'font-awesome/css/font-awesome.min.css';
import "./Homepage.css";
import NaviBar from "../../components/NavigationBar";
import CardSubject from "../../components/CardSubject";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Col, Row, Container } from "react-bootstrap";

const api = axios.create({
  baseURL: `http://localhost:5000/api/users/profile`
})

class Homepage extends Component{
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){
    super(props)
    const { cookies } = props;
    this.state = {
      //this state values are now only for test before fetching data from api
      userID: cookies.get('userid'),
      UserName: '',                       // Name of User
      SubjectName: 'TestSubjectName',                 // Name of Subjects
      AvailableSubjects: '',                               // Numbers of Subjects shown in table
      AllSubjects:[],
      SelectedSubjects:[],                            // All selected subjects
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

    axios
    .post("http://localhost:5000/api/users/subjects", {
      userID: this.state.userID
    })
    .then(res => {
      console.log(res.data.subjectID.length);
      for (var i = 0; i < res.data.subjectID.length; i++) {
        let { AllSubjects } = this.state;
        AllSubjects.push({id: i, name: res.data.name[i], status: res.data.subjectID[i]})
        this.setState({ AllSubjects: AllSubjects});
      }
    })

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
        <Row>
          <tr>
        {this.state.SelectedSubjects.map(SelectedSubject=>(
               <td key={SelectedSubject.id}>   
               <Col md>             
                 <CardSubject path={SelectedSubject.status} subname={SelectedSubject.name} assetImage={SelectedSubject.logo}>
                   {SelectedSubject.name}
                  </CardSubject>  
                  </Col>         
               </td>
             ))}
            </tr>
        </Row>
   
    );

    return(
      <React.Fragment>
        {/* this is main content */}
        <body className="Home-MainBody">
          {/* this is title */}
          <div className="TitleBackground">
            <NaviBar
                username={this.state.UserName}
                hasSubHeader = "true"
                subjectName = ""
                buttonName = "Join Class"
                profileClick = "/Profile"
                dashboardClick = "/Home"
                logoClick = "/Home"
              ></NaviBar>
          </div>
      

         {/* this is leftcontent */}
         <div className="HomeContent">
          <Container>
            <p className="home-title">
             Your subjects
            </p>
            <div className="Subject-Cards">
                {SubScript}
            </div> 
           </Container>         
         </div>      
        </body>
      </React.Fragment>
    )
  }
};

export default withCookies(Homepage);
