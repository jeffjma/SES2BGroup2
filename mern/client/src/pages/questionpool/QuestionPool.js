import axios from 'axios';
import React, {Component} from 'react';
import "./QuestionPool.css";
//import NavigationBar from components
import NaviBar from "../../components/NavigationBar";
//import font-awesome icons
import 'font-awesome/css/font-awesome.min.css';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Pagination } from 'react-bootstrap';


class QuestionPool extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    
    constructor(props){
        super(props)
        const { cookies } = props;
        this.state = {
            UserName: "Examiner",
            SubjectName: "",
            DataFromDatabase:[],
            QuestionsArrays:[], //the array used in system
            PagesContents:[],   //the table contents in each page
            PaginationNumbers:[],  //how many pages
            ActivePage:1,   //which page is currently active
        }
    }

    componentDidMount(){

        if(this.props.location?.state != null) {
            console.log(this.props.location?.state?.testID.testID )
            this.setState({
                SubjectName: this.props.location?.state?.subName.subName
              })

        axios.post("http://localhost:5000/api/tests/getQuestions", {test: this.props.location?.state?.testID.testID})
        .then(res => {
            console.log(res.data)
            this.setState({
                DataFromDatabase: res.data
            })
            console.log(this.state.DataFromDatabase)
            this.setState({QuestionsArrays: this.state.DataFromDatabase})
            this.setState({PagesContents: this.state.QuestionsArrays.slice(0,8)});
            this.PagesNumbers();
        })

        }
        
    }

    PagesNumbers(){
        var pn = this.state.QuestionsArrays.length/8;
        var pnarr = []
        for(var num=1; num<pn+1; num++){
            pnarr.push(num);
        }
        this.setState({PaginationNumbers: pnarr})
    }

    handleFirst(){this.setState({PagesContents: this.state.QuestionsArrays.slice(0,8), ActivePage: 1})}
    handleLast(){
         var pn = this.state.QuestionsArrays.length%8;
         this.setState({PagesContents: this.state.QuestionsArrays.slice(-pn), ActivePage: parseInt(this.state.QuestionsArrays.length/8+1)})
    }
    handlePrev(n){
        if(this.state.ActivePage!==1){
            this.setState({ActivePage: n-1})
            this.setState({PagesContents: this.state.QuestionsArrays.slice((n-2)*8,(n-2)*8+8)})
        }   
    }
    handleNext(n){
        if(this.state.ActivePage!==parseInt(this.state.QuestionsArrays.length/8+1)){
            this.setState({ActivePage: n+1})
            this.setState({PagesContents: this.state.QuestionsArrays.slice((n)*8,(n)*8+8)})
        }   
    }
    handlePagination(n){
        this.setState({
            ActivePage: n,
            PagesContents: this.state.QuestionsArrays.slice((n-1)*8,(n-1)*8+8)
        }); 
    }
    redirectAddQuestion() {
        this.props.history.push('/QuestionEditor');
    }
    handleEditQuestion(e) {
        console.log('Pencil clicked!');
    }
    handleDelQuestion(questId) {
        console.log(questId);
        axios.post("http://localhost:5000/api/questions/delete", {questionId: questId})
        .then(res => {
            console.log(res)
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className="QPMainBody">
                    {/* head */}
                    <div className="TitleBg">
                    <NaviBar
                        username={this.state.UserName}
                        hasSubHeader = "true"
                        subjectName = {this.state.SubjectName}
                        profileClick = "/ExaminerHome"
                        buttonName = "Add Question"
                        dashboardClick = "/ExaminerHome"
                        logoClick = "/ExaminerHome"
                        buttonClick={this.redirectAddQuestion.bind(this)}
                    ></NaviBar>
                    </div>

                    {/* table */}
                    <div className="QPTableBg">
                        <p id="TableTitle">Question Pool</p>
                        <div className="QPMainTable">
                            <table>
                                <tr id="QPTitletr">
                                    <th style={{width:"20%"}}>&nbsp;&nbsp;Question ID</th>
                                    <th style={{width:"50%"}}>Question</th>
                                    <th style={{width:"20%"}}>Question Level</th>
                                    <th style={{width:"5%"}}></th>
                                    <th style={{width:"5%"}}></th>
                                </tr>
                                {this.state.PagesContents.map(PagesContent =>(
                                    <tr key={PagesContent._id} id="QPContenttr">
                                        <td>&nbsp;&nbsp;&nbsp;{PagesContent._id}</td>
                                        <td>{PagesContent.question}</td>
                                        <td>{PagesContent.difficulty}</td>
                                        <td><i class="fa fa-pencil" aria-hidden="true" onClick={this.handleEditQuestion.bind(this)}></i></td>
                                        <td><i class="fa fa-trash-o" aria-hidden="true" onClick={() => this.handleDelQuestion(PagesContent._id)}></i></td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>

                    {/* footer */}
                    <footer className="QPFooter">
                        <Pagination id="PageSelector">
                        <Pagination.First onClick={()=>this.handleFirst()}/>
                        <Pagination.Prev onClick={()=>this.handlePrev(this.state.ActivePage)}/>         
                           {this.state.PaginationNumbers.map(PaginationNumber =>(
                               <Pagination.Item key={PaginationNumber} active={PaginationNumber === this.state.ActivePage} onClick={()=>this.handlePagination(PaginationNumber)}>{PaginationNumber}</Pagination.Item>
                           ))} 
                        <Pagination.Next onClick={()=>this.handleNext(this.state.ActivePage)}/>
                        <Pagination.Last onClick={()=>this.handleLast()}/>
                        </Pagination>
                    </footer>

                </div>
            </React.Fragment>
        )
    }
}

export default compose(withRouter, withCookies)(QuestionPool);