import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';
import Loader from '../components/Loader';

class ContactForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: '',
        message: '',
        loading: false
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
    let contactForm = document.getElementById('contactForm')
    contactForm.disabled = true
    this.setState({loading: true})
    let postData = {
        email: this.state.email,
        message: this.state.message
    };
    autoAPI.post('/contact', JSON.stringify(postData))
    .then((response) => {
      if (response.data.status === 201) {
          this.setState({email: ''})
          this.setState({ message: ''})
          this.setState({loading: false})
          contactForm.disabled = false
          alert(`Thank you for contacting us`)
      }
    })
    .catch((error) => {
      console.log(error);
      
    });
  }
  render() {
    return (
      <div>
        <Loader loading={this.state.loading} />
        <Form id={`contactForm`}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmail}/>
          </Form.Group>
          <Form.Group controlId="formBasicMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows="5" placeholder="Write to us.." value={this.state.message} onChange={this.handlMessage}/>
          </Form.Group>
          <Button block type="submit" onClick={this.sendMessage}>
          SEND
          </Button>
        </Form>
      </div>
    );
  }
}

export default ContactForm;