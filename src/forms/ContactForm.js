import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';
import Loader from '../components/Loader';
import { Formik, ErrorMessage } from 'formik';
import ContactSchema from './schemas/ContactSchema';

class ContactForm extends Component {
  constructor(props){
    super(props);
    this.state = {
		email: '',
		subject: '',
        message: '',
        loading: false
    }
  }
  sendMessage = (values, actions) => {
    // event.preventDefault();
    // let contactForm = document.getElementById('contactForm')
    // contactForm.disabled = true
	this.setState({loading: true})
	// this.setState({email: values.email, subject: values.subject, message: values.message})
    let postData = {
        email: values.email,
		message: values.message,
		subject: values.subject
    };
    autoAPI.post('/contact', JSON.stringify(postData))
    .then((response) => {
      if (response.data.status === 201) {
		actions.setSubmitting(false);
        this.setState({email: '', loading: false, message: '',subject: ''})
		this.props.history.push('')
		this.props.history.push('/')
        // contactForm.disabled = false
        alert(`Thank you for contacting us`)
      }
    })
    .catch((error) => {
	  actions.setSubmitting(false);
	  this.setState({loading: false})
      console.log(error);
    });
  }
  render() {
	  let initialValues = {
		email: this.state.email,
		subject: this.state.subject,
        message: this.state.message,
	  }
    return (
      <div>
        <Loader loading={this.state.loading} />
		<Formik
			validationSchema={ContactSchema}
			initialValues={initialValues}
			onSubmit={this.sendMessage}
			render={({
				values,
				errors, 
				dirty,
				isSubmitting,
				handleChange,
				handleSubmit,
			})=>(
				<Form onSubmit={handleSubmit}>
				<Form.Group controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Email" value={values.email} onChange={handleChange}/>
					<ErrorMessage name="email" render={(msg) => {
						return  <Form.Control.Feedback type="invalid" style={{
						display: `block`
						}}>
						{msg}
						</Form.Control.Feedback>
					}} />
				</Form.Group>
				<Form.Group controlId="subject">
					<Form.Label>Subject</Form.Label>
					<Form.Control type="text" placeholder="Subject" value={values.subject} onChange={handleChange}/>
					<ErrorMessage name="subject" render={(msg) => {
						return  <Form.Control.Feedback type="invalid" style={{
						display: `block`
						}}>
						{msg}
						</Form.Control.Feedback>
					}} />
				</Form.Group>
				<Form.Group controlId="message">
					<Form.Label>Message</Form.Label>
					<Form.Control as="textarea" rows="5" placeholder="Write to us.." value={values.message} onChange={handleChange}/>
					<ErrorMessage name="message" render={(msg) => {
						return  <Form.Control.Feedback type="invalid" style={{
						display: `block`
						}}>
						{msg}
						</Form.Control.Feedback>
					}} />
				</Form.Group>
				<Button block variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
				SEND
				</Button>
				</Form>
			)}
		/>
      </div>
    );
  }
}

export default ContactForm;