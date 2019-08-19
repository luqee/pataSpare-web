import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';

class CustomerRegisterForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      role: 'customer'
    }
  }
  handleUserName = (event) => {
    this.setState({name: event.target.value});
  }
  handleEmail = (event) => {
    this.setState({email: event.target.value});
  }
  handlPassword = (event) => {
    this.setState({password: event.target.value});
  }
  registerClient = (event) => {
    event.preventDefault();
    let postData = {...this.state};
    
    autoAPI.post(urls.userRegister, JSON.stringify(postData))
    .then(response => {
      if (response.data.status === 201) {
        console.log('successful registration');
        this.props.history.push(`/user/login`);
      }
    })
    .catch((error) => {
      console.log(error);
      
    });
  }
  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Username" onChange={this.handleUserName} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={this.handlPassword} />
        </Form.Group>
        <Form.Group controlId="formBasicRePassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password Confirmation" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.registerClient}>
        Register
        </Button>
      </Form>
    );
  }
}

export default CustomerRegisterForm;