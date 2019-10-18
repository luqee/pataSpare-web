import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';

class UserLoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  handleEmail = (event) => {
    this.setState({email: event.target.value});
  }
  handlPassword = (event) => {
    this.setState({password: event.target.value});
  }
  loginUser = (event) => {
    event.preventDefault();
    let postData = {...this.state};
    
    autoAPI.post(urls.userLogin, JSON.stringify(postData))
    .then((response) => {
      if (response.data.status === 200) {
        let responseData = response.data.data;
        this.props.userContext.updateUser(responseData.user)
        this.props.history.push(`/`);
      }
    })
    .catch((error) => {
      console.log(error);
      
    });
  }
  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={ this.handlPassword } />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.loginUser}>
        Login
        </Button>
      </Form>
    );
  }
}

export default UserLoginForm;