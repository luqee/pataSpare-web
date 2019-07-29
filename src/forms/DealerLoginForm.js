import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';

class DealerLoginForm extends Component {
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
        localStorage.setItem('access_token', responseData.access_token);
        // localStorage.setItem('refresh_token', responseData.refresh_token);
        this.props.history.push(urls.dealerHome);
        // (<Redirect to='/dealer/login' />)
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
        Dealer Login
        </Button>
      </Form>
    );
  }
}

export default DealerLoginForm;