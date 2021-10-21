import React, {Component} from "react";
import axios from "axios";
import {
  Form,
  Image,
  Container,
  Col,
  Row
} from "react-bootstrap";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined"
import { Link } from "react-router-dom";
import logo from "../../assets/logo_register.png";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import "./Login.css";

class Login extends Component{
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){
    super(props);
    const { cookies } = props;
    this.state = {
      email: '',
      password: ''
    }
  }
  
  handleLogin(e) {
    console.log('Login Button Clicked')
    const { cookies } = this.props;
    axios
      .post("http://localhost:5000/api/users/login", this.state)
      .then(res => {
        console.log(res.data);
        cookies.set("userid", res.data.user._id, { path: '/'});
        cookies.set("usertype", res.data.user.userType, { path: '/'});
        if(res.data.user.userType === "student"){
          this.props.history.push('/Home');
        } else {
          this.props.history.push('/ExaminerHome')
        }
      })
      .catch(err =>
        alert('Login Failed. Try Again')
      );
    }

  handleChangeEmail(e) {
    e.preventDefault();
    this.setState({email: e.target.value});
  }
  
  handleChangePassword(e) {
    e.preventDefault();
    this.setState({password: e.target.value});
  }

  render() {
    return (

      <React.Fragment>
        <div className="login-parent">
  
        <Container>
          <Row>
            <Col md={7} sm={12} xs={12}>
              <h3 className="Title">
                Login to Testing System
              </h3>
  
              <h5 className="SecondTitle">
                 Access your account or get started with us
              </h5>
  
              <div className="registerButton">
                  <Link to='/'>
                    <ButtonOutlined
                      variant="contained"
                      color="primary"
                      href="registration">
                      I want to Register
                    </ButtonOutlined>
                  </Link>
              </div>
  
                <Form noValidate autoComplete="off">
  
                <Form.Group className="email" controlID="Email">
                  <Form.Control
                    type="text"
                    size="lg"
                    placeholder="Email Address"
                    onChange={this.handleChangeEmail.bind(this)}
                  />
                </Form.Group>
  
                <Form.Group className="password">
                  <Form.Control
                    type="password"
                    size="lg"
                    placeholder="Password"
                    onChange={this.handleChangePassword.bind(this)}
                  />
                </Form.Group>
  
                <Row
                className="align-items-center"
                id="submit-row">
                  <Col md={6} sm={12} xs={12}>
                    <div className="LoginButton">
                      <ButtonContained
                        variant="contained"
                        color="primary"
                        href="homepage"
                        onClick={this.handleLogin.bind(this)}>
                        Login
                      </ButtonContained>
                    </div>
                  </Col>
                  <Col md={6} sm={12} xs={12}>
                    <Form.Text id="forgotPassword" muted>
                      <Link
                      to='/'
                      className="forgot-pword"
                      > Forgot Password? </Link>
                    </Form.Text>
                  </Col>
                </Row>
              </Form>
            </Col>
  
              <Col md={5} sm={12} xs={12}>
                <Image src={logo}className="DrawingLogin"/>
              </Col>
  
          </Row>
         </Container>

        </div>
      </React.Fragment>
    );
  }
}

export default withCookies(Login);
