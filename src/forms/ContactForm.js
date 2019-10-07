import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';

class ContactForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: '',
        message: ''
    }
  }
  handleEmail = (event) => {
    this.setState({email: event.target.value});
  }
  handlMessage = (event) => {
    this.setState({message: event.target.value});
  }
  sendMessage = (event) => {
    event.preventDefault();
    let postData = {
        email: this.state.email,
        message: this.state.message
    };
    console.log('post data is: '+ JSON.stringify(postData));
    autoAPI.post('/contact', JSON.stringify(postData))
    .then((response) => {
      console.log(response);
      if (response.data.status === 200) {
        console.log(this.props.history);
          let path = {
            pathname: this.props.history.location.pathname
        }
        this.props.history.push('')
        this.props.history.push(path)
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
          <Form.Control type="email" placeholder="Email" onChange={this.handleEmail}/>
        </Form.Group>
        <Form.Group controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows="5" placeholder="Write to us.." onChange={this.handlMessage}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.sendMessage}>
        SEND
        </Button>
      </Form>
    );
  }
}

export default ContactForm;