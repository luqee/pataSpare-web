import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';
import { Formik, ErrorMessage } from 'formik';
import DealerSignupSchema from './schemas/DealerSignupSchema'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css'

function CreateVendorForm(props) {
    let [showError, setShowError] = useState(false)
	let [formErrors, setFormErrors] = useState({})
	let [formState, setformState] = useState({
		username: '',
        number: '',
        email: '',
        password: '',
        passwordConfirm: '',
	})
    const createVendor = (values, actions) => {
        console.log('posting to create vendor');
        setformState(values)
        let postData = {
            name: values.username,
            ...values,
        }
        console.log('posting to create vendor');
        autoAPI.post(`admin/users`, JSON.stringify(postData), {
            headers: {
                'Authorization': 'Bearer '+ props.userToken
            }
        })
        .then((response) => {
            if (response.status === 201){
                actions.setSubmitting(false);
                props.history.push(``);
                props.history.push(`admin/users`);
            }
            
        })
        .catch((error) => {
            actions.setSubmitting(false);
            console.log(error);
            
        })
    }
    return (
        <Formik
            validationSchema={DealerSignupSchema}
            initialValues={formState}
            onSubmit={createVendor}
            render={({
                values,
                setFieldValue,
                errors, 
                dirty,
                isSubmitting,
                handleChange,
                handleSubmit,
            }) =>(
                <Form onSubmit={handleSubmit}>
				<Form.Group controlId="username">
					<Form.Label>User Name</Form.Label>
					<Form.Control name="username" type="text" placeholder="username" value={values.username} onChange={handleChange} />
					<ErrorMessage name="username" render={(msg) => {
					return  <Form.Control.Feedback type="invalid" style={{
					display: `block`
					}}>
					{msg}
					</Form.Control.Feedback>
					}}/>
				</Form.Group>
				<Form.Group controlId="number">
					<Form.Label>Phone Number</Form.Label>
					<PhoneInput style={{
						width: '100%'
					}} defaultCountry={'ke'} value={values.number} onChange={(value) => {
						setFieldValue('number', value)
					}} />
					<ErrorMessage name="number" render={(msg) => {
					return  <Form.Control.Feedback type="invalid" style={{
					display: `block`
					}}>
					{msg}
					</Form.Control.Feedback>
					}} />
				</Form.Group>
				<Form.Group controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
					<Form.Text className="text-muted">
					We'll never share your email with anyone else.
					</Form.Text>
					<ErrorMessage name="email" render={(msg) => {
					return  <Form.Control.Feedback type="invalid" style={{
					display: `block`
					}}>
					{msg}
					</Form.Control.Feedback>
					}} />
					
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" value={values.password} onChange={handleChange} />
					<ErrorMessage name="password" render={(msg) => {
					return  <Form.Control.Feedback type="invalid" style={{
					display: `block`
					}}>
					{msg}
					</Form.Control.Feedback>
					}}/>
				</Form.Group>
				<Form.Group controlId="passwordConfirm">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type="password" placeholder="Password Confirmation" value={values.passwordConfirm} onChange={handleChange} />
					<ErrorMessage name="passwordConfirm" render={(msg) => {
					return  <Form.Control.Feedback type="invalid" style={{
					display: `block`
					}}>
					{msg}
					</Form.Control.Feedback>
					}} />
				</Form.Group>
				<Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
				Create
				</Button>
				</Form>
            )}
        />
    );
}

export default CreateVendorForm;