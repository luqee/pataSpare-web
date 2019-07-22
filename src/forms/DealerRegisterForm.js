import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';

class DealerRegisterForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      number: '',
      email: '',
      password: ''
    }
  }
  handleUserName = (event) => {
    this.setState({name: event.target.value});
  }
  handleNumber = (event) => {
    this.setState({number: event.target.value});
  }
  handleEmail = (event) => {
    this.setState({email: event.target.value});
  }
  handlPassword = (event) => {
    this.setState({password: event.target.value});
  }
  registerDealer = (event) => {
    event.preventDefault();
    let postData = {...this.state};
    console.log('post data is: '+ JSON.stringify(postData));
    autoAPI.post(urls.userRegister, JSON.stringify(postData))
    .then(response => {
      console.log('Data is '+ JSON.stringify(response.data.data));
      console.log('data status is '+ response.data.status);
      console.log('respose status: '+ response.status);
      if (response.data.status === 201) {
        console.log('successful registration');
        console.log(this.props.history);
        
        this.props.history.push(urls.userLogin)
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
        <Form.Group controlId="formBasicUsername">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Username" onChange={this.handleUserName} />
        </Form.Group>
        <Form.Group controlId="formBasicNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Phone Number" onChange={this.handleNumber}/>
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
        <Button variant="primary" type="submit" onClick={this.registerDealer}>
        Register as Dealer
        </Button>
      </Form>
    );
  }
}

export default DealerRegisterForm;