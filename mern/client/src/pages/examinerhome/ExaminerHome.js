import React, { Component } from "react";
import "./ExaminerHome.css";
import NavBar from "../../components/NavigationBar";
import axios from "axios";
import CardSubjectExaminer from "../../components/CardSubjectExaminer.js";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Col, Row, Container } from "react-bootstrap";


const api = axios.create({
  baseURL: `http://localhost:5000/api/users/profile`
})

class ExaminerHome extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      //this state values are now only for test before fetching data from api
      userID: cookies.get('userid'),
      UserName:"", // Name of User
      subjects: [],
      SelectedSubjects:[], 
    };
  }

  componentDidMount(){
    api.post('/', {
      userID: this.state.userID
    })
    .then(res => {
        console.log(res.data.name)
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
        let { subjects } = this.state;  
        subjects.push({id: i, name: res.data.name[i], status: res.data.subjectID[i]})
        this.setState({ subjects: subjects});
      }
    })

    var Sub= this.state.subjects;             // Temporary array for AllAssOfSubjects value
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

  render() {
    let SubScript = ( // The left table script showing the subjects details
      <Row>
        <tr>
      {this.state.SelectedSubjects.map(SelectedSubject=>(
             <td key={SelectedSubject.id}>   
             <Col md>             
               <CardSubjectExaminer subID={SelectedSubject.status} subname={SelectedSubject.name}>
                 {SelectedSubject.name}
                </CardSubjectExaminer>  
                </Col>         
             </td>
           ))}
          </tr>
      </Row>
    );

    return (
      <div className="examiner-home-container">
        <div className="navbar-container">
          <NavBar
            username={this.state.UserName}
            hasSubHeader="true"
            subjectName=""
            buttonName=""
            dashboardClick="/ExaminerHome"
            profileClick="/ExaminerHome"
            logoClick="/ExaminerHome"
          ></NavBar>
        </div>
        <div className="dashboard-container">
          <h6> Your Subjects </h6>
          <Container fluid className="subjects">
            {SubScript}
          </Container>
        </div>
      </div>
    );
  }
}

export default withCookies(ExaminerHome);
