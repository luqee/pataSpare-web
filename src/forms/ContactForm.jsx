import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { postContact } from '../api/api';
import Loader from '../components/Loader';
import { Formik, ErrorMessage } from 'formik';
import ContactSchema from './schemas/ContactSchema';
import { useNavigate } from 'react-router-dom';

function ContactForm() {
	const [email, setEmail] = useState('')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()
	const sendMessage = (values, actions) => {
		// event.preventDefault();
		// let contactForm = document.getElementById('contactForm')
		// contactForm.disabled = true
		setLoading(true)
		// this.setState({email: values.email, subject: values.subject, message: values.message})
		let postData = {
			email: values.email,
			message: values.message,
			subject: values.subject
		};
		postContact(postData, (response) => {
			if (response.status === 201) {
				setLoading(false)
				actions.setSubmitting(false);
				setEmail('')
				setSubject('')
				setMessage('')
				navigate('/')
				// contactForm.disabled = false
				alert(`Thank you for contacting us`)
			}else{
				actions.setSubmitting(false);
				setLoading(false)
				console.log(error);
			}
		})
	}
	let initialValues = {
	  email,
	  subject,
	  message,
	}
	return (
	<div>
		<Loader loading={loading} />
		<Formik
			validationSchema={ContactSchema}
			initialValues={initialValues}
			onSubmit={sendMessage}
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
	)
}

export default ContactForm;