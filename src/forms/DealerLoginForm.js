import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';

class DealerLoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      token: ''
    }
  }
  handleEmail = (event) => {
    this.setState({email: event.target.value});
  }
  handlPassword = (event) => {
    this.setState({token: event.target.value});
  }
  loginUser = (event) => {
    event.preventDefault();
    let postData = {...this.state, user_type: 'auto_dealer'};
    console.log('post data is: '+ JSON.stringify(postData));
    autoAPI.post('/auth/login', JSON.stringify(postData))
    .then((response) => {
      console.log(response);
      if (response.data.status === 200) {
        console.log('successful login');
        console.log(this.props.history);
        let responseData = response.data.data[0];
        localStorage.setItem('access_token', responseData.access_token);
        localStorage.setItem('refresh_token', responseData.refresh_token);
        this.props.history.push('/dealer')
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