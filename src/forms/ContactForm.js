import {Form, Button} from 'react-bootstrap'
import Loader from '@/components/Loader';
import { Formik, ErrorMessage } from 'formik';
import ContactSchema from './schemas/ContactSchema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postContact } from '@/utils/api';

export const ContactForm = ()=> {
	const [email, setEmail] = useState('')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const sendMessage = (values, actions) => {
		setLoading(true)
		let postData = {
			email: values.email,
			message: values.message,
			subject: values.subject
		};
		postContact(postData)
		.then((response) => {
			actions.setSubmitting(false);
			setLoading(false)
			if (response.status === 201) {
				setEmail('')
				setMessage('')
				setSubject('')
				router.replace('/')
				alert(`Thank you for contacting us`)
			}
		})
		.catch((error) => {
			actions.setSubmitting(false);
			setLoading(false)
			console.log(error);
		});
	}
    return (
      <div>
        <Loader loading={loading} />
		<Formik
			validationSchema={ContactSchema}
			initialValues={{
				email,
				subject,
				message
			}}
			onSubmit={sendMessage}>
				{
					({
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
					)
				}
			</Formik>
      </div>
    )
}