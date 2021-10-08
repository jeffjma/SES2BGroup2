import React, {Component} from 'react';
import "./QuestionPool.css";
//import NavigationBar from components
import NaviBar from "../../components/NavigationBar";
//import font-awesome icons
import 'font-awesome/css/font-awesome.min.css';
import { Pagination } from 'react-bootstrap';


class QuestionPool extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            UserName: "Examiner",
            SubjectName: "TestSubjectName",
            DataFromDatabase:[             //array in database                  
                {id: "6140a7e88n1", difficulty:"Elementary", label:"Inside which HTML element do we put the Javascript ?"},         
                {id: "6140a7e88n2", difficulty:"Intermediate", label:"What is the correct JavaScript syntax to change the content of the HTML elem..."},
                {id: "6140a7e88n3", difficulty:"Elementary", label:"Inside which HTML element do we put the Javascript ?"},
                {id: "6140a7e88n4", difficulty:"Intermediate", label:"What is the correct JavaScript syntax to change the content of the HTML elem..."},
                {id: "6140a7e88n5", difficulty:"Elementary", label:"Inside which HTML element do we put the Javascript ?"},         
                {id: "6140a7e88n6", difficulty:"Intermediate", label:"What is the correct JavaScript syntax to change the content of the HTML elem..."},
                {id: "6140a7e88n7", difficulty:"Elementary", label:"Inside which HTML element do we put the Javascript ?"},
                {id: "6140a7e88n8", difficulty:"Intermediate", label:"What is the correct JavaScript syntax to change the content of the HTML elem..."}, 
                {id: "6140a7e88n9", difficulty:"Elementary", label:"Inside which HTML element do we put the Javascript ?"},
                {id: "6140a7e88n10", difficulty:"Intermediate", label:"What is the correct JavaScript syntax to change the content of the HTML elem..."},
                {id: "6140a7e88n11", difficulty:"Elementary", label:"Inside which HTML element do we put the Javascript ?"},         
                {id: "6140a7e88n12", difficulty:"Intermediate", label:"What is the correct JavaScript syntax to change the content of the HTML elem..."},
                {id: "6140a7e88n13", difficulty:"Elementary", label:"Inside which HTML element do we put the Javascript ?"},
                {id: "6140a7e88n14", difficulty:"Intermediate", label:"What is the correct JavaScript syntax to change the content of the HTML elem..."},
                {id: "6140a7e88n15", difficulty:"Elementary", label:"Inside which HTML element do we put the Javascript ?"},         
                {id: "6140a7e88n16", difficulty:"Intermediate", label:"What is the correct JavaScript syntax to change the content of the HTML elem..."},
                {id: "6140a7e88n17", difficulty:"Elementary", label:"Inside which HTML element do we put the Javascript ?"},
                {id: "6140a7e88n18", difficulty:"Intermediate", label:"What is the correct JavaScript syntax to change the content of the HTML elem..."},
                {id: "6140a7e88n19", difficulty:"Elementary", label:"Inside which HTML element do we put the Javascript ?"},
                {id: "6140a7e88n20", difficulty:"Intermediate", label:"What is the correct JavaScript syntax to change the content of the HTML elem..."},  
            ],
            QuestionsArrays:[], //the array used in system
            PagesContents:[],   //the table contents in each page
            PaginationNumbers:[],  //how many pages
            ActivePage:1,   //which page is currently active
        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
    }

    async componentDidMount(){
        await this.setStateAsync({QuestionsArrays: this.state.DataFromDatabase});
        this.setState({PagesContents: this.state.QuestionsArrays.slice(0,8)});
        this.PagesNumbers();
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
                        profileClick = "/Profile"
                        buttonName = "Add Question"
                        dashboardClick = "/ExaminerHome"
                        logoClick = "/ExaminerHome"
                    ></NaviBar>
                    </div>

                    {/* table */}
                    <div className="QPTableBg">
                        <p id="TableTitle">Question Pool</p>
                        <div className="QPMainTable">
                            <table>
                                <tr id="QPTitletr">
                                    <th style={{width:"20%"}}>&nbsp;&nbsp;Question ID</th>
                                    <th style={{width:"50%"}}>Question Label</th>
                                    <th style={{width:"20%"}}>Question Difficulty</th>
                                    <th style={{width:"5%"}}></th>
                                    <th style={{width:"5%"}}></th>
                                </tr>
                                {this.state.PagesContents.map(PagesContent =>(
                                    <tr key={PagesContent.id} id="QPContenttr">
                                        <td>&nbsp;&nbsp;&nbsp;{PagesContent.id}</td>
                                        <td>{PagesContent.label}</td>
                                        <td>{PagesContent.difficulty}</td>
                                        <td><i class="fa fa-pencil" aria-hidden="true"></i></td>
                                        <td><i class="fa fa-trash-o" aria-hidden="true"></i></td>
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

export default QuestionPool;