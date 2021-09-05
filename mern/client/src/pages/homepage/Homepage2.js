//this page is Homepage 4.5 in figma
import React, {Component} from 'react';
//import font-awesome icons
import 'font-awesome/css/font-awesome.min.css';
import "./Homepage2.css";

class Homepage2 extends Component{

  constructor(props){
    super(props)
    this.state = {
      //this state values are now only for test before fetching data from api
      UserName: 'TestUserName',
      SubjectName: 'TestSubjectName',
      AvailableAss: '4',
      CompletedCheckBox: false,
      NotAttemptedCheckBox: false,
      AllSubjects:[
        {id: "1", name:"Ass1", status: "1"},
        {id: "2", name:"Ass2", status: "0"},
        {id: "3", name:"Ass3", status: "0"},
        {id: "4", name:"Ass4", status: "0"},
      ],
      SelectedSubjects:[],
    }
    this.setState({
      SelectedSubjects: this.state.AllSubjects
    })
  }

  componentDidMount(){
    var Sub= this.state.AllSubjects;
    this.setState({SelectedSubjects:[]});
    console.log(this.state.SelectedSubjects);
    
    if(this.state.CompletedCheckBox){
      if(!this.state.NotAttemptedCheckBox){
        for(var i=0; i<Sub.length;i++){
          if(Sub[i].status === "1"){
            let { SelectedSubjects } = this.state;
            SelectedSubjects.push(Sub[i])
            this.setState({SelectedSubjects: SelectedSubjects})
          }
        }
      }
    }
    if(!this.state.CompletedCheckBox){
      if(this.state.NotAttemptedCheckBox){
        for(var j=0; j<Sub.length;j++){
          if(Sub[j].status === "0"){
            let { SelectedSubjects } = this.state;
            SelectedSubjects.push(Sub[j])
            this.setState({SelectedSubjects: SelectedSubjects})
          }
        }
      }
      if(!this.state.NotAttemptedCheckBox){
        this.setState({ SelectedSubjects: Sub })
      }
    }
    Sub = [];
  }

  handleCompleted(){
    var Bool = this.state.CompletedCheckBox;
    {Bool ? (this.setState({CompletedCheckBox : false})) : (this.setState({CompletedCheckBox : true}))};
    this.componentDidMount();
    console.log(this.state.CompletedCheckBox)
  }

  handleNotCompleted(){
    if(this.state.NotAttemptedCheckBox === true){
      this.setState({NotAttemptedCheckBox: false});
    }
    else{
      this.setState({NotAttemptedCheckBox: true})
    }
    this.componentWillMount();
  }

  render(){
    let AssScript = (
      <div>
        {this.state.SelectedSubjects.map(SelectedSubject=>(
               <tr key={SelectedSubject.id}>
                 <td className="ListTd"><p className="ListTdP1">{SelectedSubject.name}</p>
                 <p className="ListTdP2">{SelectedSubject.status}</p>
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
            <span className="Title">
              Testing System  
              <span className="UserButton">
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
            <span>{this.state.SubjectName}</span>
          </span>
          <button className="JoinClassButton">JOIN CLASS</button>
        </div>

         {/* this is leftcontent title */}
         <div className="LeftContent">
           <p className="AssessmentTitle">
             You have {this.state.AvailableAss} assessments available
           </p>
           <div className="LeftCube">
             {AssScript}
           </div>
         </div>

         {/* this is rightcontent title */}
         <div className="RightContent">
           <div className="RightCube">       
             <p className="FilterTitle"><br/>Filters</p>
             <p className="FilterSubtitle">STATUS</p>
             <input type="checkbox" className="FilterCheckbox"  onClick={()=>this.handleCompleted()}></input><p className="FilterCheckboxName">Completed</p>
             <br/>
             <input type="checkbox" className="FilterCheckbox" onClick={()=>this.handleNotCompleted()}></input><p className="FilterCheckboxName">Not attempted</p>
           </div>
         </div>
        </body>
      </React.Fragment>
    )
  }
};

export default Homepage2;
